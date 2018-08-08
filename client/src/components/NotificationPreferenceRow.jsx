import React, { Component } from 'react'
import '../styles/notification_preference_row.css'
import axios from 'axios'
import AuthService from './AuthService'
import Select from 'react-select'
import { generateTeamOptions, generatePhoneNumberOptions } from '../utilities.js'

class NotificationPreferenceRow extends Component {
  state = {
    selectedTeamSlug: this.props.preference.team.slug || '',
    phoneID: (this.props.preference.user_phone && this.props.preference.user_phone.id) || '',
    callbackUrl: this.props.preference.callback_url || '',
    email: this.props.preference.email || '',
    editing: false,
    saving: false
  }
  auth = new AuthService()

  handleEditClick = () => {
    this.setState({ editing: true })
  }

  handleSaveClick = () => {
    this.setState({ saving: true })
    setTimeout(function() {}, 500)
    axios.patch('/user_notification_preferences/' + this.props.preference.id,
      {
        team_slug: this.state.selectedTeamSlug,
        user_phone_id: this.state.phoneID,
        callback_url: this.state.callbackUrl,
        email: this.state.email
      },
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      this.setState({ editing: false, saving: false })
    })
    .catch(error =>{
      this.setState({ editing: true, saving: false })
    })
  }

  handleDiscardChangesClick = () => {
    this.setState({
      selectedTeamSlug: this.props.preference.team.slug || '',
      phone: this.props.preference.phone || '',
      callbackUrl: this.props.preference.callbackUrl || '',
      email: this.props.preference.email || '',
      editing: false
    })
  }

  handleDeleteClick = () => {
    this.props.deleteNotification(this.props.preference)
  }

  handleChange = (e) => {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleTeamChange = (e) => {
    if(e && e.value) this.setState({ selectedTeamSlug: e.value })
  }

  handlePhoneChange = (e) => {
    if(e && e.value) this.setState({ phoneID: e.value })
  }

  actionButton = () => {
    if(this.state.editing){
      return (
        <div>
          <button className={`button is-success ${this.state.saving ? 'is-loading' : ''}`} onClick={this.handleSaveClick}>Save</button>
          <button className="button" onClick={this.handleDiscardChangesClick}>Cancel</button>
        </div>
      )
    }
    else {
      return (
        <div className="field is-grouped">
          <p className="control">
            <button className="button" onClick={this.handleEditClick}>Edit</button>
            <button className="button is-danger is-link" onClick={this.handleDeleteClick}>Delete</button>
          </p>
        </div>
      )
    }
  }

  render(){
    const { favoriteTeams, phoneNumbers } = this.props
    const { editing, selectedTeamSlug, phoneID, callbackUrl, email } = this.state

    return(
      <tr>
        <td>
          <Select
            className="favorite-team-select-single team-input select"
            name="favorite-team-select"
            value={ selectedTeamSlug }
            onChange={ this.handleTeamChange }
            options={ generateTeamOptions(favoriteTeams) }
            closeOnSelect={true}
            disabled={ !editing }
            selectedValue={selectedTeamSlug}
          />
        </td>
        <td>
          <Select
            className="favorite-team-select-single team-input"
            name="phoneID"
            options={ generatePhoneNumberOptions(phoneNumbers) }
            closeOnSelect={ true }
            disabled={ !editing }
            selectedValue={ phoneID }
            value={ phoneID }
            onChange={ this.handlePhoneChange }
          />
        </td>
        <td>
          <input
            className="input callback-url-input"
            type="text"
            value={ callbackUrl }
            disabled={ !editing }
            onChange={ this.handleChange }
            name="callbackUrl"
          />
        </td>
        <td>
          <input
            className="input email-input"
            type="text"
            value={ email }
            disabled={ !editing }
            onChange={ this.handleChange }
            name="email"
          />
        </td>
        <td>
          {this.actionButton()}
        </td>
      </tr>
    )
  }

}

export default NotificationPreferenceRow
