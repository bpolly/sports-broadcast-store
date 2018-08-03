import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/bulma.css'
import './styles/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import NotificationCenter from './components/NotificationCenter'
import cookie from 'react-cookies'
import AuthService from './components/AuthService'
import axios from 'axios'

class App extends Component {
  state = {
    favoriteTeams: []
  }
  auth = new AuthService()

  componentDidMount() {
    axios.get('/user_favorite_teams',
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      console.log(response.data)
      this.setState({ favoriteTeams: response.data })
    })
  }

  handleFavoriteTeamChange = (teams) => {
    axios.post('/update_favorite_teams',
      { teams: teams.map((team) => team['value']) },
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      console.log(response.data)
      this.setState({ favoriteTeams: response.data })
    })
  }

  saveFavoriteTeamsCookie = () => {
    cookie.save('favoriteTeams', this.state.favoriteTeams, { path: '/' })
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
                    favoriteTeams={this.state.favoriteTeams}
                  />}
            />
            <Route path="/login" component={Login}/>
            <Route
              exact path="/notifications"
              render={() =>
                  <NotificationCenter
                    handleFavoriteTeamChange={this.handleFavoriteTeamChange}
                    favoriteTeams={this.state.favoriteTeams}
                  />}
            />
            <Route render={() => (<div>
                Sorry, this page does not exist.
              </div>)}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
