import { useState, useEffect } from 'react'
// import '../styles/dashboard.scss'
import GameTable from './GameTable'
import GameFilterForm from './GameFilterForm'
import axios from 'axios'
import moment from 'moment-timezone'
import { dashboardTourGuide } from '../tourGuides'
import { debounce } from 'lodash-es'

interface FilterType {
  league?: string;
  team?: string;
  tv_networks?: string;
}

function Dashboard(props) {
  const [games,   setGames]   = useState<Game[]>([])
  const [filters, setFilters] = useState<FilterType>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGames(null)
  }, [])

  const fetchGames = (_endDate) => {
    setLoading(true)
    axios.get(`/games${_endDate ? `?end_date=${_endDate}` : ''}`)
    .then(response => {
      setGames(response.data || [])
      setLoading(false)
    })
  }

  const handleDateChange = (event) => {
    const { value } = event.target
    const dateValue = value.match(/(\d)-(\w+)/)
    if(value.length !== 0){
      let numUnits = parseInt(dateValue[1], 10)
      let unitName = dateValue[2]
      const targetDate = moment().add(numUnits, unitName).subtract(1, 'day').endOf('day')
      fetchGames(targetDate)
    }
  }

  const handleFilterChange = (event) => {
    const { name } = event.target
    let { value } = event.target
    if(name === 'favorite-teams-only') {
      value = event.target.checked
    }
    const updateState = () => {
      setFilters({
        ...filters,
        [name]: value,
      })
    }

    debounce(updateState, 500, {
      'leading': true,
      'trailing': false
    })()
  }

  const favoriteTeamSlugs = () => {
    return props.favoriteTeams.map((team) => team['slug'])
  }

  const filteredGames = () => {
    return Object.keys(filters).reduce((games, filterName) => {
      return games.filter((game: Game) => {
        if (['league', 'tv_networks'].includes(filterName)) {
          const filterText = filters[filterName].toLowerCase()
          const gameAttrText = game[filterName].toLowerCase()

          return gameAttrText.includes(filterText)
        }
        else if (filterName === 'team' && filters.team && filters.team.length > 0) {
          const filterText = filters.team.toLowerCase()
          const teamNames = [
            game['home_team']['name'],
            game['away_team']['name']
          ].join(' ').toLowerCase()

          return teamNames.includes(filterText)
        }
        else if (filterName == 'favorite-teams-only') {
          if(filters['favorite-teams-only'] === false) { return true }

          const gameTeams = [game.home_team.slug, game.away_team.slug]
          const favoriteTeams = favoriteTeamSlugs()

          // true if either game team are a favorite team
          return gameTeams.some(t => favoriteTeams.includes(t))
        } else if (filters[filterName].length > 0) {
          return game[filterName] === filters[filterName]
        }

        return true
      })
    }, games)
  }

  return (
    <div className="dashboard-container">
      <div className="columns">
        <div className="column is-one-quarter">
          { dashboardTourGuide() }
          <GameFilterForm
            handleFilterChange={handleFilterChange}
            handleDateChange={handleDateChange}
            handleFavoriteTeamChange={props.handleFavoriteTeamChange}
            favoriteTeams={props.favoriteTeams}/>
        </div>
        <div className="column">
          <GameTable
            games={filteredGames()}
            favoriteTeamSlugs={favoriteTeamSlugs()}
            loading={loading}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
