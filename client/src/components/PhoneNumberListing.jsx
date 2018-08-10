import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService'
import PhoneNumberForm from './PhoneNumberForm'
import '../styles/phone_number_listing.css'

class PhoneNumberListing extends Component {
  state = {
    showPhoneForm: false
  }

  handleDeleteClick = () => {
    if (!window.confirm(`Are you sure you wish to delete phone number ${this.props.phoneNumber.number}?`)) return
    this.props.deletePhoneNumber(this.props.phoneNumber)
  }

  verificationStatusTag = () => {
    if(this.props.phoneNumber.verified) {
      return (
        <span className="tag is-success is-pulled-right">verified</span>
      )
    } else {
      return (
        <span className="tag is-warning is-pulled-right">unverified</span>
      )
    }
  }

  showPhoneFormModal = () => {
    this.setState({ showPhoneForm: true })
  }

  closePhoneFormModal = () => {
    this.setState({ showPhoneForm: false })
  }

  render() {
    const { phoneNumber } = this.props

    return(
      <div className="box phone-number-listing">
        { phoneNumber.number }
        <a
          className="delete is-pulled-right is-small"
          onClick={this.handleDeleteClick}>
        </a>
        { this.verificationStatusTag() }
        <a
          className={`is-pulled-right is-small ${this.props.phoneNumber.verified ? 'is-invisible' : ''}`}
          onClick={this.showPhoneFormModal}>Verify
        </a>
        <PhoneNumberForm
          hidden={!this.state.showPhoneForm}
          closePhoneFormModal={this.closePhoneFormModal}
          phoneNumber={phoneNumber}
          fetchPhoneNumbers={this.props.fetchPhoneNumbers}
        />
      </div>
    )
  }
}

export default PhoneNumberListing
