/**
* @description: 
* @file: utilService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const bcrypt = require('bcrypt');

/**
*@description hashPassword is used for encrypting password using SHA-256 algorithm.
*/

let hashPassword = (req) =>
{
    return new Promise((resolve,reject)=>
    {
        bcrypt.hash(req,10)
        .then(data=>
        {   
            resolve(data);
        })
        .catch(err=>
        {
            reject(err);
        })
    })
}
let comparePassword = (req,data,callback) =>
{
    bcrypt.compare(req,data,(err,result)=>
    {
        if(err)
            callback(err);
        else
            callback(null,result);
    })
}

module.exports={hashPassword,comparePassword};