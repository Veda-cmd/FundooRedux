/**
* @description: 
* @file: s3Service.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

/**
*@description AWS S3 configuration is specified for connection.
*/

const s3Config = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.BUCKET_NAME
});

/**
*@description fileFilter is used for checking whether the given filetype is image or not.
*/

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
  {
    cb(null, true) 
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  else 
  {
    cb(null, false)
  }
}

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.BUCKET_NAME, 
  acl:'public-read',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, callback) 
  {
    callback(null, new Date().toISOString() + '-' + file.originalname)
  }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
})

module.exports.profileImage = upload;