import React, { Component } from 'react'
import { withRouter } from 'react-router'
import AuthService from './AuthService'

class NavbarLoggedInItem extends Component {
  auth = new AuthService()

  handleLogout = () => {
    this.auth.logout()
    this.props.history.push('/')
  }

  render() {
    const userEmail = this.auth.getUserEmail()

    return(
      <div className="navbar-item has-dropdown is-hoverable dropdown-right" id="navbar-email-dropdown">
        <a className="navbar-link" href="#" >
          { userEmail }
        </a>
        <div className="navbar-dropdown is-boxed">
          <a className="navbar-item" href="/notifications">
            Notification Preferences
          </a>
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
