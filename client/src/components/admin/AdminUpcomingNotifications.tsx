import React, { Component } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import moment from 'moment-timezone'
import AuthService from '../AuthService'

interface State {
  gamesWithNotifications: GameWithNotifications[],
  upcomingThresholdValue: string
}

class AdminUpcomingNotifications extends Component<any, State> {
  state = {
    gamesWithNotifications: [],
    upcomingThresholdValue: '120'
  }
  auth = new AuthService()

  componentWillMount(){
    this.fetchUpcomingNotifications()
  }

  fetchUpcomingNotifications = () => {
    axios.get('/admin/upcoming_notifications',
      {
        params: { minute_threshold: this.state.upcomingThresholdValue },
        headers: { Authorization: this.auth.getToken() }
      }
    ).then(response => {
      this.setState({
        gamesWithNotifications: response.data
      })
    })
  }

  handleThresholdChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      { upcomingThresholdValue: e.currentTarget.value },
      this.fetchUpcomingNotifications
    )
  }

  notificationTable = (game: GameWithNotifications) => {
    if(game.notifications.length == 0){
      return(
        <div>No notifications.</div>
      )
    }
    else {
      return(
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email?</th>
              <th>Phone?</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {
              game.notifications.map((notification: Preference) =>
                <tr key={ notification.id }>
                  <td>{ notification.user.id }</td>
                  <td>{ notification.email ? "Yes": "No" }</td>
                  <td>{ notification.phone ? "Yes": "No" }</td>
                  <td>{ notification.team && notification.team.name }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      )
    }
  }

  render() {
    const { gamesWithNotifications } = this.state
    return(
      <div id="admin-users">
        <h3 className="title is-3">Upcoming Notifications</h3>
        <div className="field">
          <label className="label">Minute Threshold</label>
          <div className="control">
            <input type="text" value={this.state.upcomingThresholdValue} onChange={this.handleThresholdChange} />
          </div>
          <p className="help">Current Count: { gamesWithNotifications.length }</p>
        </div>

        {
          gamesWithNotifications.map((game: GameWithNotifications) =>
            <div className="box" key={ game.id }>
              <div className="columns">
                <div className="column has-text-weight-semibold">
                  { moment(game.date).tz(moment.tz.guess()).format('h:mma') }
                </div>
                <div className="column capitalize">
                  { game.away_team } at { game.home_team }
                </div>
                <div className="column">
                  { game.league.toUpperCase() }
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  { this.notificationTable(game) }
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default AdminUpcomingNotifications
