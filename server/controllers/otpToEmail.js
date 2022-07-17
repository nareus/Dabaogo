const router = require("express").Router();
const express = require("express");
//const {encode} = require("../middlewares/crypt")
var otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer')
const mysql = require('mysql');
const { Router } = require("express");

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

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

async function otpToEmail(req, res, next) {
    try{
      const {email,type} = req.body;
      let email_subject, email_message
      if(!email){
        const response={"Status":"Failure","Details":"Email not provided"}
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
    connection.connect();
    const insertQuery = "INSERT INTO otp_details (otp, expiration_time) VALUES (?,?)"
    const formattedQuery = mysql.format(insertQuery, [otp, expiration_time]);
    connection.query(formattedQuery, (error, results) => {
        if (error) throw error;
        console.log("otp added to database"); 
    })
    connection.end();
  
      // Create details object containing the email and otp id
      const details={
        "timestamp": now, 
        "check": email,
        "success": true,
        "message":"OTP sent to user",
        "otp_id": 0
      }
  
      // Encrypt the details object
      const encoded = details    
      //Choose message template according type requestedconst encoded= await encode(JSON.stringify(details))
      if(type){
        if(type=="VERIFICATION"){
          const {message, subject_mail} = require('../templates/email/email_verification');
          email_message=message(otp)
          email_subject=subject_mail
        }
        else if(type=="FORGET"){
          const {message, subject_mail} = require('../templates/email/email_forget');
          email_message=message(otp)
          email_subject=subject_mail
        }
        else if(type=="2FA"){
          const {message, subject_mail} = require('../templates/email/email_2FA');
          email_message=message(otp)
          email_subject=subject_mail
        }
        else{
          const response={"Status":"Failure","Details":"Incorrect Type Provided"}
          return res.status(400).send(response) 
        }
      }
  
      // Create nodemailer transporter
      // const transporter = nodemailer.createTransport({
      //   host: 'gmail',
      //   port: 465,
      //   secure: true,
      //   auth: {
      //     user: `${process.env.EMAIL_ADDRESS}`,
      //     pass: `${process.env.EMAIL_PASSWORD}`
      //   },
      // });
  
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'marktaylorsouthampton@gmail.com',
            pass: 'Bestintheworld'
          }
        });
        
        var mailOptions = {
          from: 'marktaylorsouthampton@gmail.com',
          to: `${email}`,
          subject: email_subject,
          text: email_message
        };
  
  
  //     const mailOptions = {
  //       from: `"Naren Sreekanth"<${process.env.EMAIL_ADDRESS}>`,
  //       to: `${email}`,
  //       subject: email_subject,
  //       text: email_message ,
  //     };
  
         await transporter.verify();
      
      //Send Email
      await transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            return res.status(400).send({"Status":"Failure","Details": err });
        } else {
          return res.send({"Status":"Success","Details":encoded});
        }
      });
    }
    catch(err){
      const response={"Status":"Failure","Details": err.message}
      return res.status(400).send(response)
    }
   }

   module.exports = {otpToEmail}