import React, {Component} from 'react'
import '../../styles/admin/sidebar.scss'
import { NavLink } from 'react-router-dom'

class AdminSidebar extends Component {
  render() {
    return (
      <aside className="menu">
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li>
            <NavLink exact to="/admin" activeClassName="is-active">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeClassName="is-active">Users</NavLink>
          </li>
        </ul>
        <p className="menu-label">
          Notifications
        </p>
        <ul className="menu-list">
          <li>
            <NavLink to="/admin/payments" activeClassName="is-active">User Notifications</NavLink>
          </li>
          <li>
            <NavLink to="/admin/transfers" activeClassName="is-active">Outgoing Notifications</NavLink>
          </li>
          <li>
            <NavLink to="/admin/balance" activeClassName="is-active">Balance</NavLink>
          </li>
        </ul>
      </aside>
    )
  }
}

export default AdminSidebar;
