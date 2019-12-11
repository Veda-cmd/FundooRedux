import React,{Component} from 'react';
import Popper from '@material-ui/core/Popper';
import './IconList.scss';
import { Checkbox, Divider } from '@material-ui/core';
const Service=require('../services/services');

class LabelPoppper extends Component{
    constructor(props){
        super(props);
        this.state={
            labels:[],
            noteLabels:this.props.note
        }
    }

    UNSAFE_componentWillMount(){
        this.getAllLabels();
    }

    UNSAFE_componentWillReceiveProps(){
        this.setState({
            noteLabels:this.props.note
        })
    }

    getAllLabels=()=>{
        Service.getAllLabels((err,res)=>{
            if(err){
                console.log(err);
            }
            else{
                this.setState({
                    labels:res.data
                })
            }
        });
    }

    loadLabel=(event,item)=>{
        
        if(this.props.more){
            this.props.getLabel(item);
            return;
        }
        else if(this.props.dialog){
            
            if(event.target.checked === false){
                for(let i=0;i<this.state.noteLabels.label.length;i++){
                    if(this.state.noteLabels.label[i]._id===item._id){
                        this.state.noteLabels.label.splice(i,1);
                        this.setState({
                            noteLabels:this.state.noteLabels
                        });
                    }
                }
    
                let request={
                    note_id:this.state.noteLabels.id,
                    label_id:item._id
                }
                Service.deleteLabelFromNote(request)
                .then(response=>{
                    // console.log(response);
                   this.props.getLabel(item)
                })
                .catch(err=>{
                    console.log(err);
                    
                });
            }
            else{
                let request={
                    note_id:this.state.noteLabels.id,
                    label_name:item.label_name
                }
    
                Service.addLabelToNote(request)
                .then(response=>{
                    this.props.getLabel(item);
                })
                .catch(err=>{
                    console.log(err);
                    
                });
            }
        }
        else{
            
            if(event.target.checked === false){
                for(let i=0;i<this.state.noteLabels.label.length;i++){
                    if(this.state.noteLabels.label[i]._id===item._id){
                        this.state.noteLabels.label.splice(i,1);
                        this.setState({
                            noteLabels:this.state.noteLabels
                        });
                    }
                }

                let request={
                    note_id:this.state.noteLabels.id,
                    label_id:item._id
                }
               
                Service.deleteLabelFromNote(request)
                .then(response=>{
                    // console.log(response);
                    
                    this.props.getNotes();
                })
                .catch(err=>{
                    console.log(err);
                    
                });
            }
            else{
                let request={
                    note_id:this.state.noteLabels.id,
                    label_name:item.label_name
                }

                Service.addLabelToNote(request)
                .then(response=>{
                    // console.log(response);
                    this.props.getNotes();
                })
                .catch(err=>{
                    console.log(err);
                    
                });
            }
        }
    }
  

    render(){
       
        return(
            <div>
                <Popper className='labelPop' open={this.props.open} anchorEl={this.props.anchorEl}
                placement='top-start'>
                    <div id='label'>
                        <span>Label</span>
                    </div>
                    <div className='divide'>
                        <Divider />
                    </div>
                    <div>
                        {this.state.labels.map((item,index)=>
                         <div key={index} >
                            <Checkbox
                            checked={this.state.noteLabels.label.find((choice)=>choice._id===item._id)}
                            onChange={(event)=>this.loadLabel(event,item)} />
                            <span>{item.label_name}</span>
                         </div>
                        )} 
                    </div>
                </Popper>
            </div>
        )
    }
}

export default LabelPoppper;