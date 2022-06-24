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

async function getMenu(req, res) {
    const menuId = req.query.menuId
    const search = "SELECT * FROM FoodItems WHERE menuId=? and popular =?";
    const popularSearchQuery = mysql.format(search, [menuId, 1])
    const restSearchQuery = mysql.format(search, [menuId, 0])
    const popular = await query(popularSearchQuery);
    const rest = await query(restSearchQuery);
    result = {
        "popular" : popular,
        "restOfItems": rest
    }
    res.json(result)  
}

module.exports = {getMenu}