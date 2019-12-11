/**
 * @description:
 * @file:Register.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React, { Component } from 'react';
import './Register.scss';
import '../index.css';
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Button, IconButton } from '@material-ui/core';
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

class Register extends Component
{
    constructor(props){

        /** 
         * @description super(props) would pass props to the parent constructor.
         * Initial state is set for first name, last name, email, password and show.
        */

        super(props);
        this.state={
          first_name:'',
          last_name:'',
          email:'',
          password:'',
          confirm_password:'',
          show:false
        }
    }
    
    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit=(event)=>
    {
        if(!emailPattern.test(this.state.email) || !passwordPattern.test(this.state.password))
        {
            alert('Email or password fields are invalid');
            return;
        }
        else if(this.state.password !== this.state.confirm_password)
        {
            this.setState({
                password:'',
                confirm_password:''
            });
            console.log('Passwords do not match');
            return;
        }
        else{

            let value =
            {
                firstName:this.state.first_name,
                lastName:this.state.last_name,
                email:this.state.email,
                password:this.state.password
            }

            Service.register(value,(error,response)=>
            {
                if(error)
                {
                    console.log('Error-->',error);
                }
                else
                {   
                    this.props.history.push('/');
                }
            });
        }
        
    }

    showPassword(event)
    {
        this.setState({
            show:!this.state.show,
        })
    }

    render()
    {
        return(
            <div className='main'>
                    <MuiThemeProvider theme={theme}>
                    <Card className='registerCard'>
                        <div className='registertitle'>
                            <h3>Fundoo</h3>
                        </div>
                        <h2 className='heading'>Create your Fundoo account</h2>
                        <form>
                        <div>
                            <div className='first'>
                                <TextField id='firstname' 
                                        label='First Name' 
                                        InputLabelProps={{style:{fontSize:15}}}
                                        name='first_name'
                                        margin='normal' 
                                        variant='outlined'
                                        value={this.state.first_name}
                                        onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                            <div className='last'>
                                <TextField id='lastname'
                                        label='Last Name' 
                                        name='last_name'
                                        InputLabelProps={{style:{fontSize:15}}}
                                        margin='normal' 
                                        variant='outlined'
                                        value={this.state.last_name}
                                        onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                        </div>
                        <div>
                            <TextField id='email'
                                       label='Email'
                                       name='email'
                                       margin='normal' 
                                       InputLabelProps={{style:{fontSize:15}}}
                                       variant='outlined'
                                       value={this.state.email}
                                       onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div className='passwordText'>
                            <p>You can use letters,symbols and periods</p>
                        </div>
                        <div>
                            <div className='passwordDiv'>
                                <TextField  id='password'
                                            label='Password'
                                            autoComplete='off'
                                            type={this.state.show?'text':'password'}
                                            name='password' 
                                            InputLabelProps={{style:{fontSize:15}}}
                                            margin='normal' 
                                            variant='outlined'
                                            value={this.state.password}
                                            onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                            <div className='confirm'>
                                <TextField  id='confirmpassword'
                                            label='Confirm Password'
                                            name='confirm_password'
                                            autoComplete='off'
                                            type={this.state.show?'text':'password'} 
                                            InputLabelProps={{style:{fontSize:15}}}
                                            margin='normal' 
                                            variant='outlined'
                                            value={this.state.confirm_password}
                                            onChange={(event)=>this.input(event)}>
                                </TextField>
                            </div>
                            <div className='showPassword'>
                                <IconButton onClick={(event)=>this.showPassword(event)}>
                                    {this.state.show?<VisibilityIcon/>:<VisibilityOffIcon/>}
                                </IconButton>
                            </div>
                        </div>
                        </form>
                        <div className='passwordText'>
                            <p>Use 6 or more characters with a mix of letters, numbers</p>
                        </div>
                        <div>
                            <div className='login'>
                                <a className='Link' href='/'>Sign in instead</a>
                            </div>
                            <div className='registerbutton' >
                                <Button 
                                    color='primary'
                                    margin='normal'
                                    variant='contained'
                                    onClick={(event)=>this.submit(event)}>Submit</Button>
                            </div>
                        </div>
                    </Card>
                    </MuiThemeProvider>
            </div>
        )
    }
}

export default Register;