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
                <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button onClick={() =>  {this.props.handleDrawerItems(8)} }>
                <ListItemIcon>
                    <div>8 Hr</div>
                </ListItemIcon>
                <ListItemText primary="Starred" />
                </ListItem>
                <ListItem button onClick={() =>  {this.props.handleDrawerItems(16)} }>
                <ListItemIcon>
                    <div >16 Hr</div>
                </ListItemIcon>
                <ListItemText primary="Send mail" />
                </ListItem>
                <ListItem button onClick={() =>  {this.props.handleDrawerItems(24)} }>
                <ListItemIcon>
                <div >1 Day</div>
                </ListItemIcon>
                <ListItemText primary="Drafts" />
                </ListItem>
            </div>
        )
    }
}

export default HeartRateListItems;