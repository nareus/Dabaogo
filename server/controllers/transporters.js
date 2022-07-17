const express = require("express")
const app = express()
const mysql = require("mysql")
const util = require("util");
const outlet = require("../listeners/outlets")
const getMaxOrders = require('../listeners/maxOrders'); 
const { Socket } = require("dgram");


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

async function createTransporter(req, res) {
    const transporterId = req.body.transporterId
    const maxOrders = req.body.maxOrders
    const depTime = req.body.depTime
    const hostel = req.body.hostel
    const outlets = JSON.stringify(req.body.outlets)
    const ordersTaken = 0
    const io = req.io

    //create transporter
    const insert = "INSERT INTO Transporters VALUES (0, ?, ?, ?, ?, ?, ?, ADDTIME(?, '1:00:00'), 1)";
    const insertQuery = mysql.format(insert, [transporterId, maxOrders, ordersTaken, depTime, hostel, outlets, depTime])
    await query(insertQuery);

    // //update transporters in outlets
    // const update = "UPDATE Outlets SET transporters = transporters + 1 WHERE outletId = ?"
    // const updateQuery = mysql.format(update, [outletId])
    // await query(updateQuery)

    //update user istransporter status
    const updateUser = "UPDATE Users SET istransporter = 1 WHERE userId = ?"
    const updateUserQuery = mysql.format(updateUser, [transporterId])
    await query(updateUserQuery)

    res.send("Created")
    //update outlets socket
    const newOutlets = await outlet.loadOutlets(hostel)
    io.of('/outletUpdate').emit("outlet update", newOutlets)
}

async function deleteTransporter(req, res) {
    const transporterId = req.query.transporterId;
    const del = "DELETE FROM Transporters WHERE transporterId=?";
    const deleteQuery = mysql.format(del, [transporterId])
    await query(deleteQuery);
    res.send("Deleted")  

    const updateUser = "UPDATE Users SET istransporter = 0 WHERE userId = ?"
    const updateUserQuery = mysql.format(updateUser, [transporterId])
    await query(updateUserQuery)
}

async function getTransporter(req, res) {
    const transporterId = req.query.transporterId;
    const search = "SELECT * FROM Transporters WHERE transporterId=?";
    const searchQuery = mysql.format(search, [transporterId])
    results = await query(searchQuery);
    if (results.length == 0) {
        res.send("no transporter")
    } else {
    results[0].estimatedTime = results[0].estimatedTime.slice(0,-3)
    res.send(results[0])  
    }
}

async function getOrders(req, res) {
    transporterId = req.query.transporterId
    const searchConfirmed = "SELECT * FROM Orders WHERE transporterId = ? and delivered = 0 and confirmed = 1";
    const searchNotConfirmed = "SELECT * FROM Orders WHERE transporterId =? and delivered = 0 and confirmed = 1";
    const searchQuery = mysql.format(searchConfirmed, [transporterId]);
    const searchQuery2 = mysql.format(searchNotConfirmed, [transporterId]);
    const confirmed = await query(searchQuery);
    const notConfirmed = await query(searchQuery2);
    if (notConfirmed.length == 0) {
        res.json(
            {
                items : confirmed, 
                processing: true
            }
            )
    } else {
        res.json(
            {
                items : confirmed, 
                processing: false
            }
            )
    }
}

async function maxOrders(req, res) {
    const userId = req.query.userId 
    const io = req.io
    
    // get location
    const search = "SELECT * FROM Users WHERE userId=?";
    const searchQuery = mysql.format(search, [userId]);
    const user = await query(searchQuery)
    const location = user[0].location

    const max = await getMaxOrders.getMaxOrders(location)
    io.of('/maxOrders').emit('update max orders', max)
    res.json(max)
    
}

module.exports = {createTransporter, deleteTransporter, getTransporter, getOrders, maxOrders}