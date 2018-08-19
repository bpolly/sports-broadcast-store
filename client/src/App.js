import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/bulma.css'
import './styles/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import NotificationCenter from './components/NotificationCenter'
import cookie from 'react-cookies'
import AuthService from './components/AuthService'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquare  } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faKey, faCheckCircle, faTimesCircle, faCheckSquare, faUserCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faKey, faCheckCircle, faTimesCircle, faSquare, faCheckSquare, faUserCircle)

class App extends Component {
  state = {
    favoriteTeams: []
  }
  auth = new AuthService()

  componentDidMount() {
    axios.get('/user_favorite_teams',
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
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
      this.setState({ favoriteTeams: response.data })
    })
  }

  saveFavoriteTeamsCookie = () => {
    cookie.save('favoriteTeams', this.state.favoriteTeams, { path: '/' })


    // <Route path="/verify/email/:emailId/:code" component={EmailVerification} />

  }

  render() {
    const { favoriteTeams } = this.state

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
                    favoriteTeams={favoriteTeams}
                  />}
            />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route
              exact path="/notifications"
              render={() =>
                  <NotificationCenter
                    handleFavoriteTeamChange={this.handleFavoriteTeamChange}
                    favoriteTeams={favoriteTeams}
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
