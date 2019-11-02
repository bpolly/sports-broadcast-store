import React, { Component, useState } from 'react'
import PhoneNumberForm from './PhoneNumberForm'
import '../styles/phone_number_listing.scss'

type Props = {
  phoneNumber: PhoneNumber | null
  deletePhoneNumber: () => void
  fetchPhoneNumber: () => void
}

const PhoneNumberListing: React.FC<Props> = (props) => {
  const [showPhoneForm, setShowPhoneForm] = useState<boolean>(false)

  const handleDeleteClick = () => {
    if (!window.confirm(`Are you sure you wish to delete phone number ${props.phoneNumber && props.phoneNumber.number}?`)) return
    props.deletePhoneNumber()
  }

  const verificationStatusTag = () => {
    if (props.phoneNumber && props.phoneNumber.verified) {
      return (
        <span></span>
      )
    } else {
      return (
        <button className="button is-warning is-small" onClick={showPhoneFormModal}>verify</button>
      )
    }
  }

  const showPhoneFormModal = () => {
    setShowPhoneForm(true)
  }

  const closePhoneFormModal = () => {
    setShowPhoneForm(false)
  }

  const phoneNumber = props.phoneNumber;

  return(
    <div className="box phone-number-listing">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            {phoneNumber && phoneNumber.number }
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            { verificationStatusTag() }
          </div>
          <div className="level-item">
            <a className="delete is-small"
              onClick={handleDeleteClick}>
            </a>
          </div>
        </div>
      </div>
      <PhoneNumberForm
        hidden={!showPhoneForm}
        closePhoneFormModal={closePhoneFormModal}
        phoneNumber={phoneNumber}
        fetchPhoneNumber={props.fetchPhoneNumber}
      />
    </div>
  )
}

export default PhoneNumberListing
