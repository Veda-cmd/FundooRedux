import React,{Component} from 'react';
import Popper from '@material-ui/core/Popper';
import './IconList.scss';
import List from '@material-ui/core/List';
import LabelPopper from './LabelPopper';
import ListItem from '@material-ui/core/ListItem';

class MenuPopper extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            anchorEl:this.props.anchorEl
        }
    }

    handleLabelPopper=(event)=>{
        this.setState({
            open:!this.state.open,
        });
        this.props.closeMenu();
    }

    render(){
        return(
            <div>
                <div>
                {this.props.more?
                <Popper className='menuPop' open={this.props.open} anchorEl={this.props.anchorEl}
                    placement='top-start'>
                    <List className='listText'>
                        <ListItem button onClick={(event)=>this.handleLabelPopper(event)}>
                            <span>Add Label</span>
                        </ListItem>
                    </List>
                </Popper>
                :
                <Popper className='menuPop' open={this.props.open} anchorEl={this.props.anchorEl}
                placement='top-start'>
                    <List className='listText'>
                        <ListItem button onClick={this.props.delete}>
                            <span>Delete Note</span>
                        </ListItem>
                        <ListItem button onClick={(event)=>this.handleLabelPopper(event)}>
                            <span>Add Label</span>
                        </ListItem>
                    </List>
                </Popper>}
                </div>
                <div>
                    <LabelPopper dialog={this.props.dialog} 
                    more={this.props.more}
                    getLabel={this.props.getLabel} 
                    note={this.props.note} 
                    open={this.state.open} 
                    getNotes={this.props.getNotes}
                    anchorEl={this.props.anchorEl} />
                </div>
            </div>
        )
    }
}

export default MenuPopper;