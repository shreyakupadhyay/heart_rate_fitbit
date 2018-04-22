import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';


class OtherListItems extends Component{
    render(){
        return (
            <div>
                <ListItem button>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary="All mail" />
                </ListItem>
                <ListItem button>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Trash" />
                </ListItem>
                <ListItem button>
                <ListItemIcon>
                    <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="Spam" />
                </ListItem>
            </div>
        )
    }
}

export default OtherListItems;
