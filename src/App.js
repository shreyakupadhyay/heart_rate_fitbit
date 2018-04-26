import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dashboard from './components/dashboard/dashboard';
import MiniDrawer from './components/dashboard/drawer'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
              <Route exact path='/' component={MiniDrawer} />
          </Switch>
        </Router>  
      </MuiThemeProvider>
    );
  }
}

export default App;
