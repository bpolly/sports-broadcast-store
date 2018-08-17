import React, { Component } from 'react'
import Select from 'react-select'
import EmailCheckbox from './EmailCheckbox'
import { generateTeamOptions, generatePhoneNumberOptions } from '../utilities.js'
import AuthService from './AuthService'
import '../styles/notification_preference_row.css'

class NotificationPreferenceNewRow extends Component {
  state = {
    editing: false,
    saving: false,
    // favoriteTeams: this.props.favoriteTeams,
    selectedTeamSlug: '',
    phoneID: '',
    callbackUrl: '',
    useEmail: false,
  }
  auth = new AuthService()

  handleEditClick = () => {
    this.setState({ editing: true })
  }

  handleSaveClick = () => {
    if(!this.validForm()){
      console.log('Save failed')
      return null;
    }
    this.setState({ saving: true })
    setTimeout(function() {}, 500)
    let saveParams = {
      selectedTeamSlug: this.state.selectedTeamSlug,
      user_phone_id: this.state.phoneID,
      callbackUrl: this.state.callbackUrl,
      use_email: this.state.useEmail
    }
    this.props.saveNewNotification(saveParams)
      .then(response => {
        this.setState({
          editing: false,
          saving: false,
          selectedTeamSlug: '',
          user_phone_id: '',
          callbackUrl: '',
          useEmail: false
        })
      })
    .catch(error =>{
      this.setState({ editing: true, saving: false })
    })
  }

  handleDiscardChangesClick = () => {
    this.setState({
      team_id: '',
      phoneID: '',
      callbackUrl: '',
      useEmail: false,
      editing: false
    })
  }

  handleNewNotificationClick = () => {
    this.setState({
      editing: true
    })
  }

  handleChange = (e) => {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleTeamChange = (e) => {
    if(e && e.value) this.setState({ selectedTeamSlug: e.value })
  }

  validForm = () => {
    return !!(this.state.selectedTeamSlug &&
        (
          !!this.state.phoneID ||
          !!this.state.callbackUrl ||
          !!this.state.useEmail
        )
      )
  }

  handlePhoneChange = (e) => {
    if(e && e.value) this.setState({ phoneID: e.value })
  }

  handleEmailCheckboxClick = () => {
    if(!this.state.editing) return
    this.setState( (state) => ({ useEmail : !state.useEmail }) )
  }

  actionButton = () => {
    if(this.state.editing){
      return (
        <div>
          <button
            className={`button is-success ${this.state.saving ? 'is-loading' : ''}`}
            onClick={this.handleSaveClick}
            disabled={!this.validForm()}>Save</button>
          <button className="button" onClick={this.handleDiscardChangesClick}>Cancel</button>
        </div>
      )
    }
    else {
      return (
        <button className="button" onClick={this.handleEditClick}>Edit</button>
      )
    }
  }

  formRow = () => {
    const { selectedTeamSlug, callbackUrl, useEmail, phoneID } = this.state
    const { favoriteTeams, phoneNumbers } = this.props

    return(
      <tr>
        <td>
          <Select
            className="favorite-team-select-single team-input"
            name="favorite-team-select"
            value={ selectedTeamSlug }
            onChange={ this.handleTeamChange }
            options={ generateTeamOptions(favoriteTeams) }
            closeOnSelect={true}
            selectedValue={selectedTeamSlug}
          />
        </td>
        <td>
          <Select
            className="favorite-team-select-single team-input"
            name="phoneID"
            options={ generatePhoneNumberOptions(phoneNumbers) }
            closeOnSelect={ true }
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
            onChange={ this.handleChange }
            name="callbackUrl"
          />
        </td>
        <td>
          <EmailCheckbox
            handleEmailCheckboxClick={this.handleEmailCheckboxClick}
            emailAddress={this.auth.getUserEmail()}
            is_checked={useEmail}
            is_disabled={false}/>
        </td>
        <td>
          {this.actionButton()}
        </td>
      </tr>
    )
  }

  buttonRow = () => {
    return(
      <tr>
        <td colSpan="5" style={{"textAlign": 'center'}}>
          <button className="button" onClick={this.handleNewNotificationClick}>Add New</button>
        </td>
      </tr>
    )
  }

  render(){
    const { editing } = this.state
    if(editing) {
      return this.formRow()
    }
    else {
      return this.buttonRow()
    }
  }

}

export default NotificationPreferenceNewRow
