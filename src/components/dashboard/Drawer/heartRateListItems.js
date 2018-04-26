import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Favorite from '@material-ui/icons/Favorite';


class HeartRateListItems extends Component{
    constructor(props) {
      super(props);
    }


    componentWillReceiveProps(props) {
      const { handleDrawerItems } = props;
    }

    render(){
        return (
            <div>
                <ListItem button onClick={() =>  {this.props.handleDrawerItems(0)} }>
                <ListItemIcon>
                    <Favorite />
                </ListItemIcon>
                <ListItemText primary="Heart Rate" />
                </ListItem>
                <ListItem button onClick={() =>  {this.props.handleDrawerItems(8)} }>
                <ListItemIcon>
                    <div>8 Hr</div>
                </ListItemIcon>
                <ListItemText primary="8 Hours" />
                </ListItem>
                <ListItem button onClick={() =>  {this.props.handleDrawerItems(16)} }>
                <ListItemIcon>
                    <div >16 Hr</div>
                </ListItemIcon>
                <ListItemText primary="16 Hours" />
                </ListItem>
                <ListItem button onClick={() =>  {this.props.handleDrawerItems(24)} }>
                <ListItemIcon>
                <div >1 Day</div>
                </ListItemIcon>
                <ListItemText primary="24 Hours" />
                </ListItem>
            </div>
        )
    }
}

export default HeartRateListItems;