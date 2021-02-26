import React, { Component } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import AuthService from '../AuthService'
import moment from 'moment-timezone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface State {
  users: User[]
}

class AdminUsers extends Component<any, State> {
  state = {
    users: [],
  }
  auth = new AuthService()

  componentWillMount() {
    axios
      .get('/admin/users', { headers: { Authorization: this.auth.getToken() } })
      .then((response) => {
        this.setState({
          users: response.data,
        })
      })
  }

  verificationIcon = (user: User, type: string) => {
    if (user[type] == null) return ''
    else if (user[type].verified_at == null) return ''
    else
      return (
        <FontAwesomeIcon
          icon="check-circle"
          color="#6DB65B"
          size="sm"
          className="verification-icon"
        />
      )
  }

  render() {
    const { users } = this.state
    return (
      <div id="admin-users">
        <h3 className="title is-3">User List</h3>
        <h4 className="subtitle">Current Count: {users.length}</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.email.address}
                  {this.verificationIcon(user, 'email')}
                </td>
                <td>
                  {user.phone && user.phone.number}
                  {this.verificationIcon(user, 'phone')}
                </td>
                <td>{user.user_type}</td>
                <td>{moment(user.created_at).format('lll')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminUsers
