const express = require("express")
const app = express()
const mysql = require("mysql")
const util = require("util");
const outlet = require("../listeners/outlets")
const getMaxOrders = require('../listeners/maxOrders'); 

//Use json format for data
app.use(express.json());

//initialize database information
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

//create database connection
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

const query = util.promisify(connection.query).bind(connection);

async function getOrder(req, res) {
    const orderId = req.query.orderId
    const search = "SELECT * FROM Orders WHERE orderId =?";
    const searchQuery = mysql.format(search, orderId);
    const result = await query(searchQuery);
    if (result.length == 0) {
        res.json("Id does not exist")
    } 
    else {
        res.json(result)  
    }
}

async function createOrder(req, res) {
    const buyerId = req.body.buyerId
    const foods = JSON.stringify({ "foods": req.body.foodItems })
    const numOfItems = req.body.foodItems.length
    const price = req.body.price
    const outletId = req.body.outletId
    const foundTransporter = false
    const reachedOutlet = false
    const orderPickedUp = false
    const delivered = false
    const confirmed = false
    const dummy = true 
    const io = req.io

    //Get location
    const searchUser = "SELECT * FROM Users WHERE userId = ?";
    const searchUserQuery = mysql.format(searchUser, [buyerId]);
    const user = await query(searchUserQuery);
    const location = user[0].location

    //Find transporter
    const search = "SELECT * FROM Transporters WHERE available = 1 and location = ?";
    const searchQuery = mysql.format(search, [location]);
    const transResult = await query(searchQuery);
    let  transporterId = 1000000;
    let transporter = {};
    let depTime = '23:59:59'

    for(let i = 0; i < transResult.length; i++) {
        //check if transporter is going to outlet
        if (JSON.parse(transResult[i].outlets).includes(outletId)) {
            // check if there are enough remaining orders
            if(transResult[i].ordersTaken + numOfItems <=  transResult[i].maxOrders) {
                //check if the departure time is the soonest
                if (depTime > transResult[i].depTime) {
                    transporterId = transResult[i].transporterId
                    transporter = transResult[i]
                }
            }
        }
    }
    if (transporter == {}) {
        res.send("No transporters available")
    }
    else {
        //update orders taken in transporter table
        const updateTrans = "UPDATE Transporters SET ordersTaken=? WHERE transporterId=?"
        const updateTransQuery = mysql.format(updateTrans, [transporter.ordersTaken + numOfItems, transporter.transporterId])
        await query(updateTransQuery)

        //emit max orders socket
        const io = req.io
        const max = await getMaxOrders.getMaxOrders(location, outletId)
        const room = location.concat(outletId.toString())
        console.log(room)
        io.of('/maxOrders').to(room).emit('update', max)
        
        //update transporters in outlets table
        if(transporter.maxOrders == transporter.ordersTaken + numOfItems) {
            const updateOutlet = "UPDATE Transporters SET available = 0 WHERE transporterId = ?"
            const updateOutletQuery = mysql.format(updateOutlet, [transporterId])
            await query(updateOutletQuery)

            //update outlets socket
            const newOutlets = await outlet.loadOutlets(location)
            io.of('/updateOutlets').to(location).emit('update', newOutlets)
        }

        //Insert order into database
        const sqlInsert = "INSERT INTO Orders VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const insertQuery = mysql.format(sqlInsert, [buyerId, transporterId, price, outletId, foods, foundTransporter, reachedOutlet, orderPickedUp, delivered, confirmed]);
        await query(insertQuery)

        //update the users' current order
        const idQuery = "select * from Orders where orderId=(SELECT LAST_INSERT_ID())"
        const update = "UPDATE Users SET currOrderId=? WHERE userId =?"
        const ids = await query(idQuery)
        const id = ids[0].orderId
        const updateBuyer = mysql.format(update, [id, buyerId])
        await query(updateBuyer)

        //send Id of the order
        res.json({id: id}); 
    }
}

async function cancelOrder (req, res) {
    //Get orderId from user
    const userId = req.query.userId
    const search = "SELECT * FROM Users WHERE userId=?";
    const searchQuery = mysql.format(search, [userId]);
    const user = await query(searchQuery);
    const orderId = user[0].currOrderId;
    console.log(orderId)
    const location = user[0].location
    const io = req.io

    //Get transporter that is assigned to order 
    const searchOrder = "SELECT * FROM Orders WHERE orderId=?";
    const searchOrderQuery = mysql.format(searchOrder, [orderId]);
    const order = await query(searchOrderQuery)
    const transporterId = order[0].transporterId
    const searchTransporter = "SELECT * FROM Transporters WHERE transporterId=?";
    const searchTransporterQuery = mysql.format(searchTransporter, [transporterId]);
    const transporter = await query(searchTransporterQuery)


    //Reset number of transporters in outlet if changed
    if(transporter[0].maxOutlets == transporter[0].ordersTaken) {
        const update = "UPDATE Transporters SET available = 1 WHERE transporterId = ?"
        const updateQuery = mysql.format(update, [order[0].transporterId])
        await query(updateQuery)
        //update outlets socket
        const newOutlets = await outlet.loadOutlets(transporter.location)
        io.of('/updateOutlets').to(transporter.location).emit('update', newOutlets)
    }

    //Reset number of orders taken by transporter
    const numOfItems = JSON.parse(order[0].foods).foods.length
    const updateTransporter = "UPDATE Transporters SET ordersTaken = ordersTaken - ?  WHERE transporterId = ?"
    const updateTransporterQuery = mysql.format(updateTransporter, [numOfItems, transporterId])
    await query(updateTransporterQuery)

    //emit max orders socket

    const max = await getMaxOrders.getMaxOrders(location, order[0].outletId)
    const room = location.concat(order[0].outletId.toString())
    io.of('/maxOrders').to(room).emit('update', max)


    //Reset Users current order
    const update = "UPDATE Users SET currOrderId = NULL  WHERE userId =?"
    const updateBuyer = mysql.format(update, [userId])
    await query(updateBuyer)

    //Delete Order
    const del = "DELETE FROM Orders WHERE orderId=?";
    const deleteQuery = mysql.format(del, [orderId])
    await query(deleteQuery);

    res.send("updated")
}

async function confirmOrder(req, res){
    //Get orderId from user
    const userId = req.query.userId
    const search = "SELECT * FROM Users WHERE userId=?";
    const searchQuery = mysql.format(search, [userId]);
    const user = await query(searchQuery)
    const orderId = user[0].currOrderId

    //Change confirmed status of order
    const update = "UPDATE Orders SET confirmed = 1 WHERE orderId = ?"
    const updateQuery = mysql.format(update, [orderId])
    await query(updateQuery)

    //Get transporterid 
    const searcht = "SELECT * FROM Orders WHERE buyerId=?";
    const searchQueryt = mysql.format(searcht, [userId]);
    const result = await query(searchQueryt);
    const transporterId = result[0].transporterId;

    res.send('confirmed')
}

async function updateOrder(req, res) {
    const arr = req.body.stage
    const id = req.body.transporterId
    const foundTransporter = arr[0]
    const reachedOutlet = arr[1]
    const orderPickedUp = arr[2]
    const delivered = arr[3]

    //delete transporter and decrement outlet if order is confrimed
    const search = "SELECT * FROM Orders WHERE transporterId =? and delivered = 0";
    const searchQuery = mysql.format(search, [id]);
    const result = await query(searchQuery);

    //check if the create order route has already decremented the outlets to avoid double decrementing
    const trans = "SELECT * FROM Transporters WHERE transporterId=?";
    const transQuery = mysql.format(trans, [id])
    transporter = await query(transQuery)
    const decremented = transporter.orderTaken == transporter.maxOrders

    if (result[0].foundTransporter == false && foundTransporter == true) {
        const del = "DELETE FROM Transporters WHERE transporterId=?";
        const deleteQuery = mysql.format(del, [id])
        await query(deleteQuery);

        // if (!decremented) {
        //     const outletId = result[0].outletId
        //     const updateOutlet = "UPDATE Outlets SET transporters = transporters - 1 WHERE outletId = ?"
        //     const updateOutletQuery = mysql.format(updateOutlet, [outletId])
        //     await query(updateOutletQuery)
        // }
    }

    //set transporter back to buyer and set currOrder of buyers to null if delivered
    if (result[0].delivered == false && delivered == true) {
        //switch transporter back to buyer
        const updateUser = "UPDATE Users SET istransporter = 0 WHERE userId = ?"
        const updateUserQuery = mysql.format(updateUser, [id])
        await query(updateUserQuery)

        //remove current order from every buyer
        for(let i = 0; i < result.length; i = i + 1) {
            const userId = result[i].buyerId
            const updateCurrOrder = "UPDATE Users SET currOrderId = Null WHERE userId = ?"
            const updateCurrOrderQuery = mysql.format(updateCurrOrder, [userId])
            await query(updateCurrOrderQuery)
        }


    }

    // update state in database
    console.log(foundTransporter, reachedOutlet, orderPickedUp, delivered)
    const update = "UPDATE Orders SET foundTransporter=?, reachedOutlet=?, orderPickedUp=? ,delivered=? WHERE transporterId = ?"
    const updateQuery = mysql.format(update, [foundTransporter, reachedOutlet, orderPickedUp, delivered, id])
    await query(updateQuery)
    res.send("updated")

    const status = {
        foundTransporter : arr[0],
        reachedOutlet : arr[1] ,
        orderPickedUp : arr[2],
        delivered : arr[3],
    }

    //emit transporter status through socket server
    req.io.of('/transporterStatus').to(id).emit('update', 'hi')
    //req.io.of('/transporterStatus').emit('update', status)
}


module.exports = {getOrder, createOrder, updateOrder, confirmOrder, cancelOrder}