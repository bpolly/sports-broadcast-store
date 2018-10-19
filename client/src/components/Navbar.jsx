import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/sportcasts-logo.png'
import '../styles/navbar.scss'
import NavbarUserItem from './NavbarUserItem'
import stripes from '../images/color-stripes.svg'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" aria-label="main navigation">
        <img src={stripes} className="navbar-stripes" alt="stripes" />
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

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-end">
            <NavbarUserItem />
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
