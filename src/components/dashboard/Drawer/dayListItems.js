import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MailIcon from '@material-ui/icons/Mail';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Today from '@material-ui/icons/Today';
import DateRange from '@material-ui/icons/DateRange';



class DayListItems extends Component{
    render(){
        return (
            <div>
                <ListItem button>
                <ListItemIcon>
                    <ArrowBack />
                </ListItemIcon>
                <ListItemText primary="Yesterday" />
                </ListItem>
                <ListItem button>
                <ListItemIcon>
                    <Today />
                </ListItemIcon>
                <ListItemText primary="Today" />
                </ListItem>
                <ListItem button>
                <ListItemIcon>
                    <DateRange />
                </ListItemIcon>
                <ListItemText primary="Date Range" />
                </ListItem>
            </div>
        )
    }
}

export default DayListItems;
