import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import FavoriteTeamSelect from './FavoriteTeamSelect';
import NotificationPreferenceRow from './NotificationPreferenceRow';
import NotificationPreferenceNewRow from './NotificationPreferenceNewRow';
import AuthService from './AuthService';
import '../styles/notification_center.css';

class NotificationPreferenceTable extends Component {
  state = {
    currentNotificationPreferences: []
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

  render() {
    let preferences = this.state.currentNotificationPreferences
    const { favoriteTeams } = this.props
    return(
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Team</th>
            <th>Phone</th>
            <th>Callback URL</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          { preferences.map(function(preference, index){
                      return <NotificationPreferenceRow
                                preference={preference}
                                key={preference.id} />;
                    })}
          <NotificationPreferenceNewRow
            favoriteTeams={favoriteTeams}
            saveNewNotification={this.saveNewNotification} />
        </tbody>
      </table>
    )
  }
}

export default NotificationPreferenceTable;
