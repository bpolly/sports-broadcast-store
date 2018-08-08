import React, { Component } from 'react';
import FavoriteTeamSelect from './FavoriteTeamSelect';
import NotificationPreferenceTable from './NotificationPreferenceTable';
import PhoneNumberForm from './PhoneNumberForm'
import PhoneNumberListing from './PhoneNumberListing'
import axios from 'axios'
import AuthService from './AuthService'
import '../styles/notification_center.css';

class NotificationCenter extends Component {
  state = {
    phoneNumbers: []
  }
  auth = new AuthService()

  componentDidMount(){
    this.fetchPhoneNumbers()
  }

  fetchPhoneNumbers = () => {
    let user_id = this.auth.getUserId()
    axios.get(`/users/${user_id}/phones/`,
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      console.log(response)
      this.setState({ phoneNumbers: response.data })
    })
  }

  render() {
    const { phoneNumbers } = this.state

    return(
      <div className="container">
        <h1 className="title">Notification Center</h1>
        <h3 className="subtitle">Team Alerts</h3>
        <NotificationPreferenceTable           favoriteTeams={this.props.favoriteTeams} />
        <hr />
          <div className="columns">
            <div className="column is-one-half">
              <h3 className="subtitle">Favorite Teams</h3>
              <FavoriteTeamSelect
                favoriteTeams={this.props.favoriteTeams}
                handleFavoriteTeamChange={this.props.handleFavoriteTeamChange} />
            </div>
            <div className="column">
              <h3 className="subtitle">Verified Phone Numbers</h3>
              { phoneNumbers.map(function(phoneNumber, index){
                          return (
                            <PhoneNumberListing
                              phoneNumber={phoneNumber}
                            />
                          )
                        }, this)}
              <button className="button">Add New</button>
            </div>
          </div>
      </div>
    )
  }
}

export default NotificationCenter;
