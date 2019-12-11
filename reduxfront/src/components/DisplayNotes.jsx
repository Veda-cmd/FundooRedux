/**
 * @description:
 * @file:DisplayNotes.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/

import React, { Component } from 'react';
import { Card, Tooltip,Avatar} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Icon from './IconList';
import TrashIcons from './TrashIcons';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './DisplayNotes.scss';
import DialogBox from './DialogBox';
const Service = require('../services/services');

class DisplayNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
            open: false,
            snack: false,
            message:''
        }
    }

    handleDialogBox = () => {
        this.setState({
            open: !this.state.open
        })
    }

    input = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getReminderData=(date,time)=>{
        let newTime= time.toString().slice(16,25),
        dateFront=date.toString().slice(3,10);
        let reminder=dateFront+','+date.toString().slice(11,15)+' '+newTime;

        let request={
            note_id:this.props.note.id,
            reminder:reminder
        }
        Service.updateNote(request)
        .then(response=>{
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);
        
        });
    }

    /**
     *@description setArchive is called when an note is archived.
    */

    setArchive=()=>{
        this.setState({
            snack:true,
            message:'Note archived'
        })

        let request={
            note_id:this.props.note.id,
            isArchived:true
        }

        Service.updateNote(request)
        .then(res=>{
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);    
        }) 
    }

    setUnarchive=()=>{
        this.setState({
            snack:true,
            message:'Note unarchived'
        })

        let request={
            note_id:this.props.note.id,
            isArchived:false
        }

        Service.updateNote(request)
        .then(res=>{
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);    
        }) 
    }
    
    setColor = async (index) => {
        await this.setState({
            color: index.code
        })

        let request = {
            note_id: this.props.note.id,
            color: this.state.color
        }

        Service.updateNote(request, (err, response) => {
            if (err) {
                console.log(err);
            }
            else {
                this.props.getNotes();
            }
        });
    }

    deleteNote = () => {
        this.setState({
            snack: true,
            message:'Note moved to Trash'
        })
        
        let request = {
            note_id: this.props.note.id,
        }

        Service.deleteNote(request)
        .then(response => {
            
            this.props.getNotes();
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleClose = () => {
        this.setState({
            snack: false
        })
    }

    handleReminderChip=(event)=>{
        let request={
            note_id: this.props.note.id,
            reminder:null
        }

        Service.updateNote(request)
        .then(response=>{  
            this.setState({
                snack:true,
                message:'Reminder deleted'
            }) 
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    handleLabelChip=(item)=>{
        let request={
            note_id: this.props.note.id,
            label_id:item._id
        }
        
        Service.deleteLabelFromNote(request)
        .then(res=>{
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);
            
        })
        
    }

    handleRestoreNote=(event)=>{
        this.setState({
            snack: true,
            message:'Note restored'
        })
        
        let request = {
            note_id: this.props.note.id,
            isTrash:false
        }
        
        Service.updateNote(request)
        .then(response => {
            
            this.props.getNotes();
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleDeleteNote=(event)=>{
        let request = {
            note_id: this.props.note.id,
        }
        
        Service.deleteNoteForever(request)
        .then(response => {
            this.props.getNotes();
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleClickAway=()=>{
        this.handleDialogBox();
    }

    render() {
        return (
            <div className={this.props.list ? 'double' : 'single'}>
                <Card draggable  onDragStart={(e) => this.props.handleDragStart(e, this.props.note)}
                    style={{ backgroundColor: this.state.color === '' ? this.props.note.color : this.state.color }}>
                    <div className='title' onClick={this.handleDialogBox}>
                        <div className='label1'>
                            <label>{this.props.note.title}</label>
                        </div>
                        <div className='pin'>
                            <Tooltip title='Pin note'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z" />
                                </svg>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='label2'>
                        <label>{this.props.note.description}</label>
                    </div>
                    <div className='reminder'>
                        {this.props.note.reminder === null ? null :
                        <Chip avatar={<Avatar src='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMjMuOTkgNGMtMTEuMDUgMC0xOS45OSA4Ljk1LTE5Ljk5IDIwczguOTQgMjAgMTkuOTkgMjBjMTEuMDUgMCAyMC4wMS04Ljk1IDIwLjAxLTIwcy04Ljk2LTIwLTIwLjAxLTIwem0wLjAxIDM2Yy04Ljg0IDAtMTYtNy4xNi0xNi0xNnM3LjE2LTE2IDE2LTE2IDE2IDcuMTYgMTYgMTYtNy4xNiAxNi0xNiAxNnoiLz4KIDxwYXRoIGQ9Im0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPgogPHBhdGggZD0ibTI1IDE0aC0zdjEybDEwLjQ5IDYuMyAxLjUxLTIuNDYtOS01LjM0eiIvPgo8L3N2Zz4K'></Avatar>} 
                        label={this.props.note.reminder} onDelete={(event)=>this.handleReminderChip(event)}></Chip>}

                        {this.props.note.label.length===0?null:
                        this.props.note.label.map((item,index)=>
                            <div key={index}>
                                <Chip label={item.label_name} onDelete={(event)=>this.handleLabelChip(item)}></Chip>
                            </div>
                        )}
                    </div>
                    {this.props.trash!=='Trash'?
                        <div id='icons'>
                            <Icon archive={this.props.archive}
                                getReminder={this.getReminderData} 
                                setUnarchive={this.setUnarchive}
                                setArchive={this.setArchive}
                                getNotes={this.props.getNotes} 
                                note={this.props.note} 
                                getColor={this.setColor}
                                delete={this.deleteNote} />
                        </div>
                        :
                        <TrashIcons restore={this.handleRestoreNote}
                        delete={this.handleDeleteNote}
                        />
                    }
                    
                </Card>
                <div>
                    <DialogBox
                        open={this.state.open}
                        delete={this.deleteNote}
                        setArchive={this.setArchive}
                        getNotes={this.props.getNotes}
                        handleBox={this.handleDialogBox}
                        item={this.props.note} />
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snack}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            UNDO
                    </Button>,
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )

    }
}

export default DisplayNote;