import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './AuthService';
import '../styles/animate.css';
import '../styles/phone_number_form.css';

class PhoneNumberForm extends Component {
  state = {
    phoneNumber: '',
    verificationSent: false,
    verificationCode: '',
    phoneNumberID: '',
    verificationSuccess: false
  }
  auth = new AuthService()

  handleChange = (e) => {
    let change = {}
    change[e.target.name] = e.target.value.toUpperCase()
    this.setState(change)
  }

  checkForAllCodeCharacters = () => {
    if(this.state.verificationCode.length != 4) return

    let user_id = this.auth.getUserId()
    axios.post(`/users/${user_id}/phones/${this.state.phoneNumberID}/verify`,
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
      // do something with error
    })

  }


  handleSaveClick = () => {
    this.setState({ verificationSent: true })
    let user_id = this.auth.getUserId()
    axios.post(`/users/${user_id}/phones`,
      {
        number: this.state.phoneNumber
      },
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      console.log('Phone number saved')
      console.log(response)
      let phoneNumberID = response.data['id']
      console.log(phoneNumberID)
      this.setState({ verificationSent: true, phoneNumberID: phoneNumberID })
    })
    .catch(error =>{
      // do something with error
    })
  }

  render() {
    const { hidden } = this.props
    const { phoneNumber, verificationCode, phoneNumberID } = this.state

    return(
      <div className={`modal ${hidden ? '' : 'is-active'}`} >
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <div className="field">
              <label className="label">Add Phone Number</label>
              <div className="control">
                <input
                  name="phoneNumber"
                  className="input"
                  type="text"
                  placeholder=""
                  value={phoneNumber}
                  onChange={this.handleChange}/>
              </div>
              <p className="help">This is a help text</p>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={this.handleSaveClick}>Submit</button>
              </div>
            </div>
            <div className="box animated fadeInDown" style={{display: !!this.state.phoneNumberID ? '' : 'none'}}>
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
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.props.closePhoneFormModal}>
        </button>
      </div>
    )
  }
}

export default PhoneNumberForm;
