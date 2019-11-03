import React, { Component, useState, useEffect } from 'react'
import '../../styles/admin/users.scss'
import axios from 'axios'
import moment from 'moment-timezone'
import AuthService from '../AuthService'
import { chunkArrayInGroups } from '../../utilities'

const AdminUpcomingNotifications: React.FC = () => {
  const [gameListByDate, setGameListByDate] = useState<GameWithNotificationsList>({})
  const [upcomingThresholdValue, setupcomingThresholdValue] = useState<string>('120')
  const auth = new AuthService()

  useEffect(() => {
    fetchUpcomingNotifications()
  }, [upcomingThresholdValue])

  const fetchUpcomingNotifications = () => {
    axios.get('/admin/upcoming_notifications',
      {
        params: { minute_threshold: upcomingThresholdValue },
        headers: { Authorization: auth.getToken() }
      }
    ).then(response => {
      setGameListByDate(response.data)
    })
  }

  const handleThresholdChange = (e: React.FormEvent<HTMLInputElement>) => {
    setupcomingThresholdValue(e.currentTarget.value)
  }

  const getDateClass = (game: GameWithNotifications) => {
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


  const notificationTable = (game: GameWithNotifications) => {
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

  const singleGameElement = (game: GameWithNotifications) => {
    return(
      <div className="column is-4" key={game.id}>
        <article className={`message ${getDateClass(game)}`}>
          <div className="message-header" style={{ display: 'flow-root' }}>
            <p>
              <span className="has-text-weight-semibold is-pulled-left">{moment(game.date).tz(moment.tz.guess()).format('h:mma')}</span>
              <span className="is-pulled-right capitalize">{game.away_team} at {game.home_team}</span>
            </p>
          </div>
          <div className="message-body">
            {notificationTable(game)}
          </div>
        </article>
      </div>

    )
  }

  const gameRows = (gameList: GameWithNotifications[]) => {
    return (
      chunkArrayInGroups(gameList, 3).map((gameChunk: GameWithNotifications[], index) =>
        <div className="columns" key={index}>
          { gameChunk.map((game: GameWithNotifications) => singleGameElement(game)) }
        </div>
      )
    )
  }

  const dateGroup = (date: string, gameList: GameWithNotifications[]) => {
    return (
      <section className="section" key={date}>
        <div className="container is-fluid" style={{marginLeft: 0}}>
          <h1 className="title is-3">{moment(date).format('MMMM Do')}</h1>
          <h2 className="subtitle is-4">{moment(date).format('dddd')}</h2>
          {gameRows(gameList)}
        </div>
      </section>
    )
  }

  return (
    <div id="admin-users">
      <h3 className="title is-3">Upcoming Notifications</h3>
      <div className="field">
        <label className="label">Minute Threshold</label>
        <div className="control">
          <input type="text" value={upcomingThresholdValue} onChange={handleThresholdChange} />
        </div>
        <p className="help">Current Count: {Object.keys(gameListByDate).length}</p>
      </div>

      {
        Object.keys(gameListByDate).map((date: string, index) => {
          return (dateGroup(date, gameListByDate[date]))
        })
      }
    </div>
  )
}

export default AdminUpcomingNotifications
