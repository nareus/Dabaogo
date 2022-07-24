const util = require("util");
const express = require("express")
const app = express()
const mysql = require("mysql")

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

const query = util.promisify(connection.query).bind(connection);

async function getOrders(transporterId) {
    const searchConfirmed = "SELECT * FROM Orders WHERE transporterId = ? and delivered = 0 and confirmed = 1";
    const searchNotConfirmed = "SELECT * FROM Orders WHERE transporterId =? and delivered = 0 and confirmed = 0";
    const searchQuery = mysql.format(searchConfirmed, [transporterId]);
    const searchQuery2 = mysql.format(searchNotConfirmed, [transporterId]);
    const confirmed = await query(searchQuery);
    const notConfirmed = await query(searchQuery2);

    if (notConfirmed.length == 0) {
        return(
            {
                items : confirmed, 
                processing: true
            }
            )
    } else {
        return(
            {
                items : confirmed, 
                processing: false
            }
        )
            
    }
}


module.exports = {getOrders}