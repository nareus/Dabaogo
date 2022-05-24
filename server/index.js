const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
require("dotenv").config()
const userInfoRoutes = require('./routes/userInfo.js')

app.use(express.json());
app.use('/', userInfoRoutes);


const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})
const port = process.env.PORT

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))

   

