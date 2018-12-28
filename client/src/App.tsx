/// <reference path="./types/sportcast_types.d.ts" />
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/bulma.css'
import './styles/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.scss'
import Dashboard from './components/Dashboard'
import EmailVerification from './components/EmailVerification'
import Login from './components/Login'
import Navbar from './components/Navbar'
import NotificationCenter from './components/NotificationCenter'
import Signup from './components/Signup'
import AuthService from './components/AuthService'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminUsers from './components/admin/AdminUsers'
import AdminUpcomingNotifications from './components/admin/AdminUpcomingNotifications'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare  } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope, faLock, faCheckCircle, faTimesCircle, faCheckSquare, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faLock, faCheckCircle, faTimesCircle, faSquare, faCheckSquare, faUserCircle, faSpinner)

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

  render() {
    const { favoriteTeams } = this.state

    return (
      <BrowserRouter >
        <div>
          <Navbar />
          <Switch>
            <Route
              exact path="/"
              render={() =>
                  <Dashboard
                    handleFavoriteTeamChange={this.handleFavoriteTeamChange}
                    favoriteTeams={favoriteTeams}
                  />}
            />
            <Route path="/verify" component={EmailVerification} />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route
              exact path="/notifications"
              render={() =>
                !this.auth.isLoggedIn() ? (
                  <Redirect to="/login" />
                ) : (
                    <NotificationCenter
                      handleFavoriteTeamChange={this.handleFavoriteTeamChange}
                      favoriteTeams={favoriteTeams}
                    />
                )
              }
            />
            <Route
              exact
              path="/admin"
              render={() =>
                !this.auth.isAdmin() ? (
                  <Redirect to="/login" />
                ) : (
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                )
              }
            />
            <Route
              path="/admin/users"
              render={() =>
                !this.auth.isAdmin() ? (
                  <Redirect to="/login" />
                ) : (
                  <AdminLayout>
                    <AdminUsers />
                  </AdminLayout>
                )
              }
            />
            <Route
              path="/admin/upcoming_notifications"
              render={() =>
                !this.auth.isAdmin() ? (
                  <Redirect to="/login" />
                ) : (
                  <AdminLayout>
                    <AdminUpcomingNotifications />
                  </AdminLayout>
                )
              }
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
