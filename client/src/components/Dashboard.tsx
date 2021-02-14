import React, { Component } from 'react'
// import '../styles/dashboard.scss'
import GameTable from './GameTable'
import GameFilterForm from './GameFilterForm'
import axios from 'axios'
import moment from 'moment-timezone'
import { dashboardTourGuide } from '../tourGuides'

interface State {
  games: Game[];
  filters: FilterType;
  loading: boolean;
}

interface FilterType {
  league?: string;
  team?: string;
  tv_networks?: string;
}

class Dashboard extends Component<any, State> {
  state: State = {
    games: [],
    filters: {},
    loading: false
  }

  componentDidMount() {
    this.fetchGames(null)
  }

  fetchGames = (_endDate) => {
    this.setState({ loading: true })
    axios.get(`/games${_endDate ? `?end_date=${_endDate}` : ''}`)
    .then(response => {
      this.setState({
        games: (response.data || []),
        loading: false
      })
    })
  }

  handleDateChange = (event) => {
    const { value } = event.target
    const dateValue = value.match(/(\d)-(\w+)/)
    if(value.length !== 0){
      let numUnits = parseInt(dateValue[1], 10)
      let unitName = dateValue[2]
      const targetDate = moment().add(numUnits, unitName).subtract(1, 'day').endOf('day')
      this.fetchGames(targetDate)
    }
  }

  handleFilterChange = (event) => {
    const { name } = event.target
    let { value } = event.target
    if(name === 'favorite-teams-only') {
      value = event.target.checked
    }

    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }))
  }

  favoriteTeamSlugs = () => {
    console.log('== favoriteTeamSlugs() ==')
    console.log(this.props.favoriteTeams)
    console.log(this.props.favoriteTeams.length)
    return this.props.favoriteTeams.map((team) => team['slug'])
  }

  filteredGames = () => {
    const { games, filters } = this.state

    return Object.keys(filters).reduce((games, filterName) => {
      return games.filter((game: Game) => {
        if (['league', 'tv_networks'].includes(filterName)) {
          const filterText = filters[filterName].toLowerCase()
          const gameAttrText = game[filterName].toLowerCase()

          return gameAttrText.includes(filterText)
        }
        else if (filterName === 'team' && filters.team) {
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
          const favoriteTeams = this.favoriteTeamSlugs()

          // true if either game team are a favorite team
          return gameTeams.some(t => favoriteTeams.includes(t))
        } else {
          return game[filterName] === filters[filterName]
        }

        return true
      })
    }, games)
  }

  render() {
    const { loading } = this.state

    return (
      <div className="dashboard-container">
        <div className="columns">
          <div className="column is-one-quarter">
            { dashboardTourGuide() }
            <GameFilterForm
              handleFilterChange={this.handleFilterChange}
              handleDateChange={this.handleDateChange}
              handleFavoriteTeamChange={this.props.handleFavoriteTeamChange}
              favoriteTeams={this.props.favoriteTeams}/>
          </div>
          <div className="column">
            <GameTable
              games={this.filteredGames()}
              favoriteTeamSlugs={this.favoriteTeamSlugs()}
              loading={loading}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
