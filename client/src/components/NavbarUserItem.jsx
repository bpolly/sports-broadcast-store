import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavbarLoggedInItem from './NavbarLoggedInItem'
import AuthService from './AuthService'

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
        <Link to="/login" className="navbar-item">Login</Link>
      )
    }
  }
}

export default NavbarUserItem
