import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import AuthService from './AuthService'

class NavbarLoggedInItem extends Component<RouteComponentProps<any>> {
  auth = new AuthService()

  handleLogout = () => {
    this.auth.logout()
    this.props.history.push('/')
  }

  render() {
    const userEmail = this.auth.getUserEmail()
    const emailIsVerified = this.auth.getUserEmailVerificationStatus()

    return(
      <div className="navbar-item has-dropdown is-hoverable dropdown-right" id="navbar-email-dropdown">
        <a className="navbar-link" href="#" >
          { userEmail }
        </a>
        <div className="navbar-dropdown is-boxed">
          <NavLink className="navbar-item" to="/notifications">
            Notification Preferences
          </NavLink>
          <NavLink className="navbar-item" to="/admin">
            Admin
          </NavLink>
          <hr className="navbar-divider" />
          <a className="navbar-item" onClick={this.handleLogout}>
            Logout
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(NavbarLoggedInItem)
