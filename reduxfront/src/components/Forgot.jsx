/**
 * @description:
 * @file:Forgot.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React,{Component} from 'react';
import './Forgot.scss';
import '../index.css';
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

class Forgot extends Component{

    constructor(props){
        super(props);
        this.state={
          email:''
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
        let request =
        {
            email:this.state.email
        }

        Service.forgot(request,(error,response)=>
        {
            if(error)
            {
                console.log('Error-->',error);
            }
            else
            {   
               console.log(response);
               alert('Reset password link has been sent to registered email');
               this.setState({
                   email:''
               })
            
            }
        })
    }

    render(){
        return(
            <div className='main'>
                <MuiThemeProvider theme={theme}>
                    <Card className='forgotCard'>
                        <div className='loginTitle'>
                            <h3>Fundoo</h3>
                        </div>
                        <div className='loginHead'>
                            <h2>Forgot Password Page</h2>
                        </div>
                        <div>
                            <TextField className='forgotTextField' 
                                       label='Email' 
                                       name='email'
                                       margin='normal' 
                                       variant='outlined'
                                       value={this.state.email}
                                       onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div className='forgotButton'>
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

export default Forgot;