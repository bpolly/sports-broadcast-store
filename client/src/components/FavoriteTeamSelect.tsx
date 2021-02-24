import React, { useState, useEffect } from 'react'
import { generateTeamOptions } from '../utilities'
import axios from 'axios'
import Select from 'react-select'
import '../styles/favorite_team_select.scss'

interface Props {
  favoriteTeams: Team[];
  handleFavoriteTeamChange: (teams: Team[]) => void;
}

function FavoriteTeamSelect(props: Props) {
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    axios.get('/teams')
    .then(response => {
      setTeams(response.data || [])
    })
  }, [])

  const { favoriteTeams, handleFavoriteTeamChange } = props
  const teamOptions = generateTeamOptions(teams)
  const favoriteTeamSlugs = generateTeamOptions(favoriteTeams)

  return(
    <div id="favorite-team-select-container" className="flex-grow">
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

export default FavoriteTeamSelect
