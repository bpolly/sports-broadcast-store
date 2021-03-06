import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/animate.css'
import '../styles/phone_number_form.scss'

interface Props {
  closePhoneFormModal: () => void
  fetchPhoneNumber: () => void
}

class PhoneNumberVerificationForm extends Component<Props> {
  state = {
    verificationCode: '',
    verificationSuccess: false,
    verificationCodeChecked: false,
    verificationCodeCheckInProgress: false,
    verificationMessage: '',
  }
  auth = new AuthService()

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const change = {}
    change[e.target.name] = e.target.value.toUpperCase()
    this.setState(change)
  }

  checkForAllCodeCharacters = () => {
    if (this.state.verificationCode.length < 4) {
      this.setState({ verificationCodeChecked: false, verificationMessage: '' })
    }
    if (this.state.verificationCode.length !== 4) return
    this.initiateVerificationCheck()
  }

  initiateVerificationCheck = () => {
    this.setState({ verificationCodeCheckInProgress: true })

    const user_id = this.auth.getUserId()
    axios
      .post(
        `/users/${user_id}/phone/verify`,
        {
          verification_code: this.state.verificationCode,
        },
        {
          headers: { Authorization: this.auth.getToken() },
        }
      )
      .then(this.handleVerificationSuccess)
      .catch((error) => {
        this.handleVerificationFailure(error)
      })
      .then(() => {
        this.setState({ verificationCodeCheckInProgress: false })
      })
  }

  handleVerificationSuccess = () => {
    this.props.fetchPhoneNumber()
    this.setState({
      verificationCodeChecked: true,
      verificationSuccess: true,
      verificationMessage: 'Success! Redirecting...',
    })
    setTimeout(this.props.closePhoneFormModal, 1500)
  }

  handleVerificationFailure = (error) => {
    this.setState({
      verificationCodeChecked: true,
      verificationSuccess: false,
      verificationMessage: error.response.data,
    })
  }

  resendNewCode = () => {
    const user_id = this.auth.getUserId()
    axios
      .post(
        `/users/${user_id}/phone/resend_verification_code`,
        {},
        {
          headers: { Authorization: this.auth.getToken() },
        }
      )
      .then(() => {
        this.setState({ verificationMessage: 'New verification code sent!' })
      })
      .catch(() => {
        this.setState({
          verificationMessage: 'Verification code resend failed.',
        })
      })
  }

  resultIcon = () => {
    const {
      verificationSuccess,
      verificationCodeChecked,
      verificationCodeCheckInProgress,
    } = this.state
    if (verificationCodeCheckInProgress) {
      return (
        <FontAwesomeIcon
          icon="spinner"
          color="#6DB65B"
          size="lg"
          className="verification-code-success-icon fa-spin"
        />
      )
    } else if (verificationCodeChecked && verificationSuccess) {
      return (
        <FontAwesomeIcon
          icon="check-circle"
          color="#6DB65B"
          size="lg"
          className="verification-code-success-icon"
        />
      )
    } else if (verificationCodeChecked && !verificationSuccess) {
      return (
        <FontAwesomeIcon
          icon="times-circle"
          color="#f4425c"
          size="lg"
          className="verification-code-success-icon"
        />
      )
    }
  }

  render() {
    const { verificationCode, verificationMessage } = this.state

    return (
      <div className="box animated fadeInDown">
        <div className="field" style={{ textAlign: 'center' }}>
          <label className="label">Enter Verification Code</label>
          <input
            value={verificationCode}
            onChange={this.handleChange}
            onKeyUp={this.checkForAllCodeCharacters}
            className="input is-large"
            name="verificationCode"
            type="text"
            placeholder=""
            id="phone-activation-code"
            maxLength={4}
          />
          {this.resultIcon()}
        </div>
        <div className="field">{verificationMessage}</div>
        <button
          className="verification-code-resend-btn button is-small"
          onClick={this.resendNewCode}
        >
          Resend
        </button>
      </div>
    )
  }
}

export default PhoneNumberVerificationForm
