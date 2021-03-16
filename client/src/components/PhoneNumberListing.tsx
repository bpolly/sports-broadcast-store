import React, { Component } from 'react'
import PhoneNumberForm from './PhoneNumberForm'
import '../styles/phone_number_listing.scss'

type Props = {
  phoneNumber: PhoneNumber | null
  deletePhoneNumber: () => void
  fetchPhoneNumber: () => void
}

class PhoneNumberListing extends Component<Props> {
  state = {
    showPhoneForm: false,
  }

  handleDeleteClick = () => {
    if (
      !window.confirm(
        `Are you sure you wish to delete phone number ${
          this.props.phoneNumber && this.props.phoneNumber.number
        }?`
      )
    )
      return
    this.props.deletePhoneNumber()
  }

  verificationStatusTag = () => {
    if (this.props.phoneNumber && this.props.phoneNumber.verified) {
      return <span></span>
    } else {
      return (
        <button
          className="button is-warning is-small"
          onClick={this.showPhoneFormModal}
        >
          verify
        </button>
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

    return (
      <div className="box phone-number-listing">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              {phoneNumber && phoneNumber.number}
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">{this.verificationStatusTag()}</div>
            <div className="level-item">
              <a
                className="delete is-small"
                onClick={this.handleDeleteClick}
              ></a>
            </div>
          </div>
        </div>
        <PhoneNumberForm
          hidden={!this.state.showPhoneForm}
          closePhoneFormModal={this.closePhoneFormModal}
          phoneNumber={phoneNumber}
          fetchPhoneNumber={this.props.fetchPhoneNumber}
        />
      </div>
    )
  }
}

export default PhoneNumberListing
