import React, { Component } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import AuthService from '../AuthService'
import moment from 'moment-timezone'

interface State {
  users: User[]
}

class AdminUsers extends Component<any, State> {
  state = {
    users: []
  }
  auth = new AuthService()

  componentWillMount(){
    axios.get('/admin/users',
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      this.setState({
        users: response.data
      })
    })
  }

  render() {
    const { users } = this.state
    return(
      <div id="admin-users">
        <h3 className="title is-3">User List</h3>
        <h4 className="subtitle">Current Count: { users.length }</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user: User) =>
                <tr>
                  <td>{ user.id }</td>
                  <td>{ user.email.address }</td>
                  <td>{ user.phone && user.phone.number }</td>
                  <td>{ moment(user.created_at).format('lll') }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminUsers
