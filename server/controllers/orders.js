const express = require("express")
const app = express()
const mysql = require("mysql")
const util = require("util");


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
    const price = req.body.price
    const outletId = req.body.outletId
    const foundTransporter = false
    const reachedOutlet = false
    const orderPickedUp = false
    const delivered = false
    const dummy = true 

    //Find transporter
    const search = "SELECT * FROM Transporters WHERE outletId =?";
    const searchQuery = mysql.format(search, [outletId]);
    const transResult = await query(searchQuery)
    let  transporterId = 1000000
    let transporter = {}
    for(let i = 0; i < transResult.length; i++) {
        if(transResult[i].ordersTaken < transResult[i].maxOrders) {
            if (transporterId > transResult[i].transporterId) {
                transporterId = transResult[i].transporterId
                transporter = transResult[i]
            }
        }
    }

    //update orders taken in transporter table
    console.log(transporter)
    const updateTrans = "UPDATE Transporters SET ordersTaken=? WHERE instanceId=?"
    const updateTransQuery = mysql.format(updateTrans, [transporter.ordersTaken + 1, transporter.instanceId])
    await query(updateTransQuery)

    //update transporters in outlets
    if(transporter.maxOrders == transporter.ordersTaken) {
        const updateOutlet = "UPDATE Outlets SET transporters = transporters - 1 WHERE outletId = ?"
        const updateOutletQuery = mysql.format(updateOutlet, [outletId])
        await query(updateOutletQuery)
    }

     //update the users' current order
     const idQuery = "select * from Orders where orderId=(SELECT LAST_INSERT_ID())"
     const update = "UPDATE Users SET currOrderId=? WHERE userId =?"
     const ids = await query(idQuery)
     const id = ids[0].orderId
     const updateBuyer = mysql.format(update, [id, buyerId])
     const updateTransporter = mysql.format(update, [id, transporterId])
     await query(updateBuyer)
     await query(updateTransporter)


    //Insert order into database
    const sqlInsert = "INSERT INTO Orders VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertQuery = mysql.format(sqlInsert, [buyerId, transporterId, price, outletId, foods, foundTransporter, reachedOutlet, orderPickedUp, delivered]);
    await query(insertQuery)

   

    //send Id of the order
    res.json({id: id}); 
}

async function updateOrder(req, res) {
    const arr = req.body.arr
    const id = req.body.orderId
    const foundTransporter = arr[0]
    const reachedOutlet = arr[1]
    const orderPickedUp = arr[2]
    const delivered = arr[3]
    console.log(foundTransporter, reachedOutlet, orderPickedUp, delivered)
    const update = "UPDATE Orders SET foundTransporter=?, reachedOutlet=?, orderPickedUp=? ,delivered=? WHERE orderId = ?"
    const updateQuery = mysql.format(update, [foundTransporter, reachedOutlet, orderPickedUp, delivered, id])
    await query(updateQuery)
    res.send("updated")

}


module.exports = {getOrder, createOrder, updateOrder}