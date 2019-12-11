import React,{Component} from 'react';
import './DialogBox.scss';
import { Dialog, List, ListItemIcon, ListItem, Tooltip} from '@material-ui/core';
const Service = require('../services/services');

class EditDialog extends Component{
    
    constructor(props){
        super(props);
        this.state={
            label:[],
            create:true,
            labelName:'',
            exist:false, 
            rename:false,
            checkid:''
        }
    }

    UNSAFE_componentWillReceiveProps(newProps){ 
        this.setState({
            label:newProps.labels
        })
    }

    focusInput = (component) => {
        if (component) {
          component.focus();
        }
    }

    changeValue=(event)=>{
        this.setState({
            labelName:event.target.value,
            exist:false
        })
    }

    handleFocus=(event)=>{
        this.setState({
            create:!this.state.create,
            checkid:''
        })
    }

    rename=(item)=>{
        this.setState({
            checkid:item,
            create:!this.state.create
        })
    }

    createLabel=(event)=>{
        let labelArray=this.state.label;
        
        for(let i=0;i<labelArray.length;i++){
            if(labelArray[i].label_name===this.state.labelName){
                this.setState({
                    exist:true,
                    labelName:''
                })
                break;
            }
        }

        if(this.state.exist===false){
            let request={
                label_name:this.state.labelName
            }
            Service.addLabel(request)
            .then((res)=>{
                this.setState({
                    labelName:''
                })
                this.props.getLabels();
            })
            .catch(err=>{
                console.log(err); 
            })
        }
    }

    deleteLabel=(item)=>{
        let request={
            id:item._id
        }
       
        Service.deleteLabel(request)
        .then(res=>{
            this.props.getLabels();
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);
            
        })

    }

    renameLabel=()=>{
        let request={
            label_name:this.state.labelName,
            label_id:this.state.checkid
        }
       
        Service.updateLabel(request)
        .then((res)=>{
            this.setState({
                labelName:'',
                checkid:''
            })
            this.props.getLabels();
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err); 
        })
    }

    render(){
       
        return(
            <div>
                <Dialog open={this.props.open}>
                    <div>
                        <div id='editDialog'>
                            <div id="createLabelTitle">
                                <span>Edit Labels</span>
                            </div>
                            {this.state.create?
                            <div className='createLabel'>
                                <div id="createLabelStart" onClick={(event)=>{this.handleFocus(event)}}>
                                    <Tooltip title='Cancel'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 18 18">
                                            <path d="m0 0h18v18h-18zh18v18h-18z" fill="none"/>
                                            <path d="m14.53 4.53l-1.06-1.06-4.47 4.47-4.47-4.47-1.06 1.06 4.47 4.47-4.47 4.47 1.06 1.06 4.47-4.47 4.47 4.47 1.06-1.06-4.47-4.47z"/>
                                        </svg>
                                    </Tooltip>
                                </div>
                                <div className='inputLabel'>
                                    <input id='input' value={this.state.labelName} ref={this.focusInput} onChange={(event)=>{this.changeValue(event)}}
                                    autoFocus placeholder='Create new label'/>
                                </div>
                                <div id="createLabelDone" className='inputLabel' onClick={(event)=>{this.createLabel(event)}}>
                                    <Tooltip title='Create Label'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 18 18">
                                            <path d="m0 0h18v18h-18z" fill="none"/>
                                            <path d="m6.61 11.89l-3.11-3.11-1.06 1.06 4.17 4.16 8.95-8.95-1.06-1.05z"/>
                                        </svg>
                                    </Tooltip>
                                </div>
                            </div>:
                            <div className='createLabel'>
                                <div id="createLabelStart" onClick={(event)=>{this.handleFocus(event)}}>
                                <Tooltip title='Create Label'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 48 48">
                                        <path d="m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z"/>
                                        <path d="m0 0h48v48h-48z" fill="none"/>
                                    </svg>
                                </Tooltip>
                                </div>
                                <div className='inputLabel' >
                                    <input id='inputBefore' value='' onClick={(event)=>{this.handleFocus(event)}} 
                                    placeholder='Create new label'/>
                                </div>
                            </div>
                            }
                            {this.state.exist?
                            <div className='exist'>Label already exists</div>:
                            null}
                            <List>
                                {this.state.label.map((item,index)=>
                                <ListItem key={index} id='show'>
                                    <ListItemIcon>
                                        <div id='delete' onClick={(event)=>this.deleteLabel(item)}>
                                            <Tooltip title='Delete label'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 48 48">
                                                    <path d="m0 0h48v48h-48z" fill="none"/>
                                                    <path d="m12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/>
                                                </svg>
                                            </Tooltip>
                                        </div>
                                        <div id='label'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 48 48">
                                                <path d="m0 0h48v48h-48z" fill="none"/>
                                                <path d="m35.27 11.69c-0.73-1.02-1.92-1.69-3.27-1.69l-22 0.02c-2.21 0-4 1.77-4 3.98v20c0 2.21 1.79 3.98 4 3.98l22 0.02c1.35 0 2.54-0.67 3.27-1.69l8.73-12.31-8.73-12.31z"/>
                                            </svg>
                                        </div>  
                                    </ListItemIcon>
                                    
                                    {this.state.checkid===item._id?
                                        <div>
                                            <input id='inputLabel' ref={this.focusInput} onChange={(event)=>{this.changeValue(event)}}
                                            defaultValue={item.label_name} className='labelName' />
                                            <ListItemIcon className='rename' onClick={this.renameLabel}>
                                                <Tooltip title='Rename label'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 18 18">
                                                        <path d="m0 0h18v18h-18z" fill="none"/>
                                                        <path d="m6.61 11.89l-3.11-3.11-1.06 1.06 4.17 4.16 8.95-8.95-1.06-1.05z"/>
                                                    </svg>
                                                </Tooltip>
                                            </ListItemIcon>
                                        </div>
                                        :
                                        <div>
                                            <input id='inputLabel' value={item.label_name} className='labelName' 
                                            onClick={(event)=>this.rename(item._id)}/>
                                            <ListItemIcon className='rename' onClick={(event)=>this.rename(item._id)}>
                                                <Tooltip title='Rename label'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 48 48">
                                                        <path d="m6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c0.78-0.78 0.78-2.05 0-2.83l-4.67-4.67c-0.78-0.78-2.05-0.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/>
                                                        <path d="m0 0h48v48h-48z" fill="none"/>
                                                    </svg>
                                                </Tooltip>
                                            </ListItemIcon>
                                        </div>
                                    }
                                </ListItem>
                                )}
                            </List>
                        </div>
                        <div id='done'>
                            <button onClick={(event)=>{this.props.handleDialog(event)}} className='done'>Done</button>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default EditDialog;