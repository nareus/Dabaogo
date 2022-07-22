const { Socket } = require("dgram");
const express = require("express")
const app = express()
const mysql = require("mysql")
const util = require("util");
const outlet = require("../listeners/outlets")


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

async function getOutlets(req, res) {
    const userId = req.query.userId;
    const search = "SELECT * FROM Users WHERE userId=?";
    const searchQuery = mysql.format(search, [userId]);
    const user = await query(searchQuery)
    const location = user[0].location
    io = req.io;
    const outlets = await outlet.loadOutlets(location)
    io.of('/outletUpdate').emit("outlets")
    res.send(outlets)
}

async function makeAvailable(req, res) {
    const outletId = req.query.outletId
    const search = "SELECT * FROM Outlets WHERE outletId = ?";
    const searchQuery = mysql.format(search, [outletId])
    result = await query(searchQuery)
    if (result.length == 0) {
        res.send('Id does not exist')
    } else {
        const update = "UPDATE Outlets SET available = 1 WHERE outletId = ?";
        const updateQuery = mysql.format(update, [outletId])
        await query(updateQuery);
        res.send('Updated')  
    }
}

async function makeUnavailable(req, res) {
    const outletId = req.query.outletId
    const search = "SELECT * FROM Outlets WHERE outletId = ?";
    const searchQuery = mysql.format(search, [outletId])
    result = await query(searchQuery)
    if (result.length == 0) {
        res.send('Id does not exist')
    } else {
        const update= "UPDATE Outlets SET available = 0 WHERE outletId = ?";
        const updateQuery = mysql.format(update, [outletId])
        await query(updateQuery);
        res.send('Updated'); 
    }      
}


module.exports = {getOutlets, makeAvailable, makeUnavailable}