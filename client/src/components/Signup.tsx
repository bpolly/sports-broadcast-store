import React, { Component } from 'react'
import '../styles/dashboard.scss'
import AuthService from './AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import '../styles/signup.scss'

type State = {
  email: string
  password: string
  passwordConfirmation: string
  loading: boolean
  errors: string
  signupSent: boolean
  signupSuccessful: boolean
}

class Signup extends Component<any, State> {
  state = {
    email: "",
    password: "",
    passwordConfirmation: "",
    loading: false,
    errors: "",
    signupSent: false,
    signupSuccessful: false
  }
  auth = new AuthService()

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    } as any)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true, signupSent: true })

    return axios.post('/users', {
      user: {
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
        user_email_attributes: {
          address: this.state.email
        }
      }
    }).then(response => {
        this.setState({ loading: false, signupSuccessful: true  })
      })
      .catch(error => {
        this.setState({ loading: false, signupSuccessful: false, errors: error.response.data })
      })
  }

  formContent = () => {
    if(!this.state.signupSuccessful) {
      return(
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                name="passwordConfirmation"
                type="password"
                placeholder="Password Confirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">
                Signup
              </button>
              { this.state.errors }
            </p>
          </div>
        </form>
      )
    }
    else {
      return(
        <strong>
          {`Signup successful! We have sent an email to ${this.state.email} with instructions on verifying your account.`}
        </strong>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column signup-info-column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title is-size-4">
                  Join Today!
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  Users get access to these features:
                  <ul>
                    <li>Save favorite teams for syncing across multiple devices</li>
                    <li>Signup for text and email alerts for your favorite teams!</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
          <div className="column signup-form-column">
            <div className="box">
              <span id="signup-icon-header">
                <FontAwesomeIcon
                  icon={['fas', 'user-circle']}
                  color="#fb5f66"
                  size="4x"
                />
              </span>

              { this.formContent() }

            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Signup
