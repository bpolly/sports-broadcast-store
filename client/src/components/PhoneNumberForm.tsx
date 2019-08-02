import React, { Component } from 'react'
import PhoneNumberVerificationForm from './PhoneNumberVerificationForm'
import axios from 'axios'
import AuthService from './AuthService'
import '../styles/animate.css'
import '../styles/phone_number_form.scss'

interface Props {
  phoneNumber?: PhoneNumber | null
  closePhoneFormModal: () => void
  fetchPhoneNumber: () => void
  hidden: boolean
}

class PhoneNumberForm extends Component<Props> {
  state = {
    phoneNumber: (this.props.phoneNumber && this.props.phoneNumber.number) || null,
    verificationSent: false,
    phoneNumberID: (this.props.phoneNumber && this.props.phoneNumber.id) || null,
  }
  auth = new AuthService()

  handleChange = (e) => {
    let change = {}
    change[e.target.name] = e.target.value.toUpperCase()
    this.setState(change)
  }

  handleSaveClick = () => {
    this.setState({ verificationSent: true })
    let user_id = this.auth.getUserId()
    axios.post(`/users/${user_id}/phone`,
      {
        number: this.state.phoneNumber
      },
      {
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      this.setState({ verificationSent: true, phoneNumberID: response.data['id'] })
      this.props.fetchPhoneNumber()
    })
    .catch(error =>{
      // do something with error
    })
  }

  PhoneNumberVerificationForm = () => {
    const { phoneNumberID } = this.state
    if(phoneNumberID) return(
      <PhoneNumberVerificationForm
        closePhoneFormModal={this.props.closePhoneFormModal}
        fetchPhoneNumber={this.props.fetchPhoneNumber}
      />
    )
  }


  render() {
    const { hidden } = this.props
    const { phoneNumber } = this.state

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
              <div className="control">
                <input
                  name="phoneNumber"
                  className="input"
                  type="text"
                  placeholder=""
                  value={phoneNumber}
                  onChange={this.handleChange}/>
              </div>
              <p className="help">Enter without punctuation</p>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={this.handleSaveClick}>Submit</button>
              </div>
            </div>
            { this.PhoneNumberVerificationForm() }
          </section>
        </div>
      </div>
    )
  }
}

export default PhoneNumberForm
