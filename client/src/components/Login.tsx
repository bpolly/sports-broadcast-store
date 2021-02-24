import React, { useEffect, useState, useContext } from 'react'
import '../styles/login.scss'
import AuthService from './AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmailVerificationResend from './EmailVerificationResend'
import UserContext from '../contexts/User'

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState({ code: 0, message: ''})

  const auth = new AuthService()
  const { setLoggedIn } = useContext(UserContext)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch(e.target.type) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    auth.login(email, password)
      .then(response =>{
        setLoginStatus({ code: 200, message: 'OK' })
        setLoggedIn(true)
        setTimeout(() => { props.history.push('/') }, 1000)
        // setState(
        //   { loginStatus: { code: 200, message: 'OK' }},
        //   () => (setTimeout(() => { props.history.push('/') }, 1000))
        // )
      })
      .catch(error =>{
        setLoginStatus({
          code: error.response.status,
          message: error.response.data.message
        })
      })
  }

  const successMessage = () => { return(<p>Success! Redirecting home...</p>) }
  const defaultErrorMessage = (message: string) => { return( <p>{ message }</p> )}
  const emailNotVerifiedMessage = () => {
    return(
      <div>
        <p>Login successful - however this email has not been verified yet.</p>
        <p>Please check your email for the verification link.</p>
        <EmailVerificationResend />
      </div>
    )
  }

  const loginResultMessage = () => {
    switch(loginStatus.code){
      case 0: return;
      case 200: return successMessage();
      case 403: return emailNotVerifiedMessage();
      default: return defaultErrorMessage(loginStatus.message)
    }
  }

  const formContent = () => {
    return(
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
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
              value={password}
              onChange={handleChange}
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
          { loginResultMessage() }
        </div>
      </form>
    )
  }
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

        { formContent() }

      </div>
    </div>
  )
}

export default Login
