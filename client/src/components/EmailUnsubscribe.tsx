import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link, RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import '../styles/email_unsubscribe.scss'
const queryString = require('query-string')
import { titleCase } from '../utilities'

class EmailUnsubscribe extends Component<RouteComponentProps<any>> {
  state = {
    emailAddress: '',
    preferenceId: '0',
    requestSent: false,
    requestSuccess: false,
    message: '',
    selectedOption: 'single-pref',
    teamName: ''
  }

  componentDidMount(){
    const params = queryString.parse(this.props.location.search)
    console.log(params)
    this.setState({
      emailAddress: params.email_address,
      preferenceId: params.preference,
    }, this.fetchTeamNameForPreference)
  }

  fetchTeamNameForPreference = () => {
    axios.get('/user_notification_preferences/' + this.state.preferenceId)
    .then(response => {
      console.log(response)
      this.setState({
        teamName: response.data.team.name
      })
    })
  }

  handleOptionChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      selectedOption: e.currentTarget.value
    });
  }

  handleSubmit = () => {
    let body = {}
    body['email_address'] = this.state.emailAddress
    if(this.state.preferenceId != '') body['preferenceId'] = this.state.preferenceId
    axios.post('/unsubscribe_email', body)
    .then(response => {
      console.log('success')
      this.setState({
        requestSent: true,
        requestSuccess: true,
        message: 'Successfully unsubscribed!'
      })
    })
    .catch(error => {
      console.log(error.response)
      this.setState({
        requestSent: true,
        requestSuccess: false,
        message: error.response.data
      })
    })
  }

  render() {
    const { selectedOption, emailAddress, teamName } = this.state
    return(
      <div className="email-unsubscribe container">
        <h3 className="title is-3">Unsubscribe from email notifications for:</h3>
        <h5 className="subtitle">User: {emailAddress}</h5>

        <div className="box">
          <div className="field">
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="question"
                  value="single-pref"
                  onChange={this.handleOptionChange}
                  checked={selectedOption == 'single-pref'}
                />
                Notifications for all  <span className="has-text-primary has-text-weight-bold">
                  {titleCase(teamName)}
                </span> games
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="question"
                  value="all-prefs"
                  onChange={this.handleOptionChange}
                  checked={selectedOption == 'all-prefs'} />
                 All email notifications
              </label>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <a onClick={this.handleSubmit} className="button is-link">Submit</a>
            </div>
            <div className="control">
              <Link to="/" className="button">Cancel</Link>
            </div>
          </div>

          <p>{ this.state.message }</p>
        </div>
      </div>
    )
  }
}

export default withRouter(EmailUnsubscribe)
