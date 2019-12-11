/**
* @description: 
* @file: labelModel.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

const mongoose = require('mongoose');
const logger = require('../services/log');

/**
*@description Label schema is defined for specifying structure of label document.
*/

const labelSchema = mongoose.Schema({
    label_name:{
        type:String,
        required:true,
        unique:true
    },
    user_id:{
        type:String,
        required:true
    }
});

/**
*@description Label Model is defined for storing object in database. 
*/

const Label = mongoose.model('label',labelSchema);

class labelModel
{
    /**
    *@description Label Model has the following functions:
    * findOne: for finding a particular record from database. It takes a single parameter.
    * findAll: for retrieving list of existing records from database.
    * update: for updating label field in database.
    * delete: for deleting an given label in database.
    * addLabel: for saving label object in note collection. 
    */

    findOne(req)
    {
        return new Promise((resolve,reject)=>
        {
            Label.findOne(req)
            .then(data=>
            {
                //logger.info(data); 
                resolve(data);
            })
            .catch(err=>
            {
                logger.error(err);
                reject(err);
            });
        });
    }

    findAll(req,callback)
    {
        Label.find(req,(err,data)=>
        {
            if(err)
            {
                callback(err);
            }   
            else
            {    
                if(data.length != 0)
                {
                    callback(null,data);
                }
                else
                {
                    callback({message:"No data found"});
                }    
            }        
        });
    }

    update(req,res,callback)
    {  
        Label.findOneAndUpdate(req,res,{new:true})
        .then(data=>
        {
            // logger.info(data);
            callback(null,data);
        })
        .catch(err=>
        {
            callback(err);
        });
    
    }

    delete(req,callback)
    {
        Label.findOneAndDelete(req,(err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                console.log(data);
                callback(null,data);
            }
        })
    }

    addLabel(req,callback)
    {
        const label = new Label({
            label_name:req.label_name,
            user_id:req.user_id
        });
        
        label.save((err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                let res ={
                    _id:data._id,
                    label_name:data.label_name,
                    message:"Label created successfully"
                }
                callback(null,res);
            }
        });
    }
}

module.exports = new labelModel();

