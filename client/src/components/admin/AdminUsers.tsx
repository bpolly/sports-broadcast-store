import React, { Component, useState, useEffect } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import AuthService from '../AuthService'
import moment from 'moment-timezone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface State {
  users: User[]
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const auth = new AuthService()

  useEffect(() => {
    axios.get('/admin/users',
      { headers: { Authorization: auth.getToken() } }
    ).then(response => {
      setUsers(response.data)
      })
    }, [])

  const verificationIcon = (user: User, type: string) => {
    if (user[type] == null) return ''
    else if (user[type].verified_at == null) return ''
    else return (
      <FontAwesomeIcon
        icon="check-circle"
        color="#6DB65B"
        size="sm"
        className="verification-icon"
      />
    )
  }

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
            <th>User Type</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user: User) =>
              <tr key={ user.id }>
                <td>{ user.id }</td>
                <td>
                  { user.email.address }
                  { verificationIcon(user, 'email') }
                </td>
                <td>
                  { user.phone && user.phone.number }
                  { verificationIcon(user, 'phone') }
                </td>
                <td>{ user.user_type }</td>
                <td>{ moment(user.created_at).format('lll') }</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers
