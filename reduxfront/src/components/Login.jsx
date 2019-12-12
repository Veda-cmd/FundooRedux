/**
 * @description:
 * @file:Login.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React, { Component } from 'react';
import './Login.scss';
import '../index.css';
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
const Service = require('../services/services');
var emailPattern =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm,
   passwordPattern = /^[a-zA-Z0-9]{6,20}$/;

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'rounded':{
                borderRadius:'50px'
            }
        },
    }
});

class Login extends Component
{
    constructor(props){

        /** 
         * @description super(props) would pass props to the parent constructor.
         * Initial state is set for email and password.
        */ 
       
        super(props);
        this.state={
          email:'',
          password:''
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
    
        if(!emailPattern.test(this.state.email) || !passwordPattern.test(this.state.password))
        {
            alert('Email or password fields are invalid');
            return;
        }
        else{
            let request =
            {
                email:this.state.email,
                password:this.state.password
            }
    
            Service.login(request,(error,success)=>
            {
                if(error)
                {
                    console.log('Error-->',error);
                }
                else
                {   
                    sessionStorage.setItem('token',success.data.session);
                    sessionStorage.setItem('name',success.data.response.firstName);
                    sessionStorage.setItem('email',success.data.response.email);
                    sessionStorage.setItem('img',success.data.response.imageUrl);
                    this.props.history.replace('/dashboard/notes');
                }
            });
        }
        
    }

    render()
    {
        return(
            <div className='main'>
                    <MuiThemeProvider theme={theme}>
                    <Card className='loginCard'>
                        <div className='loginTitle'>
                            <h3>Fundoo</h3>
                        </div>
                        <div className='loginHead'>
                            <h3>Login into your Fundoo account</h3>
                        </div>
                        <form>
                            <div>
                                <TextField className='loginTextField' 
                                        label='Email' 
                                        name='email'
                                        margin='normal' 
                                        variant='outlined'
                                        value={this.state.email}
                                        onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                            <div>
                                <TextField className='loginTextField'
                                        label='Password' 
                                        name='password'
                                        type='password'
                                        margin='normal' 
                                        autoComplete='off'
                                        variant='outlined'
                                        value={this.state.password}
                                        onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                        </form>
                        
                        <div>
                            <div className='forgot'>
                                <a className='Link' href='/forgot'>Forgot password?</a>
                            </div>
                            <div className='loginButton'>
                                <Button color='primary'
                                    margin='normal'
                                    variant='contained'
                                    onClick={(event)=>this.submit(event)}>Submit</Button>
                            </div>
                        </div>

                        <div className='register'>
                            <h3>Not registered yet?</h3>
                            <a className='Link' href='/register'>Create Fundoo Account</a>
                        </div>
                        
                    </Card> 
                    </MuiThemeProvider>
            </div>
        )
    }
}

export default Login;