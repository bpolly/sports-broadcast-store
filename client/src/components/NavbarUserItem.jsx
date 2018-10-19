import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavbarLoggedInItem from './NavbarLoggedInItem'
import AuthService from './AuthService'
import '../styles/navbar.scss'

class NavbarUserItem extends Component {
  auth = new AuthService()

  render() {
    if(this.auth.loggedIn()) {
      return(
        <NavbarLoggedInItem />
      )
    }
    else {
      return(
        <React.Fragment>
          <div className="navbar-item">
            <Link to="/login">Login</Link>
          </div>
          <div className="navbar-item">
            <Link to="/signup">Signup</Link>
          </div>
        </React.Fragment>

      )
    }
  }
}

export default NavbarUserItem
