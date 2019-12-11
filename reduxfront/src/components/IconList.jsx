import React, { Component } from 'react';
import RemindIcon from './RemindIcon';
import ColorIcon from './Color';
import ArchiveIcon from './ArchiveIcon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreIcon from './MoreIcon';
import RemindPopper from './RemindPopper';
import ColorPopper from './ColorPopper';
import MenuPopper from './MenuPopper';
import './IconList.scss'
import { Tooltip } from '@material-ui/core';

class Icon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeColor: false,
            menuOpen: false,
            remind: false,
            anchorEl: null
        }
    }

    loadColor = (element) => {
        this.props.getColor(element);
    }

    loadReminder = (event) => {
        this.setState({
            remind: !this.state.remind,
            anchorEl: event.currentTarget
        })
    }

    closeReminder = () => {
        this.setState({
            remind: !this.state.remind
        })
    }

    getData = (date, time) => {
        this.props.getReminder(date, time);
    }

    changeColour = (event) => {
        this.setState({
            changeColor: !this.state.changeColor,
            anchorEl: event.currentTarget
        })
    }

    menuOpen = (event) => {
        this.setState({
            menuOpen: !this.state.menuOpen,
            anchorEl: event.currentTarget
        })
    }

    closeColour = () => {
        this.setState({
            changeColor: false,
            anchorEl: null
        })
    }

    closeMenu = () => {
        this.setState({
            menuOpen: false,
        })
    }

    delete=()=>{
        this.props.delete();
        this.closeMenu();
    }

    handleClickAway=()=>{
        this.closeColour();
        this.closeMenu();
    }

    render() {
        
        return(
            <ClickAwayListener onClickAway={this.handleClickAway}>
            <div className='options'>
                <RemindIcon openRemind={this.loadReminder} />
                <ColorIcon setColor={this.changeColour} />
                {this.props.archive==='Archive'?
                    <div id='unarchive' onClick={this.props.setUnarchive}>
                        <Tooltip title='Unarchive'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5.5l4-4 4 4-1.41 1.41L13 13.33V17h-2v-3.67l-1.59 1.59L8 13.5z"/>
                            </svg>
                        </Tooltip>
                    </div>
                    :
                    <ArchiveIcon setArchive={this.props.setArchive} />
                }
                
                <MoreIcon openMenu={this.menuOpen} />

                <ColorPopper changeColor={this.state.changeColor}
                    anchorEl={this.state.anchorEl}
                    colorClose={this.closeColour}
                    props={this.loadColor}
                />
                
                <MenuPopper dialog={this.props.dialog} 
                    getLabel={this.props.getLabel}  
                    getNotes={this.props.getNotes}
                    note={this.props.note} 
                    more={this.props.openNoteEditor}
                    delete={this.delete}
                    open={this.state.menuOpen}
                    closeMenu={this.closeMenu}
                    anchorEl={this.state.anchorEl} 
                />
            
                <RemindPopper getReminder={this.getData} close={this.closeReminder}
                open={this.state.remind} anchorEl={this.state.anchorEl} />
            </div>  
            </ClickAwayListener>      
        )
    }
}

export default Icon;