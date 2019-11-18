import React, { Component, useState, useEffect } from 'react'
import { generateTeamOptions } from '../utilities'
import axios from 'axios'
import Select from 'react-select'
import '../styles/favorite_team_select.scss'

interface Props {
  favoriteTeams: Team[]
  handleFavoriteTeamChange: (teams: TeamSelectOption[]) => void
}

const FavoriteTeamSelect: React.FC<Props> = (props) => {
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    const getTeams = async () => {
      let fetchedTeams = await axios.get('/teams')
      setTeams(fetchedTeams.data || [])
    }
    getTeams()
  }, [])

  const { favoriteTeams, handleFavoriteTeamChange } = props
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
        isMulti={ true }
        isClearable={ false }
        closeMenuOnSelect={ true }
      />
    </div>
  )
}

export default FavoriteTeamSelect
