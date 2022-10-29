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

const getMaxOrders = async (location, outletId) => {
    const searchTransporters = "SELECT * FROM Transporters WHERE location=?"
    const searchTransporterQuery  = mysql.format(searchTransporters, [location])
    const transporters = await query(searchTransporterQuery)
    let max = 0
    for(let i = 0; i < transporters.length; i = i + 1) {
        if (JSON.parse(transporters[i].outlets).includes(outletId)) {
            if (transporters[i].maxOrders - transporters[i].ordersTaken > max) {
                max = transporters[i].maxOrders - transporters[i].ordersTaken
            }
        }
    }
    output = {"maxOrders": max}
    return max
}


module.exports = {getMaxOrders}