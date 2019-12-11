/**
 * @description:
 * @file:DialogBox.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { TextField, Tooltip, Chip } from '@material-ui/core';
import Icon from './IconList';
import './DialogBox.scss';
const Service = require('../services/services');

class DialogBox extends Component {
    constructor(props) {

        /** 
         * @description super(props) would pass props to the parent constructor.
         * @param title,description,color
        */

        super(props);
        this.state = {
            remind:false,
            color: '',
            title: this.props.item.title,
            description: this.props.item.description,
            reminder:this.props.item.reminder,
            remindFront:null,
            label:this.props.item
        }
    }

    /**
     *@description input function is used to assign target value to target name. 
    */

    input = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setArchive=()=>{
        this.props.handleBox();
        this.props.setArchive();
    }

    deleteNote=()=>{
        this.props.handleBox();
        this.props.delete();
    }

    getLabelData=(data)=>{
       let array=this.state.label;

       array.label.push(data);
       this.setState({label:array});
    }

    getReminderData=(date,time)=>{

        this.setState({
            remind:true
        })
        let newTime= time.toString().slice(16,25),
        dateFront=date.toString().slice(3,10);
        var hours = time.getHours() ; // gives the value in 24 hours format
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = time.getMinutes(); 
        minutes=minutes<10?'0'+minutes:minutes;
        var finalTime = hours + ":" + minutes + " " + AmOrPm; 

        let remindFront=dateFront+', '+finalTime;
        let reminder=dateFront+','+date.toString().slice(11,15)+' '+newTime;
        
        this.setState({
            reminder:reminder,
            remindFront:remindFront
        })
        
    }

    /** 
     * handleClose is used to update the note when Dialog box is closed.
     * getNotes props is called to get updated Notes.
     * handleBox props is used to handle state of dialog box.
    */ 

    handleClose = (event) => {
       
        let request = {
            note_id: this.props.item.id,
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
        }
       
        Service.updateNote(request).then(response => {
            this.props.getNotes();
            this.props.handleBox();
        }).catch((err) => {
            console.log(err);
        })
    }

    handleClickAway=()=>{
        this.props.handleBox();
    }

    UNSAFE_componentWillReceiveProps() {
        this.setState({ 
            color: this.props.item.color,
            reminder:this.props.item.reminder,
            label:this.props.item
        })
    }

    /**
     *@description updateColor is used for setting the selected color as background of the note. 
    */

    updateColor = (element) => {
        let color = element.code;
        this.setState({
            color: color
        });

    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open}
                    id={this.props.open===false?'dialog':null}
                    PaperProps={{
                        style: {
                            backgroundColor: this.state.color
                        }
                    }}>
                    <div className='mainHead' >
                        <div>
                            <TextField id='dialogTitle'
                                multiline={true}
                                placeholder='Title'
                                name='title'
                                value={this.state.title}
                                onChange={(event) => this.input(event)}
                                InputProps={{
                                    disableUnderline: true
                                }} />
                        </div>
                        <div className='pinHead'>
                            <Tooltip title='Pin note'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill='none' d="M0 0h24v24H0z" />
                                    <path d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z" />
                                </svg>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <TextField id='dialogDesc'
                            placeholder='Take a note...'
                            multiline={true}
                            name='description'
                            value={this.state.description}
                            onChange={(event) => this.input(event)}
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                    <div className='reminderBox'>
                        {this.state.reminder===null?null:
                        <Chip label={this.state.remind?this.state.remindFront:this.state.reminder}></Chip>}
                        
                        {this.state.label.label.length===0?null:
                        this.state.label.label.map((item,index)=>
                            <div key={index}>
                                <Chip label={item.label_name}></Chip>
                            </div>
                        )}
                    </div>
                    <div className='iconHead'>
                        <div id='iconList'>
                            <Icon setArchive={this.setArchive}
                            delete={this.deleteNote}
                            dialog={this.props.open} 
                            getNotes={this.props.getNotes} 
                            getLabel={this.getLabelData}
                            getReminder={this.getReminderData} 
                            note={this.props.item}  
                            getColor={this.updateColor} />
                        </div>
                        <div id='buttonHead'>
                            <button className='buttonHead' onClick={(event) => this.handleClose(event)}>Close</button>
                        </div>
                    </div>
                </Dialog>
            </div>
    )
}
}

export default DialogBox;