import React, { Component } from 'react'
import Select from 'react-select'
import Checkbox from './Checkbox'
import { generateTeamOptions } from '../utilities'
import AuthService from './AuthService'
import '../styles/notification_preference_row.scss'

interface Props {
  favoriteTeams: Team[]
  saveNewNotification: (object: Object) => Promise<any>
  phoneNumber: PhoneNumber | null
}

interface State {
  editing: boolean
  saving: boolean
  selectedTeamSlug: string
  callbackUrl: string
  useEmail: boolean
  usePhone: boolean
}

class NotificationPreferenceNewRow extends Component<Props, State> {
  state = {
    editing: false,
    saving: false,
    selectedTeamSlug: '',
    callbackUrl: '',
    useEmail: false,
    usePhone: false
  }
  auth = new AuthService()

  handleEditClick = () => {
    this.setState({ editing: true })
  }

  handleSaveClick = () => {
    if(!this.validForm()){
      console.log('Save failed')
      return null
    }
    this.setState({ saving: true })
    setTimeout(function() {}, 500)
    let saveParams = {
      team_slug: this.state.selectedTeamSlug,
      callback_url: this.state.callbackUrl,
      use_email: this.state.useEmail,
      use_phone: this.state.usePhone
    }
    this.props.saveNewNotification(saveParams)
      .then(response => {
        this.setState({
          editing: false,
          saving: false,
          selectedTeamSlug: '',
          callbackUrl: '',
          useEmail: false,
          usePhone: false
        })
      })
    .catch(error =>{
      this.setState({ editing: true, saving: false })
    })
  }

  handleDiscardChangesClick = () => {
    this.setState({
      selectedTeamSlug: '',
      callbackUrl: '',
      useEmail: false,
      usePhone: false,
      editing: false
    })
  }

  handleNewNotificationClick = () => {
    this.setState({
      editing: true
    })
  }

  handleChange = (e: any) => {
    let change: any = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleTeamChange = (selectedOption: TeamSelectOption) => {
    this.setState({ selectedTeamSlug: selectedOption.value })
  }

  validForm = () => {
    return !!(this.state.selectedTeamSlug &&
        (
          !!this.state.usePhone ||
          !!this.state.callbackUrl ||
          !!this.state.useEmail
        )
      )
  }

  handlePhoneCheckboxClick = () => {
    console.log('hi')
    if(!this.state.editing) return
    this.setState( (state) => ({ usePhone : !state.usePhone }) )
  }

  handleEmailCheckboxClick = () => {
    console.log('hi23')
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
    const { selectedTeamSlug, callbackUrl, useEmail, usePhone } = this.state
    const { favoriteTeams, phoneNumber } = this.props
    let teamOptions: Array<TeamSelectOption> = generateTeamOptions(favoriteTeams)

    return(
      <tr>
        <td>
          <Select
            className="favorite-team-select-single team-input"
            name="favorite-team-select"
            value={teamOptions.find(option => option.value === selectedTeamSlug)}
            onChange={ this.handleTeamChange }
            options={ teamOptions }
            closeOnSelect={true}
          />
        </td>
        <td>
          <Checkbox
            handleClick={this.handlePhoneCheckboxClick}
            label={ phoneNumber ? phoneNumber.number : 'Add a phone number below!' }
            isChecked={usePhone}
            isDisabled={!phoneNumber}/>
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
          <Checkbox
            handleClick={this.handleEmailCheckboxClick}
            label={this.auth.getUserEmail()}
            isChecked={useEmail}
            isDisabled={false}/>
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
        <td colSpan={5} style={{"textAlign": 'center'}}>
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
