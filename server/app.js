const express = require("express")
const app = express()
const mysql = require("mysql")
const port = process.env.PORT || 3000
const dotenv = require('dotenv')
dotenv.config();


//Importing Routes
const register = require('./routes/register.js')
const logIn = require('./routes/logIn.js')
const otpToEmail = require('./routes/otpToEmail.js')
const otpToPhone = require('./routes/otpToPhone.js')
const outlets  = require('./routes/outlets.js')
const orders = require('./routes/orders.js')
const menu = require('./routes/menu.js')
const users = require('./routes/users.js')
const transporters = require('./routes/transporters.js')

//Using Routes
app.use('/register', register);
app.use('/logIn', logIn);
app.use('/', otpToEmail);
app.use('/', otpToPhone);
app.use('/outlets', outlets);
app.use('/orders', orders);
app.use('/menu', menu);
app.use('/users', users);
app.use('/transporters', transporters)


//Getting data in JSON format
app.use(express.json());

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

connection.connect(err => {
    if (err) console.log(err.message);
    else {
    console.log("connected to database");
    }
});

//listening on port set in environment 
app.listen(port, 
()=> console.log(`Server Started on port 3000...`))

   

