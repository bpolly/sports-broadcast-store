import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService'
import '../styles/phone_number_listing.css'

class PhoneNumberListing extends Component {
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
      </div>
    )
  }
}

export default PhoneNumberListing
