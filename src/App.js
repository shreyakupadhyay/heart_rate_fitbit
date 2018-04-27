import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dashboard from './components/dashboard/dashboard';
import MiniDrawer from './components/dashboard/drawer'
import Home from './components/home/home'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
              <Route exact path='/dashboard' component={MiniDrawer} />
              <Route exact path='/home' component={Home} />
          </Switch>
          </BrowserRouter>  
      </MuiThemeProvider>
    );
  }
}

export default App;
