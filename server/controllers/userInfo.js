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
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})
const port = process.env.PORT

const query = util.promisify(db.query).bind(db);


//Creating Account Information
const signUp = (req, res) => {
        console.log(req.body);
        const username = req.body.username;
        const password = req.body.password;
        const number = req.body.number;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;

         //validate information
        const details = {
            "username": validateNumber(number),
            "password": validatePassword(password),
            "phone_number":validateNumber(number),
            "firstName": validateName(firstName),
            "lastName": validateName(lastName),
            "email": validator.validate(email),
            "usernameDuplicate" : true,
            "passwordDuplicate" : true, 
            "phoneNumberDuplicate": true,
            "emailDuplicate": true
        }
        
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
            const insertQuery = mysql.format(sqlInsert, [username, password, number, email, firstName, lastName]);
            
            //async/await format to query data
            (async () => { 
            try {
                //check for duplicates in database
                const usernameResults = await query(usernameSearchQuery);
                const passwordResults = await query(passwordSearchQuery);
                const numberResults = await query(numberSearchQuery);
                const emailResults = await query(emailSearchQuery);
                console.log(usernameResults.length)
                console.log(passwordResults.length)
                console.log(numberResults.length)
                console.log(emailResults.length)
                if (usernameResults.length != 0) {
                    details.usernameDuplicate = false;
                }
                if (passwordResults.length != 0) {
                    details.passwordUnique = false;
                }
                if (numberResults.length != 0) {
                    details.numberUnique = false;
                }
                if (emailResults.length != 0) {
                    details.emailunique = false;
                }
                } catch ( err ) {
                    console.log(err.message);
                } finally {
                    
                    if(Object.values(details).indexOf(false) > -1) {
                        res.json(details);
                    } else {
                        res.send("Account created");
                        db.query (insertQuery);      
                    }
                    db.end();
                }
            })();
            //check for duplicates and add to database if there is none 
            // db.query (usernameSearchQuery, (err, result) => {
            //     if (err) throw (err)
            //     console.log("Search Results");
            //     console.log(result.length);
            //     if (result.length != 0) {
            //         details.usernameDuplicate = false;
            //         connection.release()
            //         // res.send("username already exists");
            //         // res.sendStatus(409) 
            //     } else {
            //         db.query (passwordSearchQuery, (err, result) => {
            //         if (err) throw (err)
            //             console.log("Search Results");
            //             console.log(result.length);
            //             if (result.length != 0) {
            //                 connection.release()
            //                 // res.send("password already exists");
            //                 // res.sendStatus(409)
            //             } else {
            //                 db.query (numberSearchQuery, (err, result) => {
            //                     if (err) throw (err)
            //                     console.log("Search Results");
            //                     console.log(result.length);
            //                     if (result.length != 0) {
            //                         connection.release()
            //                         // res.send("number already exists");
            //                         // res.sendStatus(409)
            //                     } else {
            //                         db.query (emailSearchQuery, (err, result) => {
            //                         if (err) throw (err)
            //                         console.log("Search Results");
            //                         console.log(result.length);
            //                         if(result.length != 0) {
            //                             connection.release()
            //                             // res.send("email already exists");
            //                             // res.sendStatus(409)
            //                         } else {
            //                             db.query (insertQuery, (err, result) => {
            //                             connection.release()
            //                             if (err) throw (err)
            //                             res.send("Created new User")
            //                             console.log(result.insertId)
            //                             res.sendStatus(201)
            //                             })
            //                         }
            //                         })
            //                     }
            //                 })
            //             }   
            //         })
            //     }
            // })          
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
 
       //check if authentictaion is valid (using callback fomat)
       db.query (searchQuery, (err, result) => {
          if (err) throw (err)
          console.log("------> Search Results");
          console.log(result.length);
          if (result.length != 0) {
           connection.release()
           res.send("accepted");
           res.sendStatus(200);
          } 
          else {
           connection.release()
           res.send("username or password is incorrect")
           res.sendStatus(401);
          }
      }) //end of connection.query()
    }) //end of db.getConnection()
}


const validateNumber = (number) => {
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
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return passwordRegex.test(password)

}

const searchQuery = (entry, string) => {
    const sqlSearch = "SELECT * FROM user_info WHERE " + string + "=?";
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


module.exports = {signIn, signUp}
