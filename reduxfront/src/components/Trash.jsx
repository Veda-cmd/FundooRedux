import React,{Component} from 'react';
import './Dashboard.scss';
import {connect} from 'react-redux';
import Masonry from 'react-masonry-component';
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

class Trash extends Component{
    constructor(props){
        /** 
         * @description super(props) would pass props to the parent constructor.
         * Initial state is set for anchorEl,open,openDrawer and src.
        */ 

       super(props);
       this.state={
           openDrawer:false,
           list:false,
           notes:[],
           labels:[],
           title:'Trash'
       }
       this.props.dispatch({
        type:'TITLE',
        value:'Trash'
        }) 
    }

    handleDrawerOpen=(event)=>{
        this.setState({
            openDrawer:!this.state.openDrawer,
            openNoteEditor:false
        });
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

    getTrashNotes=()=>{
        Service.getListings('isTrash')
        .then(response=>{
            let data = response.data.reverse();  
            this.setState({
                notes:data,
            });
        })
        .catch(err=>{
            console.log(err);   
        })
    }

    UNSAFE_componentWillMount(){
        this.getTrashNotes();
        this.getAllLabels();
    }

    render(){
        console.log(this.state.notes);
        
        return(
        <div>
            <MuiThemeProvider theme={theme}>
                <div className={this.state.openDrawer?'shift':'cardAnimate'}>
                    <div>
                        <Masonry className='displayCards'>
                        {this.state.notes.map((item,index)=>
                            <div key={index} >
                            <DisplayNote trash={this.state.title}
                            note={item} getNotes={this.getTrashNotes}
                            list={this.state.list} />
                            </div>
                        )}
                        </Masonry>
                    </div>
                </div>
            </MuiThemeProvider>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        open: state
    }
}

export default connect(mapStateToProps)(Trash);