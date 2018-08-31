import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import EmailVerificationResend from './EmailVerificationResend';
import '../styles/email_verification.css'
const queryString = require('query-string')

class EmailVerification extends Component {
  state = {
    emailAddress: '',
    verificationCode: '',
    verificationSent: false,
    verificationSuccess: false,
    message: ''
  }

  componentDidMount(){
    const params = queryString.parse(this.props.location.search)
    console.log(params)
    this.setState({
      emailAddress: params.email_address,
      verificationCode: params.code,
    }, this.attemptVerification)
  }

  attemptVerification = () => {
    console.log(this.state)
    axios.post('/verify_email', {
      email_address: this.state.emailAddress,
      verification_code: this.state.verificationCode
    })
    .then(response => {
      console.log('success')
      this.setState({
        verificationSent: true,
        verificationSuccess: true,
        message: 'Success! Please login.'
      })
    })
    .catch(error => {
      console.log(error.response)
      this.setState({
        verificationSent: true,
        verificationSuccess: false,
        message: error.response.data
      })
    })
  }

  resendVerificationLink = () => {
    if(this.state.verificationSuccess) return
    return(
      <EmailVerificationResend
        emailAddress={ this.state.emailAddress }
      />
    )
  }

  render() {
    const { message, verificationSuccess, emailAddress } = this.state
    return(
      <div className="container has-text-centered">
        <div className="box box-small">
          <FontAwesomeIcon
            icon={['fas', 'envelope']}
            color="#fb5f66"
            size="4x"
            id="signup-icon-header"
          />

          <p>{`Verifying ${emailAddress}`}</p>
          <p>...</p>

          <p className={verificationSuccess ? 'message-success' : 'message-failure'}>{ message }</p>

          <hr />
        { this.resendVerificationLink() }

        </div>
      </div>
    )
  }
}

export default withRouter(EmailVerification)
