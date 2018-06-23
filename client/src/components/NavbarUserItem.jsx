import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './Login';
import logo from '../images/sportcasts-logo.png';
import '../styles/dashboard.css';
import cookie from 'react-cookies';
var jwtDecode = require('jwt-decode');

class Navbar extends Component {
  getUserEmail = () => {
    let authToken = cookie.load('user-auth-token')
    if(!!authToken){
      return jwtDecode(authToken).user_email
    }
    else {
      return null
    }
  }

  render() {
    const userEmail = this.getUserEmail();
    return (
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img id="logo" src={logo} alt="Logo" />
          </Link>

          <button className="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="https://bulma.io/">
              <Link to="/login" className="navbar-item">Login</Link>
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item" href="https://bulma.io/">
              Test { userEmail }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
