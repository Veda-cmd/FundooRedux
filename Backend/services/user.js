/**
* @description: 
* @file: userService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const userModel = require('../models/user');
const util = require('./util');
const logger = require('./log');

class Userservice
{ 
    /**
    *@description Register service returns a promise which is either resolved/rejected. 
    */

    register(req)
    {
        return new Promise((resolve,reject)=>
        {
            userModel.findOne({email:req.email})
            .then(data=>
            {
                // logger.info(data);

                /**
                *@description If data is found, reject method is called.
                */

                if(data)
                {
                    reject({message:"Email already registered"});
                }   
                else
                {
                    /**
                    *@description Password is hashed using bcrypt.
                    */

                    let hash = util.hashPassword(req.password)
                    hash
                    .then(data=>
                    {
                        let request = {
                            firstName:req.firstName,
                            lastName:req.lastName,
                            email:req.email,
                            password:data
                        }
                        userModel.register(request,(err,result)=>
                        {
                            if(err)
                                reject(err);
                            else
                                resolve(result);
                        }) 
                    })
                    .catch(err=>
                    {
                        reject(err);
                    })    
                }
            })
            .catch(err=>
            {
                logger.error('Err',err);
                reject(err);
            });
        });
    }

    /**
    *@description Login service issues a callback to the calling function. 
    */

    login(req,callback)
    {   
        userModel.findOne({email:req.email})
        .then(data=>
        {
            // logger.info(data);
            // logger.info('data',data.verify_value);
            
            /**
            *@description If isVerified property is true, then further operation are performed.
            */

            if(data.isVerified)
            {
                /**
                *@description Bcrypt compare password is used for matching input and output passwords
                */

                util.comparePassword(req.password,data.password,(err,result)=>
                {
                    if(err)
                    {
                        callback(err);
                    }    
                    else if(result)
                    {
                        userModel.login(data,(err,res)=>
                        {
                            if(err)
                                callback(err)          
                            else
                                callback(null,res);
                        });
                    }
                    else
                    {
                        logger.error('Login failed');
                        callback({message:"Wrong password entered"});
                    }
                })
            }
            else
            {
                callback({message:'User is not verified yet.Please check mail'})
            }
            
        })
        .catch(err=>
        {
            logger.error(err);
            callback({message:'User not found'})
        })
        
    }

    /**
    *@description Forgot service returns a promise which is either resolved/rejected. 
    */

    forgot(req)
    {
        return new Promise((resolve,reject)=>
        {
            userModel.findOne({email:req.email})
            .then(data=>
            { 
                /**
                 *@description If isVerified property is true, then further operation are performed.
                */

                if(data.isVerified == true)
                {
                    let result={
                        id:data._id,
                        email:data.email,
                        firstName:data.firstName,
                        success:true,
                        message:"Success"
                    }
                    resolve(result);
                }
                else
                {
                  reject({message:'User is not verified yet'});
                }
                
            })
            .catch(err=>
            {
                reject(err)
            })
           
        })
    }

    /**
    *@description Reset service returns a promise which is either resolved/rejected. 
    */

    reset(req)
    {
        return new Promise((resolve,reject)=>
        {   
            userModel.findOne({forgot_token:req.token})
            .then(data=>
            {

                /**
                *@description Bcrypt compare password is used for matching input and output passwords
                */

                util.comparePassword(req.new_password,data.password,(fail,success)=>
                {                   
                    if(success)
                    {
                        reject({message:"This password has been used before. Please try again"})
                    }
                    else
                    {
                        /**
                        *@description Password is hashed using bcrypt.
                        */

                        let hash = util.hashPassword(req.new_password);
                        hash.then(res=>
                        {
                            let request = {
                                _id:data._id,
                                password:res
                            }
                            userModel.reset(request)
                            .then(response=>
                            {
                                resolve(response);
                            })
                            .catch(err=>
                            {
                                reject(err);
                            })
                        })
                        .catch(err=>
                        {
                            reject(err);
                        });
                    }
                });
                
            })
            .catch(err=>
            {
                reject(err);
            })
        })
    }
}

module.exports = new Userservice();