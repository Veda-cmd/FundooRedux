/**
* @description: 
* @file: urlService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const validUrl = require('valid-url');
const shortid = require('shortid');
const auth = require('../auth/auth');
const userModel = require('../models/user');
const cache = require('./cache');
const logger = require('./log');

class urlService
{
    /**
    *@description Url is shortened using shortid and stored in User database. 
    */

    shortenUrl(req, callback)
    {
        const baseUrl = req.url;
        const urlCode = shortid.generate();
        if (validUrl.isUri(baseUrl)) 
        {
            try 
            {
                userModel.findOne({email:req.email})
                .then(data=>
                {
                    // logger.info('data',data);
                    let id = data._id+'verify';
                    // logger.info(id);
                    let token = auth.generateToken({email:req.email,id:data._id});
                    cache.set(id,token,(fail,response)=>
                    {
                        if(fail)
                        {
                            logger.error(fail);
                        }
                        else
                        {
                            logger.info(response);
                        }
                    });
                    const longUrl = baseUrl + token;
                    const shortUrl = baseUrl + urlCode;
                    userModel.update({_id:data._id},{longUrl:longUrl,shortUrl:shortUrl,urlCode:urlCode},(error,res)=>
                    {
                        if(error)
                            callback(error);
                        else
                        {
                            let response = {
                                success:true,
                                shortUrl:shortUrl,
                                email: data.email,
                                message:'User registered in database'
                            };
                            callback(null,response);
                        }
                    });    
                })
                .catch(err=>
                {
                    callback(err)    
                })  
            } 
            catch (error) 
            {
                let res =
                {
                    success:false,
                    message:"Server error",
                    error:error 
                };
                logger.error(error);
                callback(res);
            }
        } 
        else 
        {
            callback({message:'Invalid base url'});
        }
    }

    /**
    *@description User is verified and flag is set to true for the particular user in User database. 
    */

    verifyUrl(req,callback)
    {   
        
        userModel.update({email:req.email},{isVerified:true},(error,result)=>
        {
            if(error)
            {
                callback(error);
            } 
            else
            {
                let res={message:'Updated Flag Value'}
                callback(null,res);
            }        
        });
    }
}

module.exports=new urlService();