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


const loadOutlets = async (location) => {
    // const search = "SELECT * FROM Users WHERE userId=?";
    // const searchQuery = mysql.format(search, [userId]);
    // const user = await query(searchQuery)
    // const location = user[0].location

    const searchTransporter = "SELECT * FROM Transporters WHERE location = ? and available = 1"; 
    const searchTransporterQuery = mysql.format(searchTransporter, [location])
    const transporters = await query(searchTransporterQuery);
    const searchOutletsQuery = "SELECT * FROM Outlets"
    let outlets = await query(searchOutletsQuery)
    for(let i = 0; i < transporters.length; i = i + 1) {
        if (transporters[i].location == location) {
            outlets = outlets.map((x) => {
                if(JSON.parse(transporters[i].outlets).includes(x.outletId)) {
                    x.transporters = x.transporters + 1
                }
                return x;
            }
            )
        }
    }
    return outlets
}


module.exports = {loadOutlets}