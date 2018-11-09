import React, { Component } from 'react'
import { generateTeamOptions } from '../utilities.js'
import axios from 'axios'
import Select from 'react-select'
import '../styles/favorite_team_select.scss'

interface State {
  teams: Team[]
}

interface Props {
  favoriteTeams: Team[]
  handleFavoriteTeamChange: (teams: Team[]) => void
}

class FavoriteTeamSelect extends Component<Props, State> {
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
    const teamOptions = generateTeamOptions(teams)
    const favoriteTeamSlugs = generateTeamOptions(favoriteTeams)

    return(
      <div id="favorite-team-select-container flex-grow">
        <Select
          className="favorite-team-select-multiple"
          name="favorite-team-multiselect"
          value={ favoriteTeamSlugs }
          onChange={ handleFavoriteTeamChange }
          options={ teamOptions }
          isMulti={true}
          isClearable={false}
          closeMenuOnSelect={true}
        />
      </div>
    )
  }
}

export default FavoriteTeamSelect
