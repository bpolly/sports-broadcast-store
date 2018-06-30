import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import FavoriteTeamSelect from './FavoriteTeamSelect';
import NotificationPreferenceTable from './NotificationPreferenceTable';
import AuthService from './AuthService';
import '../styles/notification_center.css';

class NotificationCenter extends Component {
  render() {
    return(
      <div className="container">
        <h1 className="title">Notification Center</h1>
        <h3 className="subtitle">Favorite Teams</h3>
        <FavoriteTeamSelect
          favoriteTeamSlugs={this.props.favoriteTeamSlugs}
          handleFavoriteTeamChange={this.props.handleFavoriteTeamChange} />
        <hr />
        <h3 className="subtitle">Team Alerts</h3>
        <NotificationPreferenceTable />
      </div>
    )
  }
}

export default NotificationCenter;
