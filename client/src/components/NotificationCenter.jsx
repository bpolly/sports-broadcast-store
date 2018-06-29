import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import '../styles/notification_center.css';

class NotificationCenter extends Component {
  state = {
    currentNotificationPreferences: []
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        Notification Center
      </div>
    )
  }
}

export default NotificationCenter;
