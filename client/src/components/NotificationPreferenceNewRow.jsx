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
    favoriteTeams: []
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
    this.setState({ saving: true })
    setTimeout(function() {}, 500)
    axios.post('/user_notification_preference',
      {
        user_notification_preference_id: this.props.preference.id,
        team_id: this.state.team_id,
        phone: this.state.phone,
        callback_url: this.state.callback_url,
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
      callback_url: '',
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
    console.log(e)
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
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
        <button className="button" onClick={this.handleEditClick}>Edit</button>
      )
    }
  }

  formRow = () => {
    const { preference } = this.props
    const { team_id, phone, callback_url, email, favoriteTeams } = this.state

    return(
      <tr>
        <td>
          <Select
            name="favorite-team-multiselect"
            value={ team_id }
            onChange={ this.handleTeamChange }
            options={ generateTeamOptions(favoriteTeams) }
            closeOnSelect={true}
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
            value={ callback_url }
            onChange={ this.handleChange }
            name="callback_url"
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
        <td colspan="5" style={{"text-align": 'center'}}>
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
