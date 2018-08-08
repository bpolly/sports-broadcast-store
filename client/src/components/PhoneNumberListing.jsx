import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService'

class PhoneNumberListing extends Component {
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
      <div className="box">
        { phoneNumber.number }
        { this.verificationStatusTag() }
      </div>
    )
  }
}

export default PhoneNumberListing
