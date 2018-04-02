import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/auth' component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
