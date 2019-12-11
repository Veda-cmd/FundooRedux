/**
 * @description:
 * @file:CreateNote.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React,{Component} from 'react';
import {Card,TextField, Tooltip, Avatar} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import './CreateNote.scss';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Icon from './IconList';
const Service = require('../services/services');
let array =[],value=[];

class Note extends Component{
    
    constructor(props)
    {
        /** 
         * @description super(props) would pass props to the parent constructor.
         * @param title,description,color,reminder,remindFront,isArchived,open
        */ 

        super(props);
        this.state={
            title:'',
            description:'',
            color:'',
            label:[],
            reminder:null,
            remindFront:null,
            isArchived:false,
            open:false,
            labels:{
                label:[]
            }
        }
    }

    /**
     *@description input function is used to assign target value to target name. 
    */ 

    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     *@description setArchive is called when an note is archived.
    */

    setArchive=()=>{
        this.setState({
            isArchived:true,
            open:!this.state.open
        })
    }

    /**
     *@description getReminderData is used for setting reminder in both client and server
     * side. The data is filtered for representation on frontend and stored in remindFront.
    */

    getReminderData=(date,time)=>{

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

    getLabelData=(data)=>{
        array.push(data.label_name);
        value.push(data);
        let req={
            label:value
        }
       
        this.setState({
            label:array,
            labels:req
        })
    }

    /**
     *@description createNote function is used for creation of a new note. Title is mandatory 
     *while creating a note. createNote service is called and it returns error or success response.  
    */

    createNote=()=>
    {
        if(this.state.title !== ''){
            let request = {
                title:this.state.title,
                description:this.state.description,
                color:this.state.color,
                reminder:this.state.reminder,
                isArchived:this.state.isArchived,
                label:this.state.label
            }
            console.log(request);
            
            Service.createNote(request,(error,response)=>
            {
                if(error)
                {
                    console.log(error);
                    this.setState({
                        title:'',
                        description:'',
                        color:'',
                        reminder:null,
                        remindFront:null,
                        isArchived:false,
                        label:[]
                    })
                    array=[];
                    return;   
                }
                else
                {
                    this.setState({
                        title:'',
                        description:'',
                        color:'',
                        reminder:null,
                        remindFront:null,
                        isArchived:false,
                        label:[],
                        labels:{
                            label:[]
                        }  
                    })
                    array=[];
                    console.log('created',response);
                    this.props.getAllNotes();
                }
            });
            this.props.noteEditor();
        }
        else{
            console.log('err');
            this.setState({
                title:'',
                description:'',
                color:''
            });
            this.props.noteEditor(); 
        }
    }

    /**
     *@description handleClose is used to manage the state of Snackbar.
    */

    handleClose=()=>{
        this.setState({
            open:!this.state.open
        })
    }

    /**
     *@description getColor is used for setting the selected color as background of the note. 
    */

    getColor=(element)=>{
        let color = element.code;
        this.setState({
            color:color
        });   
    }

    /**
     *@description handleDelete is used for deletion of reminder Chip.
    */

    handleDelete=()=>{
       this.setState({
           remindFront:null
       })
    }

    handleLabelChip=(item)=>{
        let array = this.state.label;
        let res = array.filter((element)=>{
            return element !== item;
        });

        if(value.length!==0){
            for(let i=0;i<value.length;i++){
                if(value[i].label_name===item){
                    value.splice(i,1);
                    break;
                }
            }
        }
        
        this.setState({
            label:res,
            labels:{
                label:value
            }
        });
    }

    render()
    {
        // console.log(this.state.labels);
        
        return(
            <div>
                {this.props.openNoteEditor ? 
                    <Card className='cardOpen' style={{backgroundColor:this.state.color}}>
                        <div className='createTitle'>
                            <div>
                                <TextField id='title'
                                multiline={true}
                                placeholder='Title'
                                name='title'
                                value={this.state.title}
                                onChange={(event)=>this.input(event)}
                                InputProps={{
                                    disableUnderline:true
                                }}/>
                            </div>
                            <div className='pinned'>
                                <Tooltip title='Pin note'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill='none' d="M0 0h24v24H0z"/>
                                        <path d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"/>
                                    </svg>
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <TextField id='description' 
                            placeholder='Take a note...'
                            multiline={true}
                            autoFocus
                            name='description'
                            value={this.state.description}
                            onChange={(event)=>this.input(event)}
                            InputProps={{
                                disableUnderline:true
                            }} />
                        </div>
                        <div className='labelDiv'>
                            {this.state.remindFront===null?
                            null:
                            <Chip avatar={<Avatar src='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMjMuOTkgNGMtMTEuMDUgMC0xOS45OSA4Ljk1LTE5Ljk5IDIwczguOTQgMjAgMTkuOTkgMjBjMTEuMDUgMCAyMC4wMS04Ljk1IDIwLjAxLTIwcy04Ljk2LTIwLTIwLjAxLTIwem0wLjAxIDM2Yy04Ljg0IDAtMTYtNy4xNi0xNi0xNnM3LjE2LTE2IDE2LTE2IDE2IDcuMTYgMTYgMTYtNy4xNiAxNi0xNiAxNnoiLz4KIDxwYXRoIGQ9Im0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPgogPHBhdGggZD0ibTI1IDE0aC0zdjEybDEwLjQ5IDYuMyAxLjUxLTIuNDYtOS01LjM0eiIvPgo8L3N2Zz4K'></Avatar>}
                                label={this.state.remindFront}
                                onDelete={this.handleDelete}>
                            </Chip>
                            }
                            {this.state.label.length===0?
                            null:this.state.label.map((item,index)=>
                            <div key={index}>
                                <Chip
                                label={item}
                                onDelete={(event)=>this.handleLabelChip(item)}>
                                </Chip>
                            </div>)
                            }
                        </div>
                        <div id='main'>
                            <div className='icon'>
                                <Icon note={this.state.labels} 
                                getLabel={this.getLabelData}
                                openNoteEditor={this.props.openNoteEditor} 
                                getColor={this.getColor}
                                setArchive={this.setArchive}
                                getReminder={this.getReminderData} />
                            </div>
                            <div id='button'>
                                <button onClick={this.createNote} className='button'>Close</button>
                            </div>
                        </div>
                        <Snackbar
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Note archived</span>}
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
                    </Card>
                    :<Card className='card' onClick={this.props.noteEditor}>
                        <div>
                            <TextField
                                placeholder='Take a note...'
                                value={this.state.title}
                                InputProps={{
                                    disableUnderline:true
                                }}
                            />
                        </div>
                    </Card>}
            </div>
        )
    }
}

export default Note;