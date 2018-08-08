import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/animate.css';
import '../styles/phone_number_form.css';

class PhoneNumberVerificationForm extends Component {
  state = {
    verificationCode: '',
    verificationSuccess: false,
    verificationCodeChecked: false
  }
  auth = new AuthService()

  handleChange = (e) => {
    let change = {}
    change[e.target.name] = e.target.value.toUpperCase()
    this.setState(change)
  }

  checkForAllCodeCharacters = () => {
    if(this.state.verificationCode.length < 4){
      this.setState({ verificationCodeChecked: false })
    }
    if(this.state.verificationCode.length != 4) return
    this.setState({ verificationCodeChecked: true })

    let user_id = this.auth.getUserId()
    axios.post(`/users/${user_id}/phones/${this.props.phoneNumberID}/verify`,
      {
        verification_code: this.state.verificationCode
      },
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      console.log(response)
      this.setState({ verificationSuccess: true })
    })
    .catch(error =>{
      this.setState({ verificationSuccess: false })
    })
  }

  resultIcon = () => {
    const { verificationSuccess, verificationCodeChecked } = this.state
    if(verificationCodeChecked && verificationSuccess){
      return(
        <FontAwesomeIcon
          icon="check-circle"
          color="#6DB65B"
          size="lg"
          className="verification-code-success-icon"
        />
      )
    }
    else if(verificationCodeChecked && !verificationSuccess){
      return(
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
    const { phoneNumberID } = this.props
    const { verificationCode } = this.state

    return(
      <div className="box animated fadeInDown" style={{display: !!phoneNumberID ? '' : 'none'}}>
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
            maxLength="4"
          />
          {this.resultIcon()}
        </div>
      </div>
    )
  }
}

export default PhoneNumberVerificationForm;
