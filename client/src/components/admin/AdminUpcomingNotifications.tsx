import React, { Component } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import AuthService from '../AuthService'

interface State {
  user_notification_preferences: Preference[]
}

class AdminUpcomingNotifications extends Component<any, State> {
  state = {
    user_notification_preferences: []
  }
  auth = new AuthService()

  componentWillMount(){
    axios.get('/admin/upcoming_notifications',
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      this.setState({
        user_notification_preferences: response.data
      })
    })
  }


  render() {
    const { user_notification_preferences } = this.state
    return(
      <div id="admin-users">
        <h3 className="title is-3">Upcoming Notifications</h3>
        <h4 className="subtitle">Current Count: { user_notification_preferences.length }</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email?</th>
              <th>Phone?</th>
              <th>User Type</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {
              user_notification_preferences.map((notification: Preference) =>
                <tr>
                  <td>{ notification.id }</td>
                  <td>{ notification.email }</td>
                  <td>{ notification.phone }</td>
                  <td>{ notification.team && notification.team.name }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminUpcomingNotifications
