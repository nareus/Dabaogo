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

async function createTransporter(req, res) {
    const transporterId = req.body.transporterId
    const maxOrders = req.body.maxOrders
    const depTime = req.body.depTime
    const hostel = req.body.hostel
    const outletId = req.body.outletId
    const ordersTaken = 0

    //create transporter
    const insert = "INSERT INTO Transporters VALUES (0, ?, ?, ?, ?, ?, ?, ADDTIME(?, '1:00:00'))";
    const insertQuery = mysql.format(insert, [transporterId, maxOrders, ordersTaken, depTime, hostel, outletId, depTime])
    await query(insertQuery);

    //update transporters in outlets
    const update = "UPDATE Outlets SET transporters = transporters + 1 WHERE outletId = ?"
    const updateQuery = mysql.format(update, [outletId])
    await query(updateQuery)

    const updateUser = "UPDATE Users SET istransporter = 1 WHERE userId = ?"
    const updateUserQuery = mysql.format(updateUser, [transporterId])
    await query(updateUserQuery)

    res.send("Created")  
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

module.exports = {createTransporter, deleteTransporter, getTransporter}