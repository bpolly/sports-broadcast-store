import React, { Component } from 'react'
import '../styles/notification_preference_row.scss'
import axios from 'axios'
import AuthService from './AuthService'
import Select from 'react-select'
import Checkbox from './Checkbox'
import { generateTeamOptions } from '../utilities.js'

class NotificationPreferenceRow extends Component {
  state = {
    selectedTeamSlug: this.props.preference.team.slug || '',
    callbackUrl: this.props.preference.callback_url || '',
    useEmail: !!this.props.preference.email || false,
    usePhone: !!this.props.preference.phoneNumber || false,
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
        use_email: this.state.useEmail,
        use_phone: this.state.usePhone
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
      useEmail: !!this.props.preference.email || false,
      usePhone: !!this.props.preference.phone || false,
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

  handlePhoneCheckboxClick = () => {
    if(!this.state.editing) return
    this.setState( (state) => ({ usePhone : !state.usePhone }) )
  }

  handleEmailCheckboxClick = () => {
    if(!this.state.editing) return
    this.setState( (state) => ({ useEmail : !state.useEmail }) )
  }

  actionButton = () => {
    if(this.state.editing){
      return (
        <div>
          <button className="button" onClick={this.handleDiscardChangesClick}>Cancel</button>
          <button
            className={`button is-success ${this.state.saving ? 'is-loading' : ''}`}
            onClick={this.handleSaveClick}
            disabled={ !(this.state.useEmail || this.state.usePhone) }
          >Save</button>
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
    const { favoriteTeams, phoneNumber } = this.props
    const { editing, selectedTeamSlug, callbackUrl, useEmail, usePhone } = this.state

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
            disabled={ !editing }
            selectedValue={ selectedTeamSlug }
          />
        </td>
        <td>
        <Checkbox
          handleClick={ this.handlePhoneCheckboxClick }
          label={ phoneNumber ? phoneNumber.number : 'Add a phone number below!' }
          isChecked={ usePhone }
          isDisabled={ !editing || !phoneNumber }/>
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
          <Checkbox
            handleClick={ this.handleEmailCheckboxClick }
            label={ this.auth.getUserEmail() }
            isChecked={ useEmail }
            isDisabled={ !editing }/>
        </td>
        <td>
          { this.actionButton() }
        </td>
      </tr>
    )
  }

}

export default NotificationPreferenceRow
