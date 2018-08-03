import React, { Component } from 'react'
import { generateTeamOptions } from '../utilities.js'
import axios from 'axios'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import '../styles/favorite_team_select.css'

class FavoriteTeamSelect extends Component {
  state = {
      teams: []
  }

  componentDidMount(){
    axios.get('/teams')
    .then(response => {
      this.setState({
        teams: response.data || []
      })
    })
  }

  render(){
    const { teams } = this.state
    const { favoriteTeams, handleFavoriteTeamChange } = this.props
    const teamOptions = generateTeamOptions(this.state.teams)
    const favoriteTeamSlugs = favoriteTeams.map((team) => team['slug'])

    return(
      <div id="favorite-team-select-container flex-grow">
        <label className="label">Favorite Teams</label>
        <Select
          className="favorite-team-select-multiple"
          name="favorite-team-multiselect"
          value={ favoriteTeamSlugs }
          onChange={ handleFavoriteTeamChange }
          options={ teamOptions }
          multi={true}
          closeOnSelect={false}
        />
      </div>
    )
  }
}

export default FavoriteTeamSelect
