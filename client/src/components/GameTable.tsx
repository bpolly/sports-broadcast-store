import React, { Component } from 'react'
import '../styles/game_table.scss'
import GameRow from './GameRow'
import Loading from './Loading'
import moment from 'moment-timezone'

interface GameTableProps {
  games: Array<Game>
  favoriteTeamSlugs: Array<string>
  loading: boolean
}


class GameTable extends Component<GameTableProps> {
  render() {
    const { games, favoriteTeamSlugs, loading } = this.props
    if(!this.props.games || loading) {
      return(
        <Loading />
      )
    }
    return (
      <table id="game-table" className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time ({moment().tz(moment.tz.guess()).format('z')})</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>TV Networks</th>
            <th>League</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { games.map(game => <GameRow key={game.id} game={game} favoriteTeamSlugs={favoriteTeamSlugs}/>) }
        </tbody>
      </table>
    )
  }
}

export default GameTable
