import React, { Component } from 'react'
// import '../styles/dashboard.scss'
import GameTable from './GameTable'
import GameFilterForm from './GameFilterForm'
import axios from 'axios'
import moment from 'moment-timezone'

interface State {
  games: Game[]
  filters: object
  loading: boolean
}

interface FilterType {
  league?: string
  team?: string
  tv_networks?: string
}

class Dashboard extends Component<any, State> {
  state = {
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
    console.log(this.props.favoriteTeams)
    console.log(this.props.favoriteTeams.length)
    return this.props.favoriteTeams.map((team) => team['slug'])
  }

  filteredGames = () => {
    const { games, filters } = this.state

    return Object.keys(filters).reduce((games, filterName) => {
      return games.filter((game: Game) => {
        if (filters[filterName]) {
          if (typeof game[filterName] === 'string' || filterName === 'team') {
            let gameAttrText = ''
            let filterText = filters[filterName].toLowerCase()
            if(filterName === 'team'){
              gameAttrText = (game['home_team']['name'] + ' ' + game['away_team']['name']).toLowerCase()
            } else {
              gameAttrText = game[filterName].toLowerCase()
            }

            return gameAttrText.indexOf(filterText) !== -1
          }
          else if (filters['favorite-teams-only'] === true) {
            return (this.favoriteTeamSlugs().includes(game.home_team.slug) || this.favoriteTeamSlugs().includes(game.away_team.slug))
          } else {
            return game[filterName] === filters[filterName]
          }
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
