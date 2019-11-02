import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavbarLoggedInItem from './NavbarLoggedInItem'
import AuthService from './AuthService'

const NavbarUserItem: React.FC = () => {
  let auth = new AuthService()

  const unknownUserOptions = (): JSX.Element  => {
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

  if(auth.isLoggedIn()) {
    return(
      <NavbarLoggedInItem />
    )
  } else {
    return (unknownUserOptions())
  }
}

export default NavbarUserItem
