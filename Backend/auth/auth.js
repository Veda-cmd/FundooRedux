/**
* @description: 
* @file: auth.js
* @author: Vedant Nare
* @version: 1.0
*/ 

var jwt = require('jsonwebtoken');
var cache = require('../services/cache');
var userModel = require('../models/user');
const logger = require('../services/log');

/**
* @description generateToken is used for generating a json web token.
*/

let generateToken = (payload) =>
{
  let token = jwt.sign(payload, 'secret');
  return token;
}

/**
* @description checkToken is used for verifying a json web token.
*/

let checkToken = (req,res,next) =>
{   
    if(req.headers.token == undefined)
    {
        return res.status(422).send({message:"No token found"});
    }
    else
    {
        let path = req._parsedUrl.pathname.slice(1);
        let bearerHeader = req.headers.token;
        req.authenticated = false;
        jwt.verify(bearerHeader, 'secret', function (err, decoded)
        {
            if (err)
            {
                // logger.error('Error',err);
                req.authenticated = false;
                req.decoded = null;
                res.status(422).send(err);
            } 
            else 
            {
                cache.exist(decoded.id+path,(fail,success)=>
                {
                    if(fail)
                    {
                        logger.error(fail);
                        res.status(422).send(fail);
                    }     
                    else
                    {
                        cache.get(decoded.id+path,(error,reply)=>
                        {
                            if(error)
                            {
                                logger.error(error);
                                res.status(422).send(error);
                            }
                            else
                            {
                                let keyToken = reply;
                                // logger.info(keyToken);
                                // logger.info(bearerHeader);
                                if(keyToken == bearerHeader)
                                {
                                    logger.info(`${path} tokens matched`);
                                    req.decoded = decoded;
                                    req.authenticated = true;
                                    next();
                                }
                                else
                                {
                                    logger.error(`${path} tokens not matched`);
                                    return res.status(422).send({message:`${path} tokens not matched`});
                                }
                            }
                        });
                    }                                  
                });
            }
        });
    }   
}

/**
* @description verificationToken is used for verifying email verification web token.
*/

let verificationToken = (req,res,next) =>
{  
    let bearerHeader = req.query.url;
    
    userModel.findOne({urlCode:bearerHeader})
    .then(data=>
    {   
        if(data === null)
        {
            let response = {message:"No data found"};
            res.status(422).send(response);
        }
        else
        {
            let url = data.longUrl.slice(29);
            
            jwt.verify(url, 'secret', (err, decoded)=>
            {
                if (err)
                {
                    // logger.error('Error',err);
                    req.authenticated = false;
                    req.decoded = null;
                    res.status(422).send(err);
                }
                else
                {
                    cache.exist(decoded.id+'verify',(fail,success)=>
                    {
                        if(fail)
                        {
                            // logger.error(fail);
                            let failure = {
                                error:fail,
                                message:'Token does not exist'
                            }
                            return res.status(422).send(failure);
                        }     
                        else
                        {
                            cache.get(decoded.id+'verify',(error,reply)=>
                            {
                                if(error)
                                {
                                    // logger.error(error);
                                    res.status(422).send(error);
                                }
                                else
                                {
                                    let keyToken = reply;
                                    // logger.info(keyToken);
                                    // logger.info(url);
                                    if(keyToken == url)
                                    {
                                        logger.info('Verification Tokens matched');
                                        req.decoded = decoded;
                                        req.authenticated = true;
                                        next();
                                    }
                                    else
                                    {
                                        logger.error(`${path} tokens not matched`);
                                        return res.status(422).send({message:`${path} tokens not matched`});
                                    }
                                }
                            });
                        }                                  
                    })
                } 
            }); 
        }
           
    })
    .catch(err=>
    {
        res.status(422).send(err);
    })        
}

let loginToken = (req,res,next) =>
{
    if(req.headers.token == undefined)
    {
        res.status(422).send({message:"No token found"});
    }
    else
    {
        let bearerHeader = req.headers.token;
        req.authenticated = false;
        jwt.verify(bearerHeader, 'secret', function (err, decoded)
        {
            if (err)
            {
                // logger.error('Error',err);
                req.authenticated = false;
                req.decoded = null;
                res.status(422).send(err);
            } 
            else 
            {
                cache.exist(decoded.id+'loginSuccess',(fail,success)=>
                {
                    if(fail)
                    {
                        logger.error(fail);
                        res.status(422).send(fail);
                    }     
                    else
                    {
                        cache.get(decoded.id+'loginSuccess',(error,reply)=>
                        {
                            if(error)
                            {
                                logger.error(error);
                                res.status(422).send(error);
                            }
                            else
                            {
                                // logger.info(keyToken);
                                // logger.info(bearerHeader);
                                if(reply == bearerHeader)
                                {
                                    logger.info(`tokens matched`);
                                    req.decoded = decoded;
                                    req.authenticated = true;
                                    next();
                                }
                                else
                                {
                                    logger.error(`tokens not matched`);
                                    return res.status(422).send({message:`tokens not matched`});
                                }
                            }
                        });
                    }                                  
                });
            }
        });
    }
}

module.exports={checkToken,generateToken,verificationToken,loginToken}