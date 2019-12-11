/**
* @description: 
* @file: label.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const labelModel = require('../models/label');
const logger = require('./log');
const noteModel = require('../models/note');

class labelService {

    /**
    *@description Add service issues a callback to the calling function. 
    */

    add(req, callback) {
        labelModel.findOne({label_name:req.label_name})
            .then(data => {
                if (data != null) {
                    callback(null, data);
                }
                else {
                    labelModel.addLabel(req, (err, data) => {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(null, data);
                        }
                    });
                }
            })
            .catch(err => {
                callback(err);
            })
    }

    /**
    *@description update service issues a callback to the calling function. 
    */

    update(req, callback) {
        labelModel.update({ _id: req.label_id }, { label_name: req.label_name }, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data)
            }
        });
    }

    /**
    *@description search service returns a promise to the calling function.
    */

    search(req, res) {
        return new Promise((resolve, reject) => {
            noteModel.findAndPopulate(req, res, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        });
    }

    /**
    *@description delete service issues a callback to the calling function. 
    */

    delete(req, callback) {
        try {
            labelModel.delete(req, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null,data);
                }
            });
        } catch (error) {
            logger.error(error);
        }
    }

    getAllLabels(req){
        return new Promise((resolve,reject)=>
        {
            labelModel.findAll({user_id:req.email},(err,success)=>
            {   
                if(err){
                    reject(err)
                }
                else{
                    resolve(success);
                }
            })
        })
    }
}

module.exports = new labelService();