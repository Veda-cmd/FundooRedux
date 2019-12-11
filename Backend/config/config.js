/**
* @description: 
* @file: config.js
* @author: Vedant Nare
* @version: 1.0
*/ 
// port:process.env.port,

const mongoose = require('mongoose');
const logger = require('../services/log');

module.exports = {
    port:process.env.port || 5000,
    user_key:process.env.IAM_USER_KEY,
    secret_key:process.env.IAM_USER_SECRET,
    bucket:process.env.BUCKET_NAME,
    dbConnection()
    {
        mongoose.connect(process.env.url,{
            useNewUrlParser: true,
            useUnifiedTopology : true,
            useFindAndModify:false,
            useCreateIndex:true
        }).then(() => {
            logger.info('Successfully connected to the database'); 
        }).catch(err => {
            logger.warn(`Could not connect to the database. Exiting now... ${err}`);
            process.exit(1);
        });

        mongoose.connection.on('connected', function () {
            logger.info(`Mongoose default connection is open on ${process.env.url}`);
        });
    
        mongoose.connection.on('error', function (err) {
            console.log(`Mongoose connection error has occured: ${err}`);
        });
    
        mongoose.connection.on('disconnected', function () {
            logger.info("Mongoose default connection is disconnected");
        });
    }
}
