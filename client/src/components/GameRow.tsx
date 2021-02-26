import React, { Component, CSSProperties } from 'react'
import moment from 'moment-timezone'

interface Props {
  game: Game;
  favoriteTeamSlugs: string[];
}

function GameRow(props: Props) {
  const isFavoriteTeam = (game: Game) => {
    let teamSlugs = props.favoriteTeamSlugs || []
    return (teamSlugs.includes(game.home_team.slug) || teamSlugs.includes(game.away_team.slug))
  }

  const getDateColumn = () => {
    const { game } = props
    let gameDate = moment(game.date).tz(moment.tz.guess())
    let todayDate = moment().tz(moment.tz.guess())
    let tomorrowDate = moment().tz(moment.tz.guess()).add(1, 'day')
    if(gameDate.isSame(todayDate, 'day')){
      return <td><span className="tag is-warning">Today</span></td>
    }
    else if (gameDate.isSame(tomorrowDate, 'day')){
      return <td><span className="tag is-primary">Tomorrow</span></td>
    }
    else {
      return <td>{ moment(game.date).tz(moment.tz.guess()).format('dddd MMM Do') }</td>
    }
  }

  const dateCol = getDateColumn()

  const starStyling: CSSProperties = {
    visibility: isFavoriteTeam(props.game) ? 'visible' : 'hidden',
    color: '#fc6066'
  }

  return (
    <tr>
      { dateCol }
      <td>
        { moment(props.game.date).tz(moment.tz.guess()).format('h:mma') }
      </td>
      <td className="capitalize">
        { props.game.home_team.name }
      </td>
      <td className="capitalize">
        { props.game.away_team.name }
      </td>
      <td>
        { props.game.tv_networks }
      </td>
      <td>
        { props.game.league.toUpperCase() }
      </td>
      <td>
        <i className="fa fa-star" style={starStyling}></i>
      </td>
    </tr>
  )
}

export default GameRow
