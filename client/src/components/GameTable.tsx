import '../styles/game_table.scss'
import GameRow from './GameRow'
import Loading from './Loading'
import moment from 'moment-timezone'

interface Props {
  games: Game[]
  favoriteTeamSlugs: string[]
  loading: boolean
}

function GameTable(props: Props) {
  const { games, favoriteTeamSlugs, loading } = props

  if (!games || loading) {
    return <Loading />
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
        {games.map((game) => (
          <GameRow
            key={game.id}
            game={game}
            favoriteTeamSlugs={favoriteTeamSlugs}
          />
        ))}
      </tbody>
    </table>
  )
}

export default GameTable
