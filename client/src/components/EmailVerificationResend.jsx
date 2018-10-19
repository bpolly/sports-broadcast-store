import React, { Component } from 'react'
import axios from 'axios'
import '../styles/email_verification.scss'

class EmailVerificationResend extends Component {
  state = {
    emailResendAttempted: false,
    message: ''
  }

  resendVerificationLink = () => {
    if(!this.state.verificationSuccess) {
      return(
        <div>
        Misplace the email or your code has expired?
        <a onClick={this.resendVerificationEmail}>Click here to resend!</a>
        </div>
      )
    }
  }

  message = () => {
    if(this.state.emailResendAttempted){
      return(<p>Email verification sent!</p>)
    }
    else {
      return(
        <a onClick={this.resendVerificationEmail}>Click here to resend!</a>
      )
    }
  }

  resendVerificationEmail = () => {
    this.setState({ emailResendAttempted: true })
    axios.post('/resend_verification', {
      email_address: this.state.emailAddress,
    })
    .then(response => {
      console.log('success')
      this.setState({
        emailResendAttempted: true,
      })
    })
    .catch(error => {
      this.setState({
        emailResendAttempted: false
      })
    })
  }

  render() {
    return(
      <div>
      Misplace the email or your code has expired?
      { this.message() }
      </div>
    )
  }
}

export default EmailVerificationResend
