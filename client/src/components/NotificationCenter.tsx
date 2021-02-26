import React, { useState, useEffect, CSSProperties } from 'react'
import FavoriteTeamSelect from './FavoriteTeamSelect'
import NotificationPreferenceTable from './NotificationPreferenceTable'
import PhoneNumberForm from './PhoneNumberForm'
import PhoneNumberListing from './PhoneNumberListing'
import axios from 'axios'
import AuthService from './AuthService'
import '../styles/notification_center.scss'

interface Props {
  favoriteTeams: Team[];
  handleFavoriteTeamChange: (teams: Team[]) => void;
}

function NotificationCenter(props: Props) {
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber | null>(null)
  const [emailObjects, setEmailObjects] = useState<any[]>([])
  const [showPhoneForm, setShowPhoneForm] = useState<boolean>(false)

  const auth = new AuthService()

  useEffect(() => {
    fetchPhoneNumber()
    fetchEmails()
  }, [])

  const fetchPhoneNumber = () => {
    let user_id = auth.getUserId()
    axios.get(`/users/${user_id}/phone`,
      { headers: { Authorization: auth.getToken() } }
    ).then(response => {
      let phoneNumberResponse: PhoneNumber = response.data
      setPhoneNumber(phoneNumberResponse)
    })
  }

  const fetchEmails = () => {
    let user_id = auth.getUserId()
    axios.get(`/users/${user_id}/email`,
      { headers: { Authorization: auth.getToken() } }
    ).then(response => {
      setEmailObjects(response.data)
    })
  }

  const showPhoneFormModal = () => {
    setShowPhoneForm(true)
  }

  const closePhoneFormModal = () => {
    setShowPhoneForm(false)
  }

  const deletePhoneNumber = () => {
    let user_id = auth.getUserId()
    return axios.delete(`/users/${user_id}/phone/`,
      {
        headers: { Authorization: auth.getToken() }
      }
    ).then(response => {
      setPhoneNumber(null)
    })
    .catch(error =>{
      // do something with error
    })
  }

  const phoneNumberList = () => {
    if(phoneNumber) {
      return(
        <PhoneNumberListing
          phoneNumber={phoneNumber}
          deletePhoneNumber={deletePhoneNumber}
          fetchPhoneNumber={fetchPhoneNumber}
        />
      )
    }
    else {
      return(<div>You haven't added any phone numbers yet, add one above!</div>)
    }
  }

  const { favoriteTeams } = props

  return(
    <div className="container">
      <h1 className="title">Notification Center</h1>
      <h3 className="subtitle">Team Alerts</h3>
      <NotificationPreferenceTable
        favoriteTeams={favoriteTeams}
        phoneNumber={phoneNumber}
      />
      <hr />
        <div className="columns">
          <div className="column is-one-half">
            <h3 className="subtitle">
              <i className="fa fa-star mr-2" style={{color: '#fc6066'}}></i>
              Favorite Teams
            </h3>
            <FavoriteTeamSelect
              favoriteTeams={props.favoriteTeams}
              handleFavoriteTeamChange={props.handleFavoriteTeamChange} />
          </div>
          <div className="column">
            <div className="phone-list">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <i className="fa fa-phone mr-2"></i>
                    <h3 className="subtitle">Phone Numbers</h3>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button
                      className={`button is-small is-outlined is-primary ${ phoneNumber == null ? ''  : 'is-invisible'}`}
                      onClick={showPhoneFormModal}>Add New</button>
                  </div>
                </div>
              </div>

              { phoneNumberList() }

              <PhoneNumberForm
                hidden={!showPhoneForm}
                closePhoneFormModal={closePhoneFormModal}
                fetchPhoneNumber={fetchPhoneNumber}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default NotificationCenter
