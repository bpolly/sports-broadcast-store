import React, { Component } from 'react'
import '../styles/dashboard.css'
import AuthService from './AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import '../styles/signup.css'


class EmailVerification extends Component {
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

  componentDidMount(){
    const { match: { params } } = this.props;

    axios.get(`/api/users/${params.userId}`)
      .then(({ data: user }) => {
        console.log('user', user);

        this.setState({ user });
      });
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
        this.setState({ loading: false, signupSuccessful: false  })
      })
  }


  render() {
  }
}

export default EmailVerification
