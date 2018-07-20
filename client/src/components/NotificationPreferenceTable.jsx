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

  render() {
    let preferences = this.state.currentNotificationPreferences
    const { favoriteTeamSlugs } = this.props
    console.log(favoriteTeamSlugs)
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
          <NotificationPreferenceNewRow favoriteTeamSlugs={favoriteTeamSlugs} />
        </tbody>
      </table>
    )
  }
}

export default NotificationPreferenceTable;
