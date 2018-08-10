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
    phoneNumbers: [],
    showPhoneForm: false
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

  showPhoneFormModal = () => {
    this.setState({ showPhoneForm: true })
  }

  closePhoneFormModal = () => {
    this.setState({ showPhoneForm: false })
  }

  deletePhoneNumber = (phoneNumber) => {
    let user_id = this.auth.getUserId()
    return axios.delete(`/users/${user_id}/phones/` + phoneNumber.id,
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      let filteredArray = this.state.phoneNumbers.filter(item => item !== phoneNumber)
      this.setState({phoneNumbers: filteredArray});
    })
    .catch(error =>{
      // do something with error
    })
  }

  render() {
    const { phoneNumbers } = this.state
    const { favoriteTeams } = this.props
    let phoneNumberCount = phoneNumbers.length

    return(
      <div className="container">
        <h1 className="title">Notification Center</h1>
        <h3 className="subtitle">Team Alerts</h3>
        <NotificationPreferenceTable
          favoriteTeams={favoriteTeams}
          phoneNumbers={phoneNumbers}
        />
        <hr />
          <div className="columns">
            <div className="column is-one-half">
              <h3 className="subtitle">Favorite Teams</h3>
              <FavoriteTeamSelect
                favoriteTeams={this.props.favoriteTeams}
                handleFavoriteTeamChange={this.props.handleFavoriteTeamChange} />
            </div>
            <div className="column">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <h3 className="subtitle">Phone Numbers</h3>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button
                      className={`button is-small is-outlined is-primary ${ phoneNumberCount >= 3 ? 'is-invisible': ''}`}
                      onClick={this.showPhoneFormModal}>Add New</button>
                  </div>
                </div>
              </div>


              { phoneNumbers.map(function(phoneNumber, index){
                          return (
                            <PhoneNumberListing
                              key={phoneNumber.id}
                              phoneNumber={phoneNumber}
                              deletePhoneNumber={this.deletePhoneNumber}
                              fetchPhoneNumbers={this.fetchPhoneNumbers}
                            />
                          )
                        }, this)}
              <PhoneNumberForm
                hidden={!this.state.showPhoneForm}
                closePhoneFormModal={this.closePhoneFormModal}
                fetchPhoneNumbers={this.fetchPhoneNumbers}
              />
            </div>
          </div>
      </div>
    )
  }
}

export default NotificationCenter;
