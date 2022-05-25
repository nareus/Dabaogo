const express = require("express")
const app = express()
const mysql = require("mysql")
const validator = require('email-validator');

//Use json format for data
app.use(express.json());

//initialize database information
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

//create database connection
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})
const port = process.env.PORT

//Creating Account Information
const signUp = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected!");
        console.log(req.body);
        const username = req.body.username;
        const password = req.body.password;
        const number = req.body.number;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        
        //validate information
        if (!verifyNumber(number)) {
           console.log("invalid number");
           res.sendStatus(400);
        } else if (!validator.validate(email)){
           console.log("invalid email")
           res.sendStatus(400);  
        } else if (typeof firstName == "string"){
            console.log("first name invalid")
        } else {
            //create queries to check for duplicates
            const sqlUsernameSearch = "SELECT * FROM user_info WHERE username =?";
            const usernameSearchQuery = mysql.format(sqlUsernameSearch, [username]);
            const sqlPasswordSearch = "SELECT * FROM user_info WHERE password =?";
            const passwordSearchQuery = mysql.format(sqlPasswordSearch, [password]);
            const sqlNumberSearch = "SELECT * FROM user_info WHERE phone_number =?";
            const numberSearchQuery = mysql.format(sqlNumberSearch, [number]);
            const sqlEmailSearch = "SELECT * FROM user_info WHERE email =?";
            const emailSearchQuery = mysql.format(sqlEmailSearch, [email]);
       
            //create query to insert account information into database
            const sqlInsert = "INSERT INTO user_info VALUES (0, ?, ?, ?, ?, ?, ?)";
            const insertQuery = mysql.format(sqlInsert, [username, number, password, email, firstName, lastName]);

            //check for duplicates and add to database if there is none 
            db.query (usernameSearchQuery, (err, result) => {
                if (err) throw (err)
                console.log("Search Results");
                console.log(result.length);
                if (result.length != 0) {
                    connection.release()
                    console.log("username already exists");
                    res.sendStatus(409) 
                } else {
                    db.query (passwordSearchQuery, (err, result) => {
                    if (err) throw (err)
                        console.log("Search Results");
                        console.log(result.length);
                        if (result.length != 0) {
                            connection.release()
                            console.log("password already exists");
                            res.sendStatus(409)
                        } else {
                            db.query (numberSearchQuery, (err, result) => {
                                if (err) throw (err)
                                console.log("Search Results");
                                console.log(result.length);
                                if (result.length != 0) {
                                    connection.release()
                                    console.log("number already exists");
                                    res.sendStatus(409)
                                } else {
                                    db.query (emailSearchQuery, (err, result) => {
                                    if (err) throw (err)
                                    console.log("Search Results");
                                    console.log(result.length);
                                    if(result.length != 0) {
                                        connection.release()
                                        console.log("email already exists");
                                        res.sendStatus(409)
                                    } else {
                                        db.query (insertQuery, (err, result) => {
                                        connection.release()
                                        if (err) throw (err)
                                        console.log ("Created new User")
                                        console.log(result.insertId)
                                        res.sendStatus(201)
                                        })
                                    }
                                    })
                                }
                            })
                        }   
                    })
                }
            })
        }        
    }) //end of db.getConnection()
}

//Authenticating Login details 
const signIn = (req, res) => {
    db.getConnection((err, connection) => {
       console.log("Connected!");
       console.log(req.body);
       const username = req.body.username;
       const password = req.body.password;

       //create query to verify details 
       const sqlSearch = "SELECT * FROM user_info WHERE username =? AND password =?";
       const searchQuery = mysql.format(sqlSearch, [username, password]);
 
       //check if authentictaion is valid
       db.query (searchQuery, (err, result) => {
          if (err) throw (err)
          console.log("------> Search Results");
          console.log(result.length);
          if (result.length != 0) {
           connection.release()
           console.log("accepted");
           res.sendStatus(200);
          } 
          else {
           connection.release()
           console.log ("username or password is incorrect")
           res.sendStatus(401);
          }
      }) //end of connection.query()
    }) //end of db.getConnection()
}


const verifyNumber = (number) => {
    const num = String(number);
    if (num.length != 8) {
        return false;
    }
    if(num[1] != 8 && num[1] != 9) {
        return false;
    }
    return true;
}

const verifyEmail = email => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(validRegex)) {
        alert("Valid email address!");
        return true;

    } else {
        alert("Invalid email address!");
        return false;
    }
}

const verifyName = name => {

}

const verifyPassword = password => {

}

// const searchQuery = (entry, string) => {
//     const sqlSearch = "SELECT * FROM user_info WHERE " + string + "=?";
//     const searchQuery = mysql.format(sqlSearch, [entry]);
//     let length = 0;
//     db.query (searchQuery, (err, result) => {
//         if (err) throw (err)
//         console.log("Search Results");
//         console.log(result.length);
//         length = result.length;
//         console.log(length)
//     })
//     return length != 0;
// }


module.exports = {signIn, signUp}
