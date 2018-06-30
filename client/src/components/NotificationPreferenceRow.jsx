import React, { Component } from 'react'
import '../styles/notification_preference_row.css'

class NotificationPreferenceRow extends Component {
  state = {
    editing: true
  }

  handleEditClick = () => {
    this.setState({ editing: !this.state.editing })
  }

  render(){
    const { preference } = this.props
    const { editing } = this.state

    return(
      <tr>
        <td>
          <input
            className="input"
            type="text"
            value={ preference.team_id }
            disabled={ !editing }
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ preference.phone }
            disabled={ !editing }
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ preference.callback_url }
            disabled={ !editing }
          />
        </td>
        <td>
          <input
            className="input"
            type="text"
            value={ preference.email }
            disabled={ !editing }
          />
        </td>
        <td>
          <button className="button" onClick={this.handleEditClick}>Edit</button>
        </td>
      </tr>
    )
  }

}

export default NotificationPreferenceRow
