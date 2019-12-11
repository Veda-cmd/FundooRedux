import React,{Component} from 'react';
import AppBar from './AppBar';
import './Dashboard.scss';
import Drawer from './Drawer';
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

class Archive extends Component{
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
           title:'Archive'
       }
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

    getArchivedNotes=()=>{
        Service.getListings('isArchived')
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
        this.getArchivedNotes();
        this.getAllLabels();
    }

    render(){
        return(
        <div>
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar title={this.state.title} 
                        handleDrawer={this.handleDrawerOpen}
                        getNotes={this.getArchivedNotes}
                        list={this.handleList}
                        tagChange={this.state.list}
                        props={this.props} 
                    />
                </div>
                <div>
                    <Drawer getValue={this.state.openDrawer} 
                    labels={this.state.labels}
                    props={this.props} />
                </div>
                <div className={this.state.openDrawer?'shift':'cardAnimate'}>
                    <div>
                        <Masonry className='displayCards'>
                        {this.state.notes.map((item,index)=>
                            <div key={index} >
                            <DisplayNote archive={this.state.title} 
                            note={item} getNotes={this.getArchivedNotes}
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

export default Archive;