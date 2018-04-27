import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Favorite from '@material-ui/icons/Favorite';
export const mailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <Favorite />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      </div>
);