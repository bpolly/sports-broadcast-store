import React, { Component } from 'react';
import PhoneNumberVerificationForm from './PhoneNumberVerificationForm'
import axios from 'axios';
import AuthService from './AuthService';
import '../styles/animate.css';
import '../styles/phone_number_form.css';

class PhoneNumberForm extends Component {
  state = {
    phoneNumber: (this.props.phoneNumber && this.props.phoneNumber.number) || '',
    verificationSent: false,
    phoneNumberID: (this.props.phoneNumber && this.props.phoneNumber.id) || '',
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
      this.setState({ verificationSent: true, phoneNumberID: response.data['id'] })
      this.props.fetchPhoneNumbers()
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
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add Phone Number</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.closePhoneFormModal}>
            </button>
          </header>
          <section className="modal-card-body">

            <div className="field">
              <label className="label">Subtitle</label>
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
            <PhoneNumberVerificationForm
              phoneNumberID={phoneNumberID}
              closePhoneFormModal={this.props.closePhoneFormModal}
              fetchPhoneNumbers={this.props.fetchPhoneNumbers}
            />
          </section>
        </div>
      </div>
    )
  }
}

export default PhoneNumberForm;
