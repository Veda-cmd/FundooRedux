/**
 * @description:
 * @file:AllNotes.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React,{Component} from 'react';
import './Dashboard.scss';
import {connect} from 'react-redux';
import Masonry from 'react-masonry-component';
import Note from './CreateNote';
import DisplayNote from './DisplayNotes';
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
const Service = require('../services/services');
const theme = createMuiTheme({
    overrides: {
        'MuiInputBase': {
            'input': {
                height: "2.1875em",
                padding: "10px 12px 9px 0",
            },
            'root':{
                display:'flex',
                marginLeft:'20px',
                cursor:'pointer'
            }
        },
        'MuiDrawer': {
            'paper': {
                top: "66px",
                width: "250px",
                height:'calc(100% - 50px);'
            },
            'paperAnchorDockedLeft': {
                borderRight: '0px solid'
            }
        },
        'MuiPaper': {
            'elevation4': {
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)'
            },
            'rounded':{
                borderRadius:'10px',
                border:'1px solid lightgrey'
            }
        },
        'MuiTypography':{
            'noWrap':{
                overflow:'initial'
            },
            'h6':{
                marginLeft:"10px",
                fontSize:'1.5rem'
            }
        },
        'MuiListItem': {
            'button': {
                '&:hover':{'borderRadius':'0 25px 25px 0'}
            },
        },
        'MuiChip':{
            'root':{
                marginLeft:'10px',
                marginTop:'10px'
            }
        },
        'MuiButtonBase':{
            'root':{
                backgroundColor:null,
                borderRadius:null
            }
        },
        'MuiButton':{
            'root':{
                backgroundColor:'transparent'
            }
        },
        'MuiIconButton':{
            'root':{
                backgroundColor:'transparent'
            }
        }
    }
});

class AllNotes extends Component{

    constructor(props)
    {
        /** 
         * @description super(props) would pass props to the parent constructor.
         * Initial state is set for anchorEl,open,openDrawer and src.
        */ 

        super(props);
        this.state={
            openNoteEditor:false,
            list:false,
            notes:[],
            pinned:[],
            labels:[],
            title:null,
            search:false,
            value:''
        } 
        this.props.dispatch({
            type:'TITLE',
            value:null
        }) 

        this.getAllNotes();
        this.getAllLabels(); 
        this.getPinnedNotes();     
    }
 
    /**
     * @description handleDrawerOpen is used to handle drawer navigation on dashboard.
     * if true, the drawer is displayed else it is closed.
    */

    handleDrawerOpen=(event)=>{
        this.setState({
            openDrawer:!this.state.openDrawer,
            openNoteEditor:false
        });
    }

    /**
     * @description handleNoteEditor is used for managing open/close state of note editor.
    */

    handleNoteEditor=()=>
    {
        this.setState({
            openNoteEditor:!this.state.openNoteEditor
        })
    }

    handleList=(event)=>
    {
        this.setState({
            list:!this.state.list
        })
    }

    handleReminder=()=>{
        this.props.history.push('/dashboard/reminders');
    }

    getAllNotes=()=>
    {
        Service.getNotes((err,response)=>
        {
            if(err)
            {
                console.log('Error',err);
            }
            else
            {
                let data = response.data.reverse(); 
                this.setState({
                    notes:data,
                });
            }
        })
    }

    getAllLabels=()=>{
        Service.getAllLabels((err,response)=>{
            if(err)
            {
                console.log('Error',err);
            }
            else
            {
                this.setState({
                    labels:response.data,
                });
            }
        })
    }

    getPinnedNotes=()=>{
        Service.getListings('isPinned')
        .then(response=>{
            let data = response.data.reverse();  

            this.setState({
                pinned:data,
            });
        })
        .catch(err=>{
            console.log(err);   
        })
    }


    handleDragStart=(e,note)=>{
        e.dataTransfer.setData('text/plain', note.id);
    }

    onDrop=(e,index)=>{
        let note = e.dataTransfer.getData('text');
        let temp,noteArray=this.state.notes;

        for(let i=0;i<noteArray.length;i++){  
            if(noteArray[i].id === note){
                temp=noteArray[index];
                noteArray[index]=noteArray[i];
                noteArray[i]=temp;
                break;
            }
        }

        this.setState({
            notes:noteArray
        })
    }

    render()
    {
        return(
            <div>
                <MuiThemeProvider theme={theme}>
                    {this.props.toggle?
                    <div>
                        {this.props.search?
                        <div className={this.props.open?'shift':'cardAnimate'}>
                            <Masonry className='displayCards'>
                            {this.props.data.map((item,index)=>
                                <div key={index} >
                                <DisplayNote 
                                note={item} getNotes={this.getAllNotes}
                                list={this.state.list} />
                                </div>
                            )}
                            </Masonry>
                        </div>  
                        :
                        <div>
                            <div className='searchDisplay'></div>
                            <div className='searchText'>No search data</div>
                        </div>}
                    </div>:
                    <div className={this.props.open?'shift':'cardAnimate'}>
                        <Note labels={this.state.labelsNote} 
                            openNoteEditor={this.state.openNoteEditor}
                            noteEditor={this.handleNoteEditor} 
                            getAllNotes={this.getAllNotes} />
                        {this.state.pinned.length!==0?
                        <div>
                            <div className='displayCards'>
                                <div className='pinText'>Pinned</div>
                                {this.state.pinned.map((item,index)=>
                                    <div key={index}  onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e)=>this.onDrop(e,index)}>
                                    <DisplayNote handleDragStart={this.handleDragStart}
                                    note={item} getNotes={this.getAllNotes} pinNotes={this.getPinnedNotes}
                                    list={this.state.list} />
                                    </div>
                                )}
                            </div>
                            <div className='displayCards'>
                                <div className='pinText'>Others</div>
                                {this.state.notes.map((item,index)=>
                                    <div key={index}  onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e)=>this.onDrop(e,index)}>
                                    <DisplayNote handleDragStart={this.handleDragStart}
                                    note={item} getNotes={this.getAllNotes} pinNotes={this.getPinnedNotes}
                                    list={this.state.list} />
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <div className='displayCards'>
                            {this.state.notes.map((item,index)=>
                                <div key={index}  onDragOver={(e) => e.preventDefault()}
                                onDrop={(e)=>this.onDrop(e,index)}>
                                <DisplayNote handleDragStart={this.handleDragStart}
                                note={item} getNotes={this.getAllNotes} pinNotes={this.getPinnedNotes}
                                list={this.state.list} />
                                </div>
                            )}
                        </div>}
                    </div>
                    }
                </MuiThemeProvider> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.postReducer.drawer,
        toggle:state.postReducer.search,
        data :state.postReducer.searchData,
        search:state.postReducer.view
    }
}

export default connect(mapStateToProps)(AllNotes);