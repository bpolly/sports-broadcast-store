import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavbarLoggedInItem from './NavbarLoggedInItem'
import AuthService from './AuthService'
import UserContext from '../contexts/User'

function NavbarUserItem() {
  const auth = new AuthService()
  const { loggedIn } = useContext(UserContext)

  if (loggedIn) {
    return <NavbarLoggedInItem />
  } else {
    return (
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

export default NavbarUserItem
