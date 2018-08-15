import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/email_checkbox.css';

class EmailCheckbox extends Component {
  icon = () => {
    if(this.props.is_checked){
      return(
        <FontAwesomeIcon
          icon="check-square"
          color="green"
          size="lg"
        />
      )
    } else {
      return(
        <FontAwesomeIcon
          icon="square"
          color="green"
          size="lg"
        />
      )
    }
  }

  render() {
    const { is_disabled, emailAddress } = this.props

    return(
      <div className={`box email-checkbox ${is_disabled ? 'disabled' : ''}`} onClick={this.props.handleEmailCheckboxClick}>
        { this.icon() }
        <span className="email-checkbox-address">{emailAddress}</span>
      </div>
    )
  }

}

export default EmailCheckbox
