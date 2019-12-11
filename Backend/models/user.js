/**
* @description: 
* @file: userModel.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

const mongoose = require('mongoose');
const logger = require('../services/log');

/**
*@description User schema is defined for specifying structure of user document.
*/

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    isVerified:{
        type: Boolean,
        default:false,
        required:false
    },
    imageUrl:{
        type:String,
        required:false
    },
    forgot_token:{ 
        type:String,
        required:false
    },
    longUrl:{ 
        type:String,
        required:false
    },
    shortUrl:{ 
        type:String,
        required:false
    },
    urlCode:{ 
        type:String,
        required:false
    },
    created_at: {
        type: Date,
        default: Date.now 
    },
    updated_at: {
        type: Date,
        default: Date.now 
    }
   
});

/**
*@description User Model is defined for storing object in database. 
*/

const User =  mongoose.model('user',userSchema);

/**
*@description UserModel has the following functions:
* findOne: for finding a particular record from database. It takes a single parameter.
* findAll: for retrieving list of existing records from database.
* update: for updating user field in database.
* register: for saving user object in user collection. 
* login: for checking user credentials are valid or not. If success, response is sent.
* reset: for storing new password in database.
*/

class Usermodel
{
    findOne(req)
    {
        return new Promise((resolve,reject)=>
        {
            User.findOne(req)
            .then(data=>
            {
                // logger.info(data); 
                resolve(data);
            })
            .catch(err=>
            {
                logger.error(err);
                reject(err);
            })
        })
    }

    update(req,res,callback)
    {   
        // logger.info(req,res);
          
        User.updateOne(req,res)
        .then(data=>
        {
            // logger.info(data);
            callback(null,data);
        })
        .catch(err=>
        {
            callback(err);
        })
       
    }

    register(req,callback)
    {       
        const user = new User({
            firstName:req.firstName,
            lastName:req.lastName,
            email:req.email,
            password:req.password
        });
        user.save((err,result)=>
        {
            if(err)
                callback(err)
            else
            {
                let response = {
                    email:result.email,
                    success:true,
                }
                callback(null,response)
            }
                
        }); 
    }

    login(req,callback)
    {          
        let response = 
        {
            id:req._id,
            firstName:req.firstName,
            email:req.email,
            message:'Success',
            imageUrl:req.imageUrl
        }
        callback(null,response);
               
    }

    reset(req)
    {
        return new Promise((resolve,reject)=>
        {   
            User.updateOne({_id:req._id},{password:req.password})
            .then(res=>
            {
                // logger.info(res);
                resolve({message:"Password updated"})
            })
            .catch(err=>
            {
                reject(err)
            })
        }) 
    }
}


module.exports = new Usermodel();