import React, { Component } from 'react'
import '../styles/notification_preference_row.css'
import axios from 'axios'
import AuthService from './AuthService'

class NotificationPreferenceRow extends Component {
  state = {
    team_id: this.props.preference.team_id || '',
    phone: this.props.preference.phone || '',
    callbackUrl: this.props.preference.callbackUrl || '',
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
    axios.patch('/user_notification_preference',
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
      team_id: this.props.preference.team_id || '',
      phone: this.props.preference.phone || '',
      callbackUrl: this.props.preference.callbackUrl || '',
      email: this.props.preference.email || '',
      editing: false
    })
  }

  handleChange = (e) => {
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

  render(){
    const { preference } = this.props
    const { editing, phone, callbackUrl, email } = this.state

    return(
      <tr>
        <td>
          <input
            className="input"
            type="text"
            value={ preference.team_id }
            disabled={ !editing }
            onChange={ this.handleChange }
            name="team_id"
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ phone }
            disabled={ !editing }
            onChange={ this.handleChange }
            name="phone"
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ callbackUrl }
            disabled={ !editing }
            onChange={ this.handleChange }
            name="callbackUrl"
          />
        </td>
        <td>
          <input
            className="input"
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
