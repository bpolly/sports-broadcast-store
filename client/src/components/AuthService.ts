/// <reference types="axios" />
import decode from 'jwt-decode'

import axios from 'axios'
import { AxiosResponse } from 'axios'
declare module "react-cookies";
import cookie from 'react-cookies'

interface JwtToken {
    exp: number,
    [key: string]: any
}

export default class AuthService {
    // Initializing important variables
    constructor() {
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getUserData = this.getUserData.bind(this)
    }

    login(email: string, password: string) {
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

    createUser(email: string, password: string, passwordConfirmation: string) {
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
        return !!token && !this.isTokenExpired(token) && this.getUserEmailVerificationStatus()
    }

    isAdmin() {
        const decoded: JwtToken = decode(this.getToken())
        return this.isLoggedIn() && decoded['admin']
    }

    isTokenExpired(token: string) {
        try {
            const decoded: JwtToken = decode(token)
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

    setToken(token: string) {
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

    getUserData(): JwtToken {
        return decode(this.getToken())
    }

    getUserId() {
        return this.getUserData()['user_id']
    }

    getUserEmail() {
        return this.getUserData()['user_email']
    }

    getUserEmailVerificationStatus() {
        return this.getUserData()['email_verified']
    }

    fetch(url: string, options: object) {
        // performs api calls sending the required authentication headers
        const headers: any = {
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

    _checkStatus(response: any) {
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
