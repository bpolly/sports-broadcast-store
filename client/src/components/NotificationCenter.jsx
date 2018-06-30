import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import FavoriteTeamSelect from './FavoriteTeamSelect';
import AuthService from './AuthService';
import '../styles/notification_center.css';

class NotificationCenter extends Component {
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
    return(
      <div className="container">
        <h1 className="title">Notification Center</h1>
        <h3 className="subtitle">Favorite Teams</h3>
        <FavoriteTeamSelect
          favoriteTeamSlugs={this.props.favoriteTeamSlugs}
          handleFavoriteTeamChange={this.props.handleFavoriteTeamChange} />
        <hr />
        <h3 className="subtitle">Team Alerts</h3>
        <ul>
          { preferences.map(function(preference, index){
                      return <li key={ index }>{preference.user_id}</li>;
                    })}
        </ul>
      </div>
    )
  }
}

export default NotificationCenter;
