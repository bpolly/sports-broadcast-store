import React, { Component } from 'react';
import FavoriteTeamSelect from './FavoriteTeamSelect';
import NotificationPreferenceTable from './NotificationPreferenceTable';
import '../styles/notification_center.css';

class NotificationCenter extends Component {
  render() {
    return(
      <div className="container">
        <h1 className="title">Notification Center</h1>
        <h3 className="subtitle">Favorite Teams</h3>
        <FavoriteTeamSelect
          favoriteTeams={this.props.favoriteTeams}
          handleFavoriteTeamChange={this.props.handleFavoriteTeamChange} />
        <hr />
        <h3 className="subtitle">Team Alerts</h3>
        <NotificationPreferenceTable           favoriteTeams={this.props.favoriteTeams} />
      </div>
    )
  }
}

export default NotificationCenter;
