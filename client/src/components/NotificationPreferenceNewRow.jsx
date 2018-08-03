import React, { Component } from 'react'
import '../styles/notification_preference_row.css'
import axios from 'axios'
import AuthService from './AuthService'
import Select from 'react-select'
import { generateTeamOptions } from '../utilities.js'

class NotificationPreferenceNewRow extends Component {
  state = {
    editing: false,
    saving: false,
    favoriteTeams: [],
    selectedTeamSlug: {},
    phone: '',
    callbackUrl: '',
    email: '',
  }
  auth = new AuthService()

  componentDidMount() {
    console.log('componentdidmount')
    axios.get('/user_favorite_teams',
      { headers: { Authorization: this.auth.getToken() } }
    ).then(response => {
      this.setState({ favoriteTeams: response.data })
    })
  }

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
    axios.post('/user_notification_preference',
      {
        user_notification_preference_id: this.props.preference.id,
        team_id: this.state.team_id,
        phone: this.state.phone,
        callbackUrl: this.state.callbackUrl,
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
      team_id: '',
      phone: '',
      callbackUrl: '',
      email: '',
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
    this.setState({ selectedTeamSlug: e.value })
  }

  validForm = () => {
    return !!(this.state.selectedTeamSlug &&
        (
          !!this.state.phone ||
          !!this.state.callbackUrl ||
          !!this.state.email
        )
      )
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
    const { preference } = this.props
    const { selectedTeamSlug, phone, callbackUrl, email, favoriteTeams } = this.state
    console.log(selectedTeamSlug)

    return(
      <tr>
        <td>
          <Select
            className="favorite-team-select-single"
            name="favorite-team-select"
            value={ selectedTeamSlug }
            onChange={ this.handleTeamChange }
            options={ generateTeamOptions(favoriteTeams) }
            closeOnSelect={true}
            selectedValue={selectedTeamSlug}
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ phone }
            onChange={ this.handleChange }
            name="phone"
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ callbackUrl }
            onChange={ this.handleChange }
            name="callbackUrl"
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ email }
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
