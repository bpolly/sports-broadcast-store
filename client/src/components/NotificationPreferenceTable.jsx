import React, { Component } from 'react'
import axios from 'axios'
import NotificationPreferenceRow from './NotificationPreferenceRow'
import NotificationPreferenceNewRow from './NotificationPreferenceNewRow'
import AuthService from './AuthService'
import '../styles/notification_center.scss'

class NotificationPreferenceTable extends Component {
  state = {
    currentNotificationPreferences: [],
    userphoneNumber: []
  }
  auth = new AuthService()

  componentDidMount() {
    this.fetchNotificationPreferences()
  }

  fetchNotificationPreferences = () => {
    axios.get('/user_notification_preferences',
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      this.setState({ currentNotificationPreferences: response.data })
    })
  }

  saveNewNotification = (params) => {
    return axios.post('/user_notification_preferences', params,
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      let newPreference = response.data
      newPreference['key'] = newPreference['id']
      this.setState({ currentNotificationPreferences: [...this.state.currentNotificationPreferences, newPreference] })
    })
    .catch(error =>{
      // do something with error
    })
  }

  deleteNotification = (preference) => {
    return axios.delete('/user_notification_preferences/' + preference.id,
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      let filteredArray = this.state.currentNotificationPreferences.filter(item => item !== preference)
      this.setState({currentNotificationPreferences: filteredArray})
    })
    .catch(error =>{
      // do something with error
    })
  }

  render() {
    let preferences = this.state.currentNotificationPreferences
    const { favoriteTeams, phoneNumber } = this.props
    return(
      <div className="">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th className="team-input">Team</th>
              <th className="phone-input">Phone</th>
              <th className="callback-url-input">Callback URL</th>
              <th className="email-input">Email</th>
            </tr>
          </thead>
          <tbody>
            { preferences.map(function(preference, index){
                        return <NotificationPreferenceRow
                                  favoriteTeams={favoriteTeams}
                                  phoneNumber={phoneNumber}
                                  preference={preference}
                                  key={preference.id}
                                  deleteNotification={this.deleteNotification} />
                      }, this)}
            <NotificationPreferenceNewRow
              favoriteTeams={favoriteTeams}
              phoneNumber={phoneNumber}
              saveNewNotification={this.saveNewNotification}
              onFocus={this.onFocus}
            />
          </tbody>
        </table>
      </div>
    )
  }
}

export default NotificationPreferenceTable
