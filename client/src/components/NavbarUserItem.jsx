import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import NavbarLoggedInItem from './NavbarLoggedInItem'
import AuthService from './AuthService'
var jwtDecode = require('jwt-decode')

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
