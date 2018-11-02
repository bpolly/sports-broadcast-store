import React, { Component } from 'react'
import FavoriteTeamSelect from './FavoriteTeamSelect'
import NotificationPreferenceTable from './NotificationPreferenceTable'
import PhoneNumberForm from './PhoneNumberForm'
import PhoneNumberListing from './PhoneNumberListing'
import axios from 'axios'
import AuthService from './AuthService'
import '../styles/notification_center.scss'

class NotificationCenter extends Component {
  state = {
    phoneNumber: null,
    emailObjects: [],
    showPhoneForm: false
  }
  auth = new AuthService()

  componentDidMount(){
    this.fetchPhoneNumber()
    this.fetchEmails()
  }

  fetchPhoneNumber = () => {
    let user_id = this.auth.getUserId()
    axios.get(`/users/${user_id}/phone`,
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      this.setState({ phoneNumber: response.data })
    })
  }

  fetchEmails = () => {
    let user_id = this.auth.getUserId()
    axios.get(`/users/${user_id}/email`,
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      this.setState({ emailObjects: response.data })
    })
  }

  showPhoneFormModal = () => {
    this.setState({ showPhoneForm: true })
  }

  closePhoneFormModal = () => {
    this.setState({ showPhoneForm: false })
  }

  deletePhoneNumber = () => {
    let user_id = this.auth.getUserId()
    return axios.delete(`/users/${user_id}/phone/`,
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      this.setState({phoneNumber: null})
    })
    .catch(error =>{
      // do something with error
    })
  }

  phoneNumberList = () => {
    const { phoneNumber } = this.state
    if(phoneNumber) {
      return(
        <PhoneNumberListing
          key={phoneNumber.id}
          phoneNumber={phoneNumber}
          deletePhoneNumber={this.deletePhoneNumber}
          fetchPhoneNumber={this.fetchPhoneNumber}
        />
      )
    }
    else {
      return(<div>You haven't added any phone numbers yet, add one above!</div>)
    }
  }

  render() {
    const { phoneNumber } = this.state
    const { favoriteTeams } = this.props

    return(
      <div className="container">
        <h1 className="title">Notification Center</h1>
        <h3 className="subtitle">Team Alerts</h3>
        <NotificationPreferenceTable
          favoriteTeams={favoriteTeams}
          phoneNumber={phoneNumber}
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
              <div className="phone-list">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <h3 className="subtitle">Phone Numbers</h3>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <button
                        className={`button is-small is-outlined is-primary ${ phoneNumber == null ? ''  : 'is-invisible'}`}
                        onClick={this.showPhoneFormModal}>Add New</button>
                    </div>
                  </div>
                </div>

                { this.phoneNumberList() }

                <PhoneNumberForm
                  hidden={!this.state.showPhoneForm}
                  closePhoneFormModal={this.closePhoneFormModal}
                  fetchPhoneNumber={this.fetchPhoneNumber}
                />
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default NotificationCenter
