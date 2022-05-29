const express = require("express")
const app = express()
const mysql = require("mysql")
const port = process.env.PORT || 3000


//Importing Routes
const register = require('./routes/register.js')
const logIn = require('./routes/logIn.js')
const otpToEmail = require('./routes/otpToEmail.js')
const otpToPhone = require('./routes/otpToPhone.js')

//Using Routes
app.use('/register', register);
app.use('/logIn', logIn);
app.use('/', otpToEmail);
app.use('/', otpToPhone);


//Getting data in JSON format
app.use(express.json());

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const connection = mysql.createConnection({
   host: "dabaogo.cjq1kwf2vggx.ap-southeast-1.rds.amazonaws.com",
   user: "naren",
   password: "Levelsixlounge",
   database: "dabaogo",
   port: "3306"
})

connection.connect(err => {
    if (err) console.log(err.message);
    else {
    console.log("connected to database");
    }
});


console.log({
    host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
 })

//listening on port set in environment 
app.listen(port, 
()=> console.log(`Server Started on port 3000...`))

   

