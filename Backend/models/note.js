/**
* @description: 
* @file: noteModel.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

const mongoose = require('mongoose');
const logger = require('../services/log');

/**
*@description Note schema is defined for specifying structure of note document.
*/

const noteSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:''
    },
    label:[{ type: mongoose.Schema.Types.ObjectId, ref: 'label' }],
    reminder:{
        type:Date,
        required:false,
        default:null
    },
    color:{
        type:String,
        required:false,
        default:null
    },
    isPinned: {
        type:Boolean,
        required:false,
        default:false
    },
    isArchived: {
        type:Boolean,
        required:false,
        default:false
    },
    isTrash: {
        type:Boolean,
        required:false,
        default:false
    },
},
{timestamps:true});

/**
*@description Note Model is defined for storing object in database. 
*/

const Note = mongoose.model('note',noteSchema);

class noteModel
{
    /**
    *@description Note Model has the following functions:
    * findOne: for finding a particular record from database. It takes a single parameter.
    * findAll: for retrieving list of existing records from database.
    * findAndPopulate: for populating objects with fields from other collection.
    * updateOne: for updating an given note field in database.
    * updateMany: for updating one or more note fields in database.
    * add: for saving note object in note collection. 
    */

    findOne(req)
    {
        return new Promise((resolve,reject)=>
        {
            Note.findOne(req)
            .then(data=>
            {           
                // logger.info(data); 
                resolve(data);
            })
            .catch(err=>
            {
                logger.error("Error in find");
                reject(err);
            });
        });
    }

    findAll(req,callback)
    {
       
        Note.find(req,(err,data)=>
        {
            if(err)
            {
                callback(err);
            }   
            else
            {     
                callback(null,data);  
            }        
        });
    }

    findAllAndPopulate(updateParam,callback)
    {
        Note.find(updateParam).populate({path:'label'})
        .exec((err,data)=>
        {
            if(err)
            {
                logger.error(`Error in findAllAndPopulate--> ${err}`);
                callback(err);
            }
            else
            {
                callback(null,data);
            }
        });
    }

    findAndPopulate(updateParam,query,callback)
    {
        Note.find(updateParam).populate({path:'label',match:{label_name:query.search}})
        .exec((err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                let result =  data.filter((item)=>                
                {
                    return item.label.length!=0;
                });
                callback(null,result);
            }
        });
    }

    updateOne(req,query,callback)
    { 
        Note.findOneAndUpdate(req,query,{new:true})
        .then(data=>
        {
            callback(null,data);
        })
        .catch(err=>
        {
            logger.error(`In updateOne error-->${err}`);
            callback(err);
        });
    }

    updateMany(req,res,callback)
    { 
        Note.updateMany(req,res,{new:true})
        .then(data=>
        {
            console.log('data',data);
            callback(null,data);
        })
        .catch(err=>
        {
            callback(err);
        });
    }

    deleteOne(req,callback){
       
        Note.findOneAndDelete(req)
        .then(res=>{
            
            callback(null,res)
        })
        .catch(err=>{
            logger.error(err)
        })
    }

    add(req,callback)
    {
        const note = new Note({
            user_id:req.user_id,
            title:req.title,
            description:req.description,
            reminder:req.reminder,
            color:req.color,
            isArchived:req.isArchived,
            isTrash:req.isTrash,
            isPinned:req.isPinned
        });
        note.save((err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                console.log(data);
                
                let res ={
                    id:data._id,
                    title:note.title,
                    message:"Note created successfully"
                }
                callback(null,data);
            }
        });
    }

}

module.exports = new noteModel();
