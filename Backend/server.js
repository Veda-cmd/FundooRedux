/**
* @description: 
* @file: server.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

const express = require('express');
const expressValidator = require('express-validator');
// create express app
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/routes');
const logger = require('./services/log');

//enables CORS
app.use(cors({
    'origin': '*'
  }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(expressValidator())

app.use('/',route)

const config = require('./config/config');

// define a simple route
app.get('/', (req, res) => {
    // res.status(200).send({message:"Hi there!"})
});

app.listen(config.dbConnection());

// listen for requests
app.listen(config.port,() => {
    logger.info("Server is listening on port 5000");
});

module.exports=app;