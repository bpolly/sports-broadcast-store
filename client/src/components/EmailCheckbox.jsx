import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/email_checkbox.css';

class EmailCheckbox extends Component {
  state = {
    checked: false
  }

  handleClick = () => {
    this.setState( (state) => ({ checked : !state.checked }) )
  }

  icon = () => {
    if(this.state.checked){
      return(
        <FontAwesomeIcon
          icon="check-square"
          size="lg"
        />
      )
    } else {
      return(
        <FontAwesomeIcon
          icon="square"
          size="lg"
        />
      )
    }
  }

  render() {
    return(
      <div className="box email-checkbox" onClick={this.handleClick}>
        { this.icon() }
        <span className="email-checkbox-address">Email Address</span>
      </div>
    )
  }

}

export default EmailCheckbox
