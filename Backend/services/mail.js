/**
* @description: 
* @file: mailService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

require('dotenv').config();
const nodemailer = require('nodemailer');
const logger = require('./log');

/**
*@description Nodemailer is used for sending mail. 
*/

let sendForgotLink = (url,req) =>
{   
    /**
    *@description SMTP is the main transport in Nodemailer for delivering messages. 
    *SMTP is also the protocol used between different email hosts, so its truly universal.
    */

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.email_id,
        pass: process.env.password
        } 
    });

    /**
    *@description Contents of mail are being readied here.
    */

    let mailOptions = {
        from: process.env.email_id,
        to: req,
        subject: 'Reset Password Link',
        text: 'Click on the following link to reset Fundoo password.Link will be active for 12 hours.\n'+url
    };

    /**
    *@description sendMail method is used for sending mails to the mentioned service.
    */

    transporter.sendMail(mailOptions, function(error, info){
        if (error)
            logger.info(error);
        else
            logger.info('Email sent: ' + info.response);
    });
}

let sendVerifyLink = (url,req) =>
{   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.email_id,
        pass: process.env.password
        } 
    });

    let mailOptions = {
        from: process.env.email_id,
        to: req,
        subject: 'Verification link',
        text: 'Click on the following link to verify Fundoo account.\n'+url
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error)
            logger.error(error);
        else
            logger.info('Email sent: ' + info.response);
    });
}

module.exports = {sendForgotLink,sendVerifyLink};