/**
 * @description:
 * @file:Reset.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React,{Component} from 'react';
import './Reset.scss'
import '../index.css'
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
const Service = require('../services/services');
const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'rounded':{
                borderRadius:'50px'
            }
        },
    }
});

class Reset extends Component{
    constructor(props){
        super(props);
        this.state={
          password:'',
          confirm_password:''
        }
    }

    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit(event)
    {   
        if(this.state.password !== this.state.confirm_password)
        {
            alert("Passwords do not match.Please enter again.");
            this.setState({
                password:'',
                confirm_password:''
            });
            return;
        }
        
        let request =
        {
            token:this.props.match.params.token,
            new_password:this.state.password
        }

        Service.reset(request,(error,response)=>
        {
            if(error)
            {
                console.log('Error-->',error);
            }
            else
            {   
               console.log(response);
               alert("Password reset successful")
               this.props.history.replace('/');
            }
        });
    }

    render()
    {
        return(
            <div className='main'>
                <MuiThemeProvider theme={theme}>
                    <Card className='resetCard'>
                        <div className='resetTitle'>
                            <h3>Fundoo</h3>
                        </div>
                        <div className='resetHead'>
                            <h2>Reset Password</h2>
                        </div>
                        <form>
                            <div>
                                <TextField className='resetTextField' 
                                        label='New Password' 
                                        name='password'
                                        type='password'
                                        margin='normal' 
                                        variant='outlined'
                                        autoComplete='off'
                                        value={this.state.password}
                                        onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                            <div>
                                <TextField className='resetTextField' 
                                        label='Confirm New Password' 
                                        name='confirm_password'
                                        type='password'
                                        margin='normal' 
                                        autoComplete='off'
                                        variant='outlined'
                                        value={this.state.confirm_password}
                                        onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                        </form>
                        <div className='resetButton'>
                            <Button color='primary'
                                    margin='normal'
                                    variant='contained'
                                    onClick={(event)=>this.submit(event)}>Submit</Button>
                        </div>
                    </Card>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Reset;