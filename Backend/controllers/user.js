/**
* @description: 
* @file: userController.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/ 

const userService = require('../services/user');
const userModel = require('../models/user');
const urlService = require('../services/url');
const authentication = require('../auth/auth');
const mail = require('../services/mail');
const cache = require('../services/cache');
const logger = require('../services/log');

class Usercontroller
{

    /**
    *@description Register API is used for user registration. 
    */

    async register(req,res)
    {
        
        try 
        {
            /**
            * @description express-validator is used for validation of input. 
            */

            req.check('firstName','Length of name should be min 3 characters').isLength({min: 3});
            req.check('lastName','Last Name cannot be empty').notEmpty();
            req.check('email','Invalid email').isEmail();
            req.check('password','Invalid password').notEmpty().isLength({ min: 6 });
            const errors = await req.validationErrors();
            if(errors)
            {
                return res.status(422).json({ errors: errors });
            }

            /**
            *@description Register service is called. If success, it returns data which contains
            *email of the user and it sends a verification link to the user using short url.
            */

            userService.register(req.body)
            .then(data=>
            {   
                let request =
                {
                    email:data.email,
                    url:'http://localhost:3000/verify/'
                }

                /**
                * @description url shortener service is called. If success, it sends a mail to
                * the user using Nodemailer.
                */

                urlService.shortenUrl(request,(err,result)=>
                {   
                    
                    if(err)
                    {
                        res.status(422).send(err);
                    }  
                    else
                    { 
                        /**
                        * @description Verification email is sent using short url. 
                        */
                       
                        mail.sendVerifyLink(result.shortUrl,result.email);
                        res.status(200).send(result)
                    }        
                });
            })
            .catch(err=>
            {
                console.log(err);
                
                res.status(422).send(err);
            })    
        } 
        catch (error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }
    }

    /**
    *@description Login API is used for user login. 
    */

    async login(req,res)
    {
        try 
        {   
            /**
            * @description express-validator is used for validation of input. 
            */

            req.checkBody('email','Invalid email').notEmpty().isEmail();
            req.checkBody('password','Invalid password').notEmpty().isLength({ min: 6 });
            const errors = await req.validationErrors();
            if(errors)
            {
                return res.status(422).json({ errors: errors });
            }    
    
            /**
            *@description Login service is called.If success, response is sent using status 200.
            */

            userService.login(req.body,(err,data)=>
            {
                if(err)
                {   
                    res.status(422).send(err);
                }      
                else
                {
                    let key = data.id+'loginSuccess';
                    let payload = {
                        id: data.id,
                        email:data.email
                    }

                    let token = authentication.generateToken(payload);
                    
                    cache.set(key,token,(error,success)=>
                    {
                        if(error)
                        {
                            logger.error(error);
                        }
                        else
                        {
                            logger.info(success);
                        }
                    });

                    let result = {
                        response:data,
                        session:token
                    }

                    res.status(200).send(result);
                } 
            });
        } 
        catch(error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }    
    }

    /**
    *@description Forgot Password API is used for resetting user password. 
    */

    async forgot(req,res)
    {
        try
        {
            /**
            * @description express-validator is used for validation of input. 
            */

            req.checkBody('email','Invalid email').isEmail();
            const errors = await req.validationErrors();

            if(errors)
                return res.status(422).json({ errors: errors });
            
            userService.forgot(req.body)
            .then(data=>
            {
                /**
                * @description Token is generated and stored in a variable.
                */

                let id = data.id+'reset';
                let payload = {email:data.email,id:data.id};
                let token = authentication.generateToken(payload); 

                /**
                * @description Redis set method is used for storing forgot token.
                */

                cache.set(id,token,(error,response)=>
                {
                    if(error)
                    {
                        logger.error(error);
                    }
                    else
                    {
                        logger.info(response);
                    }
                });

                userModel.update({email:data.email},{forgot_token:token},(err,result)=>
                {
                    // logger.info('Err',err,'Result',result)
                    if(err)
                        res.status(422).send(err);
                    else
                    {
                        let url = 'http://localhost:3000/reset/'+token;
                        mail.sendForgotLink(url,data.email);
                        res.status(200).send(data);
                    }
                });               
            })
            .catch(err=>
            {
                res.status(422).send(err);
            });
        }
        catch(error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }
    }

    /**
    *@description Reset Password API is used for storing new password. 
    */

    async reset(req,res)
    {
        try 
        {   
            /**
            * @description express-validator is used for validation of input. 
            */

            req.check('new_password','Invalid password').notEmpty().isLength({ min: 6 });
            const errors = await req.validationErrors();

            if(errors)
            {
                return res.status(422).json({ errors: errors });
            }
            
            let request={
                token:req.headers.token,
                new_password:req.body.new_password
            }
            userService.reset(request)
            .then((data)=>
            {
                res.status(200).send(data);
            })
            .catch(err=>
            {
                // logger.error(err); 
                res.status(422).send(err);
            })    
        } 
        catch (error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }
    }

    /**
    *@description Email verification API is used for validation of user email.
    */

    async verifyMail(req,res)
    {   
        try 
        {
            urlService.verifyUrl(req.decoded,(err,data)=>
            {
                if(err)
                    res.status(422).send(err);
                else
                    res.status(200).send(data);
            })
        } 
        catch (error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }
    }

    /**
    * @description Upload API is used for uploading images to AWS S3. If success, image Url is 
    * stored in database corresponding to the particular user.
    */

    async upload(req,res)
    {   
        try 
        {
            /**
            * @description If file content/body of request is undefined, error message is sent out.
            */
            
            if(req.file == undefined || req.decoded.email == undefined)
            {
                return res.status(422).send({'message':'No location URL/params found'});
            }
            else
            {
                userModel.update({email:req.decoded.email},{imageUrl:req.file.location},(err,data)=>
                {
                    if(err)
                    {
                        logger.error(err);
                        res.status(422).send(err);
                    }    
                    else
                    {
                        res.status(200).send(data);
                    }    
                });
            }    
        } 
        catch(error) 
        {
            res.status(422).send(error);
        }
    }
}

module.exports=new Usercontroller();