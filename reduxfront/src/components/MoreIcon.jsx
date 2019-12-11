import React,{Component} from 'react';
import {Tooltip} from "@material-ui/core";
import './IconList.scss';

class More extends Component{
    render(){
        return(
            <div id='more' onClick={(event)=>this.props.openMenu(event)}>
                <Tooltip title='More'>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" xmlSpace="preserve" width="22" height="22" version="1.1" viewBox="0 0 18 18" enableBackground="new 0 0 18 18">
                        <path xmlns="http://www.w3.org/2000/svg" d="m9 5.5c1 0 1.8-0.8 1.8-1.8s-0.8-1.7-1.8-1.7-1.8 0.8-1.8 1.8 0.8 1.7 1.8 1.7zm0 1.7c-1 0-1.8 0.8-1.8 1.8s0.8 1.8 1.8 1.8 1.8-0.8 1.8-1.8-0.8-1.8-1.8-1.8zm0 5.3c-1 0-1.8 0.8-1.8 1.8s0.8 1.7 1.8 1.7 1.8-0.8 1.8-1.8-0.8-1.7-1.8-1.7z"/>
                    </svg>
                </Tooltip>
            </div>
        )
    }
}

export default More;