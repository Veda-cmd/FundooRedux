import React,{Component} from 'react';
import './Dashboard.scss';
import {connect} from 'react-redux';
import NoteEditor from './CreateNote';
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
                width: "250px"
            },
            'paperAnchorDockedLeft': {
                borderRight: '0px solid'
            }
        },
        'MuiPaper': {
            'elevation4': {
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)'
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
        }
    }
});


class Label extends Component{
    constructor(props){
        /** 
         * @description super(props) would pass props to the parent constructor.
         * Initial state is set for anchorEl,open,openDrawer and src.
        */ 

       super(props);
       this.state={
           openDrawer:false,
           openNoteEditor:false,
           list:false,
           notes:[],
           labels:[],
           name:null,
           title:this.props.match.params.name
       }
       this.getAllLabels();
    }

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

    getNoteswithLabels=()=>{
        Service.getNotes(async(err,response)=>
        {
            if(err)
            {
                console.log('Error',err);
            }
            else
            {
                let data = response.data.reverse(),
                res=[]   
                
                let array = await data.filter(item => {
                  return item.label.length!==0
                })
               
                for(let i=0;i<array.length;i++){
                    
                    for(let j=0;j<array[i].label.length;j++){   
                        if(array[i].label[j].label_name===this.props.match.params.name){
                            res.push(array[i]);
                            break;
                        }
                    }
                }
                
                this.setState({
                    notes:res,
                    name:this.props.match.params.name,
                    title:this.props.match.params.name
                });
            }
        })
    }
    
    componentDidUpdate(){
        if(this.props.match.params.name!==this.state.name){
            this.props.dispatch({
            type:'TITLE',
            value:this.props.match.params.name
            }) 
            this.getNoteswithLabels();
        }
    }

    render(){
        
        return(
        <div>
            <MuiThemeProvider theme={theme}>
                <div className={this.state.openDrawer?'shift':'cardAnimate'}>
                    <NoteEditor labels={this.state.labelsNote} 
                        openNoteEditor={this.state.openNoteEditor}
                        noteEditor={this.handleNoteEditor} 
                        getAllNotes={this.getNoteswithLabels} />
                    <div className='displayCards'>
                        {this.state.notes.map((item,index)=>
                            <div key={index} >
                            <DisplayNote 
                            note={item} getNotes={this.getNoteswithLabels}
                            list={this.state.list} />
                            </div>
                        )}
                    </div>
                </div>
            </MuiThemeProvider>
        </div>)
    }
}

export default connect()(Label);