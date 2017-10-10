import React, { Component } from 'react';
import logo from '../images/sportcasts-logo.png';
import '../styles/dashboard.css';
import LeagueColumn from './LeagueColumn';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="http://bulma.io">
            <img id="logo" src={logo} alt="Logo" />
          </a>

          <button className="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
