import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import AuthService from './AuthService'
import UserContext from '../contexts/User'

// class NavbarLoggedInItem extends Component<RouteComponentProps<any>> {
function NavbarLoggedInItem(props: RouteComponentProps<any>) {
  const auth = new AuthService()
  const { setLoggedIn } = useContext(UserContext)

  const handleLogout = () => {
    auth.logout()
    setLoggedIn(false)
    props.history.push('/')
  }

  const notificationPrefsLink = () => {
    return (
      <NavLink className="navbar-item" to="/notifications">
        Notification Preferences
      </NavLink>
    )
  }

  const adminLink = () => {
    if (!auth.isAdmin()) {
      return null
    }

    return (
      <NavLink className="navbar-item" to="/admin">
        Admin
      </NavLink>
    )
  }

  const userEmail = auth.getUserEmail()

  return (
    <div
      className="navbar-item has-dropdown is-hoverable dropdown-right"
      id="navbar-email-dropdown"
    >
      <a className="navbar-link" href="#">
        {userEmail}
      </a>
      <div className="navbar-dropdown is-boxed is-right">
        {notificationPrefsLink()}
        {adminLink()}

        <hr className="navbar-divider" />
        <a className="navbar-item" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  )
}

export default withRouter(NavbarLoggedInItem)
