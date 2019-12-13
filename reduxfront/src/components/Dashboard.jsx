/**
 * @description:
 * @file:Dashboard.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React,{Component} from 'react';
import './Dashboard.scss';
import {connect} from 'react-redux';
import Appbar from './AppBar';
import Drawer from './Drawer';
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

class Dashboard extends Component{

    constructor(props)
    {
        /** 
         * @description super(props) would pass props to the parent constructor.
         * Initial state is set for anchorEl,open,openDrawer and src.
        */ 

        super(props);
        this.state={
            labels:[],
            value:''
        }  
        this.getAllLabels();     
    }

    handleNotes=()=>{
        this.props.history.push('/dashboard/notes');
    }

    handleArchive=()=>{
        this.props.history.push('/dashboard/archive');
    }

    handleTrash=()=>{
        this.props.history.push('/dashboard/trash');
    }

    handleReminder=()=>{
        this.props.history.push('/dashboard/reminders');
    }

    handleLabel=(item)=>{
        this.props.history.push(`/dashboard/label/${item.label_name}`);
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

    render()
    {
        return(
            <div>
                <MuiThemeProvider theme={theme}>
                    <div>
                    <Appbar value={this.state.value} 
                        opensearch={this.searchOpen} 
                        toggle={this.state.toggle}
                        close={this.searchClose} 
                        search={this.searchNotes} 
                        getNotes={this.getAllNotes}
                        list={this.handleList}
                        tagChange={this.state.list}
                        props={this.props} />
                    </div>
                    <div>
                        <Drawer 
                            handleReminder={this.handleReminder}
                            handleNotes={this.handleNotes}
                            handleArchive={this.handleArchive}
                            handleLabel={this.handleLabel}
                            handleTrash={this.handleTrash}
                            getValue={this.state.openDrawer}
                            getLabels={this.getAllLabels}
                            labels={this.state.labels}
                        ></Drawer>
                    </div>
                </MuiThemeProvider> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        open: state
    }
}

export default connect(mapStateToProps)(Dashboard);