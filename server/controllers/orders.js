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
    req.query.orderId
    const search = "SELECT * FROM Orders WHERE id =?";
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
    const transporterId = req.body.transporterId
    const foods = JSON.stringify({ "foods": req.body.foodItems })
    const price = req.body.price
    const outletId = req.body.outletId
    const deliveryStage = req.body.deliveryStage
    const sqlInsert = "INSERT INTO Orders VALUES (0, ?, ?, ?, ?, ?, ?)";
    const insertQuery = mysql.format(sqlInsert, [buyerId, transporterId, price, outletId, deliveryStage, foods]);
    await query(insertQuery)
    const idQuery = "SELECT LAST_INSERT_ID()"
    const id = await query(idQuery)
    res.send(id)
}


module.exports = {getOrder, createOrder}