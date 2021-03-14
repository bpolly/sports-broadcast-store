import React, { Component } from 'react'
import axios from 'axios'
import '../styles/email_verification.scss'
import AuthService from './AuthService'

interface State {
  emailResendAttempted: boolean
  message: string
}

class EmailVerificationResend extends Component<any, State> {
  state = {
    emailResendAttempted: false,
    message: '',
  }
  auth = new AuthService()

  resendVerificationLink = () => {
    return (
      <div>
        Misplace the email or your code has expired?
        <a onClick={this.resendVerificationEmail}> Click here to resend!</a>
      </div>
    )
  }

  message = () => {
    if (this.state.emailResendAttempted) {
      return <p>Email verification sent!</p>
    } else {
      return (
        <a onClick={this.resendVerificationEmail}> Click here to resend!</a>
      )
    }
  }

  resendVerificationEmail = () => {
    this.setState({ emailResendAttempted: true })
    const user_id = this.auth.getUserId()
    axios
      .post(
        `/users/${user_id}/email/resend_verification_code`,
        {},
        {
          headers: { Authorization: this.auth.getToken() },
        }
      )
      .then(() => {
        console.log('success')
        this.setState({
          emailResendAttempted: true,
        })
      })
      .catch(() => {
        this.setState({
          emailResendAttempted: false,
        })
      })
  }

  render() {
    return (
      <div>
        Misplace the email or your code has expired?
        {this.message()}
      </div>
    )
  }
}

export default EmailVerificationResend
