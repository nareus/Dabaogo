const express = require("express")
const app = express()
const mysql = require("mysql")
const validator = require('email-validator');
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
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

const query = util.promisify(db.query).bind(db);

//Getting account info 
const getInfo = async (req, res) => {
    const id = req.query.userId;
    const search = "SELECT * FROM Users WHERE userId =?";
    const searchQuery = mysql.format(search, id);
    const result = await query(searchQuery);
    if (result.length == 0) {
        res.json("Id does not exist")
    } 
    else {
        res.json(result)  
    }

}

//Creating Account Information
const signUp = (req, res) => {
        console.log(req.body);
        const password = req.body.password;
        const phone = req.body.phone;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        console.log(typeof phone)
         //validate information
        const details = {
            "passwordValid": validatePassword(password),
            "phoneValid":validatePhone(phone),
            "firstNameValid": validateName(firstName),
            "lastNameValid": validateName(lastName),
            "emailValid": validator.validate(email), 
            "phoneUnique": false,
            "emailUnique": false
        }
            const sqlPasswordSearch = "SELECT * FROM Users WHERE password =?";
            const passwordSearchQuery = mysql.format(sqlPasswordSearch, [password]);
            const sqlNumberSearch = "SELECT * FROM Users WHERE phoneNumber =?";
            const numberSearchQuery = mysql.format(sqlNumberSearch, [phone]);
            const sqlEmailSearch = "SELECT * FROM Users WHERE email =?";
            const emailSearchQuery = mysql.format(sqlEmailSearch, [email]);
       
            //create query to insert account information into database
            const sqlInsert = "INSERT INTO Users VALUES (0, ?, ?, ?, ?, ?)";
            const insertQuery = mysql.format(sqlInsert, [password, phone, email, firstName, lastName]);
            
            //async/await format to query data
            (async () => { 
            try {
                //check for duplicates in database
                const numberResults = await query(numberSearchQuery);
                const emailResults = await query(emailSearchQuery);
                console.log(numberResults.length)
                console.log(emailResults.length)
                if (numberResults.length == 0) {
                    details.phoneUnique = true;
                }
                if (emailResults.length == 0) {
                    details.emailUnique = true;
                }
                } catch ( err ) {
                    console.log(err.message);
                } finally {
                    if(Object.values(details).indexOf(false) > -1) {
                        res.json(details);
                    } else {
                        await db.query (insertQuery); 
                        const idQuery = "select * from Users where userId=(SELECT LAST_INSERT_ID())"
                        const ids = await query(idQuery)
                        const id = ids[0].userId
                        console.log(ids)
                        res.json({id: id});    
                    }
                }
            })();
            
}


//Authenticating Login details 
const signIn = (req, res) => {
       const phone = req.body.phone;
       const password = req.body.password;
       let accepted = {
           "accepted": false,
           "id": 0
       }

       //create query to verify details 
       const sqlSearch = "SELECT * FROM Users WHERE phoneNumber =? AND password =?";
       const searchQuery = mysql.format(sqlSearch, [phone, password]);
 
       //check if authentictaion is valid (using callback fomat)
       db.query (searchQuery, (err, result) => {
          if (err) throw (err)
          console.log("------> Search Results");
          console.log(result.length);
          if (result.length != 0) {
            accepted.accepted = true;
            accepted.id = result[0].userId
          } 
          res.json(accepted);
      }) //end of connection.query()
}


const validatePhone = (number) => {
    const numRegex = /^[8-9]{1}[0-9]{7}$/;
    return numRegex.test(number);
}

const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex.test(email)) {
        console.log("Valid email address!");
        return true;

    } else {
        console.log("Invalid email address!");
        return false;
    }
}

const validateName = name => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    return nameRegex.test(name);
}

const validatePassword = password => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return passwordRegex.test(password)

}

const searchQuery = (entry, string) => {
    const sqlSearch = "SELECT * FROM Users WHERE " + string + "=?";
    const searchQuery = mysql.format(sqlSearch, [entry]);
    let length;
    try{
    const search = db.query (searchQuery);
    }catch(err) {
        console.log(err.message);
    } finally {
        db.close()
    }
    return length != 0;
}


module.exports = {signIn, signUp, getInfo}
