import React,{Component} from 'react';
const Service = require('../services/services');

class Verification extends Component{

    load=()=>
    {
        let request= this.props.match.params.url;
        
        Service.verify(request,(error,response)=>
        {
            if(error)
            {
                console.log('Error-->',error);
            }
            else
            {   
               console.log(response);
            }
        })
    }

    render()
    {
        return(
            <div onLoad={this.load()}>
                <h1>Email verified successfully</h1>
            </div>
        )
    }
}

export default Verification;