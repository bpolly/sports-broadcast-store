import React, { Component } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import moment from 'moment-timezone'
import AuthService from '../AuthService'
import { chunkArrayInGroups } from '../../utilities'

interface State {
  gameListByDate: Object,
  upcomingThresholdValue: string
}

class AdminUpcomingNotifications extends Component<any, State> {
  state = {
    gameListByDate: {},
    upcomingThresholdValue: '120'
  }
  auth = new AuthService()

  componentWillMount() {
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
        gameListByDate: response.data
      })
    })
  }

  handleThresholdChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      { upcomingThresholdValue: e.currentTarget.value },
      this.fetchUpcomingNotifications
    )
  }

  getDateClass = (game: GameWithNotifications) => {
    let gameDate = moment(game.date).tz(moment.tz.guess())
    let todayDate = moment().tz(moment.tz.guess())
    let tomorrowDate = moment().tz(moment.tz.guess()).add(1, 'day')
    if (gameDate.isSame(todayDate, 'day')) {
      return "is-warning"
    }
    else if (gameDate.isSame(tomorrowDate, 'day')) {
      return "is-primary"
    }
    else {
      return "is-info"
    }
  }

  notificationTable = (game: GameWithNotifications) => {
    if (game.notifications.length == 0) {
      return (
        <div>No notifications.</div>
      )
    }
    else {
      return (
        <table className="table" style={{ backgroundColor: 'transparent' }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email?</th>
              <th>Phone?</th>
            </tr>
          </thead>
          <tbody>
            {
              game.notifications.map((notification: Preference) =>
                <tr key={notification.id}>
                  <td>{notification.user.id}</td>
                  <td>{notification.email ? "Yes" : "No"}</td>
                  <td>{notification.phone ? "Yes" : "No"}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      )
    }
  }

  gameRows = (gameList: GameWithNotifications[]) => {
    return (
      chunkArrayInGroups(gameList, 3).map((gameChunk: GameWithNotifications[], index) =>
        <div className="columns" key={index}>
          {
            gameChunk.map((game: GameWithNotifications) =>
              <div className="column is-4" key={game.id}>
                <article className={`message ${this.getDateClass(game)}`}>
                  <div className="message-header" style={{ display: 'flow-root' }}>
                    <p>
                      <span className="has-text-weight-semibold is-pulled-left">{moment(game.date).tz(moment.tz.guess()).format('h:mma')}</span>
                      <span className="is-pulled-right capitalize">{game.away_team} at {game.home_team}</span>
                    </p>
                  </div>
                  <div className="message-body">
                    {this.notificationTable(game)}
                  </div>
                </article>
              </div>
            )
          }
        </div>
      )
    )
  }

  dateGroup = (date: string, gameList: GameWithNotifications[]) => {
    return (
      <section className="section" key={date}>
        <div className="container">
          <h1 className="title is-3">{moment(date).format('MMMM Do')}</h1>
          <h2 className="subtitle is-4">{moment(date).format('dddd')}</h2>
          {this.gameRows(gameList)}
        </div>
      </section>
    )
  }

  render() {
    const { gameListByDate } = this.state
    return (
      <div id="admin-users">
        <h3 className="title is-3">Upcoming Notifications</h3>
        <div className="field">
          <label className="label">Minute Threshold</label>
          <div className="control">
            <input type="text" value={this.state.upcomingThresholdValue} onChange={this.handleThresholdChange} />
          </div>
          <p className="help">Current Count: {Object.keys(gameListByDate).length}</p>
        </div>

        {
          Object.keys(gameListByDate).map((date: string, index) => {
            return (this.dateGroup(date, gameListByDate[date]))
          })
        }
      </div>
    )
  }
}

export default AdminUpcomingNotifications
