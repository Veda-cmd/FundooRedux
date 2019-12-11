/**
* @description: 
* @file: note.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const noteService = require('../services/note');
const logger = require('../services/log');

class NoteController {

    /**
    *@description addNote API is used for creation of new note.
    */

    async addNote(req, res) {
        try {
            /**
            * @description express-validator is used for validation of input. 
            */
            
            req.check('title', 'Title cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }

            /**
            *@description note Service is called. If success, positive response is sent to client.
            */

            let request = {
                title: req.body.title,
                description: req.body.description,
                color:req.body.color || null,
                reminder:req.body.reminder || null,
                label:req.body.label || null,
                isPinned:req.body.isPinned || false,
                isArchived:req.body.isArchived || false,
                isTrash:req.body.isTrash || false,
                user_id: req.decoded.email,
            }
            
            noteService.add(request, (err, success) => {
                if (err) {
                   return res.status(422).send(err);
                }
                else {
                    return res.status(200).send(success);
                }
            });
        }
        catch (error) {
            let response = {};
            response.success = false;
            response.message = error.message;
            res.status(404).send(response);
        }
    }

    /**
    *@description getListings API is used for retrieving notes through params.
    */

    getListings(req, res) {
        try {
            /**
            *@description If params are not present in req.query, it goes to else part.
            */

            if ('isTrash' in req.query || 'isArchived' in req.query || 'isPinned' in req.query && 'email' in req.decoded) {
                let request = Object.keys(req.query)[0] === 'isTrash' ? { user_id: req.decoded.email, isTrash: true } :
                Object.keys(req.query)[0] === 'isArchived' ? { user_id: req.decoded.email, isArchived: true } :
                Object.keys(req.query)[0] === 'isPinned' ? { user_id: req.decoded.email, isPinned: true } :
                new Error("Undefined request");

                /**
                *@description note Service is called. If success, positive response is sent to client.
                */

                noteService.getListings(request)
                .then(data=>
                {
                    res.status(200).send(data);
                })
                .catch(err=>
                {
                    res.status(422).send(err);
                })           
            }
            else {
                return res.status(422).send({ message: "No params found in url" });
            }
        }
        catch (error) {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }

    }

    /**
    *@description getAllNotes API is used for retreiving list of all notes stored in database.
    */

    getAllNotes(req,res) {
        try {
            noteService.getAllNotes(req.decoded)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                logger.error({ message: "Error in finding notes." });
                res.status(422).send(err);
            });
        } 
        catch (error) {
            res.status(422).send({message:"Operation failed."});
        }       
    }

    /**
    *@description searchNotes API is used for searching notes.
    */

    searchNotes(req, res) {
       
        try {
            /**
            *@description If params are not present in req.body, it goes to else part.
            */

            if ('search' in req.body && 'email' in req.decoded) {
                req.check('search', 'Search content cannot be empty').notEmpty();
                const errors = req.validationErrors();
                if (errors) {
                    return res.status(422).json({ errors: errors });
                }

                let request = {
                    email: req.decoded.email,
                    search: req.body.search
                }

                /**
                *@description note Service is called. If success, positive response is sent to client.
                */

                noteService.search(request, (err, result) => {
                    if (err) {
                        res.status(422).send(err);
                    }
                    else {
                        res.status(200).send(result);
                    }
                });
            }
            else {
                return res.status(422).send({ message: "No params found in body of request" });
            }
        }
        catch (error) {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }

    }

    /**
    *@description updateNote API is used for updating one/many fields in a note.
    */

    updateNote(req, res) {
        
        try { 
            req.checkBody('note_id', 'Note id cannot be empty').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }

            if ('title' in req.body || 'description' in req.body || 'color' in req.body ||
                'reminder' in req.body || 'isArchived' in req.body || 'isPinned' in req.body || 'isTrash' in req.body
                && 'email' in req.decoded) {

                    let note = {
                        note_id:req.body.note_id,
                        title: req.body.title || null,
                        description: req.body.description || null,
                        color: req.body.color || null,
                        isArchived: req.body.isArchived || false,
                        isPinned: req.body.isPinned || false,
                        reminder: req.body.reminder,
                        isTrash: req.body.isTrash || false
                    }
                    
                    
                noteService.updateNote(note)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(422).send(err);
                })
            }
        }
        catch (error) {
            logger.error("Operation failed");
        }
    }

    /**
    *@description deleteNote API is used for moving notes to Trash.
    */

    deleteNote(req, res) {
        try {
            req.checkBody('note_id', 'Note id cannot be empty').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }
            noteService.deleteNote(req.body, (err, data) => {
                if (err) {
                    res.status(422).send(err);
                }
                else {
                    res.status(200).send(data);
                }
            })    
        } 
        catch (error) {
            res.status(422).send({message:"Operation failed."});
        }
        
    }

    /**
    *@description deleteNoteForever API is used for deleting note permanently.
    */

    deleteNoteForever(req,res){
        
        try {
            req.checkBody('note_id', 'Note id cannot be empty').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }
            
            noteService.deleteNoteForever(req.body, (err, data) => {
                if (err) {
                    res.status(422).send(err);
                }
                else {
                    res.status(200).send(data);
                }
            })
        } 
        catch (error) {
            res.status(422).send({message:"Operation failed."});
        }
    }

    /**
    *@description addLabelToNote API is used for adding labels to an existing note.
    */

    addLabelToNote(req, res) {
        console.log(req.body);
        
        req.checkBody('note_id', 'Note id cannot be empty').notEmpty();
        req.checkBody('label_name', 'Label name cannot be empty').notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(422).json({ errors: errors });
        }

        noteService.addLabelToNote(req.body)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(422).send(err);
            });
    }

    /**
    *@description deleteLabelFromNote API is used for deleting label from notes.
    */

    deleteLabelFromNote(req, res) {
        try {
            console.log(req.body);
            
            req.checkBody('note_id', 'Note id cannot be empty').notEmpty();
            req.checkBody('label_id', 'Label id cannot be empty').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }
            noteService.deleteLabelFromNote(req.body)
                .then(data => {
                    console.log(data);
                    
                    res.status(200).send(data);
                })
                .catch(err => {
                    logger.error(err);
                });
        }
        catch (error) {
            logger.error("Operation unsuccessful");
        }
    }
}

module.exports = new NoteController();