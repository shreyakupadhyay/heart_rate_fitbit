import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HeartRateListItems from './Drawer/heartRateListItems';

import HeartRate from './heartrate';
import ProfileMenu from './profileIcon';

// for tiles in drawer;
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Favorite from '@material-ui/icons/Favorite';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 10,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing.unit * 0,
  },
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      time: 0
    };
  }

  handleDrawerItems = (timeValue) => {
    this.setState({time: timeValue})
    console.log(this.state.time);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Dashboard
            </Typography>
            <ProfileMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <HeartRateListItems handleDrawerItems={this.handleDrawerItems}/>
            {/* <ListItem button onClick={() =>  this.setState({time: 0}) }>
              <ListItemIcon>
                <Favorite />
              </ListItemIcon>
              <ListItemText primary="Today's Rate" />
            </ListItem>
            <ListItem button onClick={() =>  this.setState({time: 8}) }>
              <ListItemIcon>
                <div>8 Hr</div>
              </ListItemIcon>
              <ListItemText primary="Last 8 Hours" />
            </ListItem>
            <ListItem button onClick={() =>  this.setState({time: 16}) }>
              <ListItemIcon>
                <div >16 Hr</div>
              </ListItemIcon>
              <ListItemText primary="Last 16 Hours" />
            </ListItem>
            <ListItem button onClick={() =>  this.setState({time: 24}) }>
              <ListItemIcon>
              <div >1 Day</div>
              </ListItemIcon>
              <ListItemText primary="Last 1 Day" />
            </ListItem> */}
          <Divider />
          {/* <List>{otherMailFolderListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <HeartRate time={this.state.time}/>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);