const router = require("express").Router();
//const {encode,decode} = require("../middlewares/crypt")
var otpGenerator = require('otp-generator');
var AWS = require('aws-sdk');
const crypto = require('crypto');
const mysql = require('mysql');

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const connection = mysql.createConnection({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})


// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

router.post('/otp/phone', async (req, res, next) => {

  try{

    const {phone_number,type} = req.body;

    let phone_message

    if(!phone_number){
      const response={"Status":"Failure","Details":"Phone Number not provided"}
      return res.status(400).send(response) 
    }
    if(!type){
      const response={"Status":"Failure","Details":"Type not provided"}
      return res.status(400).send(response) 
    }

    //Generate OTP 
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now,10);


    //Create OTP instance in DB
    let otp_id;
    connection.connect();
    const insertQuery = "INSERT INTO otp (otp, expiration_time) VALUES (?,?)"
    const formattedQuery = mysql.format(insertQuery, [otp, expiration_time]);
    connection.query(formattedQuery, (error, results) => {
        if (error) throw error;
        console.log("otp added to database");
        otp_id = results.id;
    })
    connection.end();

    // Create details object containing the phone number and otp id
    const details={
      "timestamp": now, 
      "check": phone_number,
      "success": true,
      "message":"OTP sent to user",
      "otp_id": otp_id
    }

    // Encrypt the details object
    const encoded= await JSON.stringify(details)

    //Choose message template according type requested
    if(type){
      if(type=="VERIFICATION"){
        const message = require('../templates/SMS/phone_verification');
        phone_message=message(otp)
      }
      else if(type=="FORGET"){
        const message = require('../templates/SMS/phone_forget');
        phone_message=message(otp)
      }
      else if(type=="2FA"){
        const message = require('../templates/SMS/phone_2FA');
        phone_message=message(otp)
      }
      else{
        const response={"Status":"Failure", "Details":"Incorrect Type Provided"}
        return res.status(400).send(response) 
      }
    }

    // Settings Params for SMS
    const params = {
        Message: phone_message,
        PhoneNumber:  phone_number
    };

    //Send the params to AWS SNS using aws-sdk
    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    //Send response back to the client if the message is sent
    publishTextPromise.then(
        function (data) {
            return res.send({"Status":"Success","Details":encoded});
        }).catch(
        function (err) {
            return res.status(400).send({"Status":"Failure","Details": err });
    });
    
  }catch(err){
      const response={"Status":"Failure","Details": err.message}
      return res.status(400).send(response)
  }
  
});

 
module.exports = router;