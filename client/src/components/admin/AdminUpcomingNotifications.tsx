import React, { Component } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import AuthService from '../AuthService'

interface State {
  user_notification_preferences: Preference[],
  upcomingThresholdValue: string
}

class AdminUpcomingNotifications extends Component<any, State> {
  state = {
    user_notification_preferences: [],
    upcomingThresholdValue: '10'
  }
  auth = new AuthService()

  componentWillMount(){
    this.fetchUpcomingNotifications()
  }

  fetchUpcomingNotifications = () => {
    axios.get('/admin/upcoming_notifications',
      {
        params: { minute_threshold: this.state.upcomingThresholdValue },
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      this.setState({
        user_notification_preferences: response.data
      })
    })
  }

  handleThresholdChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      { upcomingThresholdValue: e.currentTarget.value },
      this.fetchUpcomingNotifications
    )

  }

  render() {
    const { user_notification_preferences } = this.state
    return(
      <div id="admin-users">
        <h3 className="title is-3">Upcoming Notifications</h3>
        <div className="field">
          <label className="label">Minute Threshold</label>
          <div className="control">
            <input type="text" value={this.state.upcomingThresholdValue} onChange={this.handleThresholdChange} />
          </div>
          <p className="help">Current Count: { user_notification_preferences.length }</p>
        </div>
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
                <tr key={ notification.id }>
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
