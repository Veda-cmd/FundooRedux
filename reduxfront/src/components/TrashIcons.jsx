import React,{Component} from 'react';
import {Tooltip} from "@material-ui/core";
import './IconList.scss';

class TrashIcons extends Component{
    render(){
       
        return(
            <div className='trashIcons'>
                <div id='deleteicon' onClick={(event)=>this.props.delete(event)}>
                    <Tooltip title='Delete forever'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z"/>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                        <path fill="none" d="M0 0h24v24H0z"/>
                    </svg>
                    </Tooltip>
                </div>
                <div id='restore' onClick={(event)=>this.props.restore(event)}>
                    <Tooltip title='Restore'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24">
                        <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z"/>
                        <path fill="none" d="M0 0h24v24H0z"/>
                    </svg>
                    </Tooltip>
                </div>
            </div>
        )}
}

export default TrashIcons;