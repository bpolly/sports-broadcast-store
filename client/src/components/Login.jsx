import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/sportcasts-logo.png';
import '../styles/dashboard.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  handleSubmit = (e) => {
    this.setState({ loading: true });
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      // Do something with the token
    })
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
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
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
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
                <i className="fas fa-lock"></i>
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
        </form>
      </div>
    );
  }
}

export default Login;
