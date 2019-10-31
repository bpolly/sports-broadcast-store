/// <reference path="./types/global.d.ts" />
/// <reference path="./types/sportcast_types.d.ts" />
import { RouteProps } from "react-router";
import React from 'react'
import { Component } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/bulma.css'
import './styles/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.scss'
import Dashboard from './components/Dashboard'
import EmailVerification from './components/EmailVerification'
import EmailUnsubscribe from './components/EmailUnsubscribe'
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

const PrivateRoute = ({ component: CustomComponent, path, ...rest } : any) => (
  <Route
    path={path}
    render={props =>
      new AuthService().isLoggedIn() ? (
        <CustomComponent {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

const AdminRoute = ({ component: CustomComponent, ...rest } : any) => (
  <Route
    {...rest}
    render={props =>
      new AuthService().isAdmin() ? (
        <AdminLayout>
          <Component {...props} />
        </AdminLayout>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);


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

  handleFavoriteTeamChange = (teams: TeamSelectOption[]) => {
    console.log(teams)
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
            <Route path="/unsubscribe" component={EmailUnsubscribe} />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <PrivateRoute
              path="/notifications"
              component={NotificationCenter}
              handleFavoriteTeamChange={this.handleFavoriteTeamChange}
              favoriteTeams={favoriteTeams}
              />
            />
            <AdminRoute
              exact
              path="/admin"
              component={AdminDashboard}
            />
            <AdminRoute
              exact
              path="/admin/users"
              component={AdminUsers}
            />
            <AdminRoute
              exact
              path="/admin/upcoming_notifications"
              component={AdminUpcomingNotifications}
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
