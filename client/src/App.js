import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './styles/bulma.css';
import './styles/font-awesome-4.7.0/css/font-awesome.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NotificationCenter from './components/NotificationCenter';

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login}/>
            <Route path="/notifications" component={NotificationCenter}/>
            <Route render={() => (<div>
                Sorry, this page does not exist.
              </div>)}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
