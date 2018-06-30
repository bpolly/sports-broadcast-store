import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './styles/bulma.css';
import './styles/font-awesome-4.7.0/css/font-awesome.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NotificationCenter from './components/NotificationCenter';
import cookie from 'react-cookies';

class App extends Component {
  state = {
    favoriteTeamSlugs: []
  }

  componentDidMount() {
    this.setState({
      favoriteTeamSlugs: cookie.load('favoriteTeamSlugs') || []
    });
  }


  handleFavoriteTeamChange = (teams) => {
    this.setState(
      {
        favoriteTeamSlugs: teams.map((team) => team['value'])
      }, this.saveFavoriteTeamSlugsCookie);
  }

  saveFavoriteTeamSlugsCookie = () => {
    cookie.save('favoriteTeamSlugs', this.state.favoriteTeamSlugs, { path: '/' })
  }

  render() {
    return (
      <BrowserRouter >
        <div>
          <Navbar/>
          <Switch>
            <Route
              exact path="/"
              render={() =>
                  <Dashboard
                    handleFavoriteTeamChange={this.handleFavoriteTeamChange}
                    favoriteTeamSlugs={this.state.favoriteTeamSlugs}
                  />}
            />
            <Route path="/login" component={Login}/>
            <Route
              exact path="/notifications"
              render={() =>
                  <NotificationCenter
                    handleFavoriteTeamChange={this.handleFavoriteTeamChange}
                    favoriteTeamSlugs={this.state.favoriteTeamSlugs}
                  />}
            />
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
