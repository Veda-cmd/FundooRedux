/**
 * @description:
 * @file:AppBar.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import './Dashboard.scss';
import Toolbar from '@material-ui/core/Toolbar';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createMuiTheme,Tooltip, Avatar, Card, Popper, ClickAwayListener} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
import './Dashboard.scss';
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
        }
    }
});

const useStyles = {
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      backgroundColor:'transparent'
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position:'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'lightgrey',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(9),
        width: '700px',
        borderRadius:'10px'
      },
    },
};

/** 
 *@description withStyles is the higher order component that you use to merge in the styles.
*/

export default connect() (withStyles(useStyles)(
    class AppToolBar extends Component{

        constructor(props)
        {
            /** 
             * @description super(props) would pass props to the parent constructor.
             * @param anchorEl,open,openDrawer and src
             * Initial state is set for anchorEl,open,openDrawer and src.
            */ 

            super(props);
            this.state={
                anchorEl:null,
                openDrawer:false,
                search:false,
                open:false,
                refresh:false,
                src:sessionStorage.getItem('img')
            }
        }

        handleReload=()=>
        {
            this.setState({
                refresh:!this.state.refresh
            })
            this.props.getNotes();
        }

        /**
         * @description handleSignOut is used to redirect to the user login page.
        */

        handleSignOut=()=>
        {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('img');
            this.props.props.history.push('/');
        }

        searchOpen=(event)=>{
            this.setState({
                toggle:!this.state.toggle,
            })

            this.props.dispatch({
                type:'SEARCH',
                value:!this.state.toggle
            })
        }

        search=(event)=>{
            if(event.target.value.length>0){
                this.setState({
                    search:true
                })
    
                let request={
                    search:event.target.value
                }
            
                Service.search(request)
                .then(res=>{
                    this.props.dispatch({
                        type:'SEARCHDATA',
                        value:res.data.data,
                        search:this.state.search,
                        show:this.state.toggle
                    })
                    
                })
                .catch(err=>{
                    console.log(err);
                })
            }
            else
            {
                this.setState({
                    search:false
                })
            }
        }

        searchClose=(event)=>{
            this.setState({
                toggle:!this.state.toggle
            })

            this.props.dispatch({
                type:'SEARCH',
                value:!this.state.toggle
            })
        }

        /**
         * @description Popup menu is displayed when handleMenu is triggered.
         *  anchorEl is the DOM element used to set the position of the menu.
         * open: If true, menu is visible.
        */ 

        handleMenu = event => {
            this.setState({
                anchorEl:event.currentTarget,
                open:!this.state.open
            })
        };

        /**
         * @description handleClose is used to close the popup menu.
        */   

        handleClose = () => {
            this.setState({
                anchorEl:null,
                open:false
            })
        };

        handleDrawer=()=>{
            this.setState({
                openDrawer:!this.state.openDrawer
            })
            
            this.props.dispatch({
            type:'DRAWER',
            value:!this.state.openDrawer});
        }

        render()
        {
            const {classes} = this.props;
            return(
            <div className={classes.grow}>
                <ClickAwayListener onClickAway={this.handleClose}>
                <AppBar position='fixed' color='inherit'>
                    <Toolbar>
                        <IconButton
                        edge='start'
                        onClick={this.handleDrawer}
                        color='inherit'
                        className={classes.menuButton}
                        aria-label='open drawer'>
                            <MenuIcon />
                        </IconButton>
                        {this.props.title===null?
                        <div className='imgTitle'>
                            <img className='image' alt="Logo" aria-hidden="true" src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png" />
                            <Typography className='header' variant='h6' noWrap>Fundoo</Typography>
                        </div>:
                        <div className='imgTitle'><Typography className='header' variant='h6' noWrap>{this.props.title}</Typography></div>
                        }
                       
                        <div className={classes.search}>
                            <InputBase
                            startAdornment={(
                                <InputAdornment position='start' >
                                    <Tooltip title='search'>
                                        <SearchIcon />
                                    </Tooltip>   
                                </InputAdornment> 
                            )}
                            // value={this.props.value}
                            onChange={(event)=>this.search(event)}
                            onClick={(event)=>this.searchOpen(event)}
                            placeholder='Search' 
                            inputProps={{'aria-label':'search'}}
                            endAdornment={(this.state.toggle?<button onClick={(event)=>this.searchClose(event)} id='searchButton' aria-label="Clear search" type="button">
                                <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                </svg>
                                </button>:null)}
                            />
                        </div>
                        <div className={this.state.refresh?'loader':'refresh'} onClick={this.handleReload}>
                            <Tooltip title='Refresh'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18">
                            <path d="M9 13.5c-2.49 0-4.5-2.01-4.5-4.5S6.51 4.5 9 4.5c1.24 0 2.36.52 3.17 1.33L10 8h5V3l-1.76 1.76C12.15 3.68 10.66 3 9 3 5.69 3 3.01 5.69 3.01 9S5.69 15 9 15c2.97 0 5.43-2.16 5.9-5h-1.52c-.46 2-2.24 3.5-4.38 3.5z"/>
                            </svg>
                            </Tooltip>							
                        </div>
                        <div className='settings' onClick={(event)=>this.props.list(event)}>
                            {this.props.tagChange?
                                <Tooltip title='Grid View'>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24">
                                        <defs>
                                            <path d="M3,3 L10,3 C10.55,3 11,3.45 11,4 L11,10 C11,10.55 10.55,11 10,11 L3,11 C2.45,11 2,10.55 2,10 L2,4 C2,3.45 2.45,3 3,3 Z M3,13 L10,13 C10.55,13 11,13.45 11,14 L11,20 C11,20.55 10.55,21 10,21 L3,21 C2.45,21 2,20.55 2,20 L2,14 C2,13.45 2.45,13 3,13 Z M14,3 L21,3 C21.55,3 22,3.45 22,4 L22,10 C22,10.55 21.55,11 21,11 L14,11 C13.45,11 13,10.55 13,10 L13,4 C13,3.45 13.45,3 14,3 Z M14,13 L21,13 C21.55,13 22,13.45 22,14 L22,20 C22,20.55 21.55,21 21,21 L14,21 C13.45,21 13,20.55 13,20 L13,14 C13,13.45 13.45,13 14,13 Z M9,9 L9,5 L4,5 L4,9 L9,9 Z M9,19 L9,15 L4,15 L4,19 L9,19 Z M20,9 L20,5 L15,5 L15,9 L20,9 Z M20,19 L20,15 L15,15 L15,19 L20,19 Z" id="path-1"/>
                                        </defs>
                                        <g id="grid_view_24px" stroke="none" stroke-width="1">
                                            <polygon id="bounds" fill-opacity="0" points="0 0 24 0 24 24 0 24"/>
                                            <mask id="mask-2">
                                                <use xlinkHref="#path-1"/>
                                            </mask>
                                            <use id="icon" fill-rule="nonzero" xlinkHref="#path-1"/>
                                        </g>
                                    </svg>
                                </Tooltip>
                            :
                            <Tooltip title='List View'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                <path d="M20,9 L4,9 L4,5 L20,5 L20,9 Z M20,19 L4,19 L4,15 L20,15 L20,19 Z M3,3 C2.45,3 2,3.45 2,4 L2,10 C2,10.55 2.45,11 3,11 L21,11 C21.55,11 22,10.55 22,10 L22,4 C22,3.45 21.55,3 21,3 L3,3 Z M3,13 C2.45,13 2,13.45 2,14 L2,20 C2,20.55 2.45,21 3,21 L21,21 C21.55,21 22,20.55 22,20 L22,14 C22,13.45 21.55,13 21,13 L3,13 Z" />
                            </svg>
                            </Tooltip>}
                        </div>
                        <div className='settings'>
                            <Tooltip title='Settings'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"/>
                                <circle cx="12" cy="12" r="3.5"/>
                            </svg>
                            </Tooltip>  
                        </div>
                        <div className='profile'>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            className='iconButton'
                            aria-haspopup="true"
                            color="inherit"
                            onClick={(event)=>{this.handleMenu(event)}}
                            >
                            <Avatar src={this.state.src} />
                        </IconButton>
                        <Popper
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            placement='bottom-start'
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <Card className='menu'>
                                <div className='imagediv'>
                                    <img className='picture' alt='Profile' src={this.state.src}/>
                                </div>
                                <div>
                                    <div className='text'>{sessionStorage.getItem('name')}</div>
                                    <div className='text'>{sessionStorage.getItem('email')}</div>
                                   <button className='changeButton'>Change Picture</button>
                                </div>
                                <div></div>
                                <div>
                                <button className='signOut'
                                onClick={this.handleSignOut}>Sign Out</button>
                                </div>
                            </Card>
                        </Popper>
                        </div>
                    </Toolbar>
                </AppBar>
                </ClickAwayListener>
            </div>)
        }
    }
))
