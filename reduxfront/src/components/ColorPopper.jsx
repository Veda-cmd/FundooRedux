/**
 * @description:
 * @file:ColorPopper.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/

import React,{Component} from 'react';
import './IconList.scss';
import Popper from '@material-ui/core/Popper';
import { Tooltip, IconButton } from '@material-ui/core';

/**
 * @description array of colors is declared.
*/

const array=[{code:'#FDFEFE',name:'White'},
            {code:'#ABEBC6',name:'Green'},
            {code:'#BB8FCE',name:'Pink'},    
            {code:'#F0B27A',name:'Brown'},
            {code:'#76D7C4',name:'Teal'},
            {code:'#D5DBDB',name:'Gray'}]

class ColorPopper extends Component{

    /**
     *@description loadColor is used to return the selected color through index and close
     * the Color Popper element. 
    */

    loadColor=(index)=>
    {
        this.props.props(array[index]);
        this.props.colorClose();
    }

    render(){
        return(
            <div>
                <Popper className='pop' open={this.props.changeColor} 
                anchorEl={this.props.anchorEl}
                placement='top-start'
                >
                    {array.map((item,index)=>
                        <div  key={index} >
                            <Tooltip title={item.name}>
                                <IconButton onClick={()=>this.loadColor(index)} style={{backgroundColor:item.code}}> 
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                </Popper>
            </div>
        )
    }
}

export default ColorPopper;