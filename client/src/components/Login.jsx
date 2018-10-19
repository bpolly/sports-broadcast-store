import React, { Component } from 'react';
import '../styles/login.scss';
import AuthService from './AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: ""
  }
  auth = new AuthService()

  handleChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.auth.login(this.state.email, this.state.password)
      .then(response =>{
        this.setState({ errors: 'Success! Redirecting home.' })
        setTimeout(() => {
          this.props.history.push('/')
        }, 1000)
      })
      .catch(error =>{
        this.setState({ errors: error.response.data.message })
      })
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
            { this.state.errors }
          </p>
        </div>
      </form>
    )
  }

  render() {
    return (
      <div className="container container-login">
        <div className="box">
          <FontAwesomeIcon
            icon={['fas', 'user-circle']}
            color="#fb5f66"
            size="4x"
            id="signup-icon-header"
          />

          { this.formContent() }

        </div>
      </div>
    );
  }
}

export default Login;
