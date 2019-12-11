import React,{Component} from 'react';
import './IconList.scss';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import { Popover, Divider, ListItemText } from '@material-ui/core';


class RemindPopper extends Component{
    constructor(props){
        super(props);
        this.state={
            date:null,
            time:null
        }
    }

    handleDate=(date)=>{
        this.setState({
            date:date
        })
    }

    handleTime=(time)=>{
        this.setState({
           time:time
        })
    }

    getReminder=()=>{
        this.props.getReminder(this.state.date,this.state.time);
        this.props.close();
    }

    render(){
        return(
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Popover open={this.props.open} 
                        anchorEl={this.props.anchorEl}
                        
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal:'center'
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal:'center'
                        }}>
                        <div className='remindTitle'>Pick Date and Time</div>
                        <div>
                            <Divider/>
                        </div>
                        
                        <div className='datePicker'>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                value={this.state.date}
                                onChange={(date)=>this.handleDate(date)}
                                format="MM/dd/yyyy"
                                KeyboardButtonProps={{
                                'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div className='timePicker'>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                value={this.state.time}
                                onChange={(time)=>this.handleTime(time)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </div>  
                        <div className='save' onClick={this.getReminder}>
                           <ListItemText>Save</ListItemText>
                        </div> 
                    </Popover>
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default RemindPopper;