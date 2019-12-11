/**
* @description: 
* @file: routes.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/ 

const express = require('express');
const router = express.Router();
const userControl = require('../controllers/user');
const noteController = require('../controllers/note');
const cacheController = require('../controllers/cache');
const auth = require('../auth/auth');
const { profileImage } = require('../services/s3');
const labelController = require('../controllers/label');


/**
*@description The particular method is called depending on the route. 
*/

router.post('/register', userControl.register);
router.post('/login', userControl.login);
router.post('/forgot',userControl.forgot);
router.post('/reset',auth.checkToken,userControl.reset);
router.post('/upload',auth.loginToken,profileImage.single('image'),userControl.upload);
router.post('/verify',auth.verificationToken,userControl.verifyMail);
router.post('/note/addNote',auth.loginToken,noteController.addNote);
router.get('/note/getAllNotes',auth.loginToken,cacheController.cacheNotes,noteController.getAllNotes);
router.get('/note/getListings',auth.loginToken,cacheController.cacheListings,noteController.getListings);
router.post('/note/addLabel',auth.loginToken,noteController.addLabelToNote);
router.post('/note/deleteLabel',auth.loginToken,noteController.deleteLabelFromNote);
router.post('/note/updateNote',auth.loginToken,noteController.updateNote);
router.post('/note/deleteNote',auth.loginToken,noteController.deleteNote);
router.post('/note/forever',auth.loginToken,noteController.deleteNoteForever);
router.post('/note/searchNote',auth.loginToken,noteController.searchNotes);
router.get('/label/getAllLabels',auth.loginToken,labelController.getAllLabels);
router.post('/label/add',auth.loginToken,labelController.addLabel);
router.post('/label/update',auth.loginToken,labelController.updateLabel);
router.post('/label/delete',auth.loginToken,labelController.deleteLabel);


module.exports = router;