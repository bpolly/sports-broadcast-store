import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import NavbarLoggedInItem from './NavbarLoggedInItem';
var jwtDecode = require('jwt-decode');

class NavbarUserItem extends Component {

  getUserToken = () => {
    let authToken = cookie.load('user-auth-token')
    if(!!authToken){
      return jwtDecode(authToken)
    }
    else {
      return null
    }
  }

  render() {
    const userToken = this.getUserToken()
    if(!!userToken) {
      return(
        <NavbarLoggedInItem userToken={userToken} />
      )
    }
    else {
      return(
        <Link to="/login" className="navbar-item">Login</Link>
      )
    }
  }
}

export default NavbarUserItem;
