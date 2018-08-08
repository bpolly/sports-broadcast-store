import React, { Component } from 'react';
import axios from 'axios';
import NotificationPreferenceRow from './NotificationPreferenceRow';
import NotificationPreferenceNewRow from './NotificationPreferenceNewRow';
import PhoneNumberForm from './PhoneNumberForm';
import AuthService from './AuthService';
import '../styles/notification_center.css';

class NotificationPreferenceTable extends Component {
  state = {
    currentNotificationPreferences: [],
    showPhoneForm: false
  }
  auth = new AuthService()

  componentDidMount() {
    axios.get('/user_notification_preferences',
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      console.log(response)
      this.setState({ currentNotificationPreferences: response.data })
    })
  }

  saveNewNotification = (params) => {
    return axios.post('/user_notification_preferences',
      {
        team_slug: params['selectedTeamSlug'],
        phone: params['phone'],
        callback_url: params['callbackUrl'],
        email: params['email']
      },
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      let newPreference = response.data
      console.log(newPreference)
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
      this.setState({currentNotificationPreferences: filteredArray});
    })
    .catch(error =>{
      // do something with error
    })
  }

  onFocus = () => {
    this.setState({ showPhoneForm: true })
  }

  closePhoneFormModal = () => {
    console.log('hi there')
    this.setState({ showPhoneForm: false })
  }

  render() {
    let preferences = this.state.currentNotificationPreferences
    const { favoriteTeams } = this.props
    return(
      <div>
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
                                  preference={preference}
                                  key={preference.id}
                                  deleteNotification={this.deleteNotification} />;
                      }, this)}
            <NotificationPreferenceNewRow
              favoriteTeams={favoriteTeams}
              saveNewNotification={this.saveNewNotification}
              onFocus={this.onFocus}
            />
          </tbody>
        </table>
        <PhoneNumberForm
          hidden={!this.state.showPhoneForm}
          closePhoneFormModal={this.closePhoneFormModal} />
      </div>
    )
  }
}

export default NotificationPreferenceTable;
