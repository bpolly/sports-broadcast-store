import decode from 'jwt-decode'
import cookie from 'react-cookies'
import axios from 'axios'

export default class AuthService {
    // Initializing important variables
    constructor() {
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getUserData = this.getUserData.bind(this)
    }

    login(email, password) {
      return axios.post('/login', {
        user: {
          email: email,                                
          password: password
        }
      }).then(response => {
          this.setToken(response.data.access_token)
          return Promise.resolve(response)
        })
    }

    createUser(email, password, passwordConfirmation) {
      return axios.post('/users', {
        user: {
          password: password,
          password_confirmation: passwordConfirmation,
          user_email_attributes: {
            address: email
          }
        }
      }).then(response => {
          this.setToken(response.data.access_token)
          return Promise.resolve(response)
        })
    }

    isLoggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isAdmin() {
        return this.isLoggedIn() && decode(this.getToken())['admin']
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token)
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true
            }
            else
                return false
        }
        catch (err) {
            return false
        }
    }

    setToken(token) {
        // Saves user token to cookie
        cookie.save('user-auth-token', token, { path: '/' })
    }

    getToken() {
        // Retrieves the user token from cookie
        return cookie.load('user-auth-token')
    }

    logout() {
        // Clear user token and profile data from cookie
        cookie.remove('user-auth-token')
    }

    getUserData() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken())
    }

    getUserId() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken())['user_id']
    }

    getUserEmail() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken())['user_email']
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.isLoggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error: any = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
