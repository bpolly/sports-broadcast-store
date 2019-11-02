import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/sportcasts-logo.png'
import '../styles/navbar.scss'
import NavbarUserItem from './NavbarUserItem'
import stripes from '../images/color-stripes.svg'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar" aria-label="main navigation">
      <div className="navbar-brand">
        <img src={stripes} className="navbar-stripes" alt="stripes" />
        <Link to="/" className="navbar-item">
          <img id="logo" src={logo} alt="Logo" />
        </Link>

        <button className="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <NavbarUserItem />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
