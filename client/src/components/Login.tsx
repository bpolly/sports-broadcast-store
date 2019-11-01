import React, { Component } from 'react'
import '../styles/login.scss'
import AuthService from './AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmailVerificationResend from './EmailVerificationResend'

interface State {
  email: string
  password: string
  loading: boolean
  loginStatus: object
}

class Login extends Component<any, State> {
  state = {
    email: "",
    password: "",
    loading: false,
    loginStatus: { code: 0, message: '' }
  }
  auth = new AuthService()

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.type]: e.target.value
    } as any)
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.setState({ loading: true })
    this.auth.login(this.state.email, this.state.password)
      .then(response =>{
        this.setState(
          { loginStatus: { code: 200, message: 'OK' }},
          () => (setTimeout(() => { this.props.history.push('/') }, 1000))
        )
      })
      .catch(error =>{
        this.setState({
          loginStatus: {
            code: error.response.status,
            message: error.response.data.message
          }
        })
      })
  }

  successMessage = () => { return(<p>Success! Redirecting home...</p>) }
  defaultErrorMessage = (message: string) => { return( <p>{ message }</p> )}
  emailNotVerifiedMessage = () => {
    return(
      <div>
        <p>Login successful - however this email has not been verified yet.</p>
        <p>Please check your email for the verification link.</p>
        <EmailVerificationResend />
      </div>
    )
  }

  loginResultMessage = () => {
    const { loginStatus } = this.state
    switch(loginStatus.code){
      case 0: return;
      case 200: return this.successMessage();
      case 403: return this.emailNotVerifiedMessage();
      default: return this.defaultErrorMessage(loginStatus.message)
    }
  }

  formContent = () => {
    return(
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={['fas', 'envelope']} />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={['fas', 'lock']} />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success">
              Login
            </button>
          </p>
        </div>
        <div className="field">
          { this.loginResultMessage() }
        </div>
      </form>
    )
  }

  render() {
    return (
      <div className="container container-login">
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
    )
  }
}

export default Login
