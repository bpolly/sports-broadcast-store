import React, { Component } from 'react'
import FavoriteTeamSelect from './FavoriteTeamSelect'
import '../styles/game_filter_form.scss'
import AuthService from './AuthService'

interface Props {
  favoriteTeams: Team[];
  handleFavoriteTeamChange: (teams: Team[]) => void;
  handleFilterChange: (event: any) => void;
  handleDateChange: (event: any) => void;
}

class GameFilterForm extends Component<Props> {
  auth = new AuthService()

  showFavoriteTeams = (): boolean => {
    return this.auth.isLoggedIn()
  }

  favoriteTeamSelectComponent = () => {
    if(!this.showFavoriteTeams()) { return null }

    const { favoriteTeams, handleFavoriteTeamChange } = this.props
    return(
      <>
        <label className="label">Favorite Teams</label>
        <FavoriteTeamSelect
          favoriteTeams={favoriteTeams}
          handleFavoriteTeamChange={handleFavoriteTeamChange} />
      </>
    )
  }

  favoriteTeamOnlyCheckboxComponent = () => {
    if(!this.showFavoriteTeams()) { return null }

    return(
      <>
        <div className="field flex-no-grow">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" name="favorite-teams-only" onChange={this.props.handleFilterChange} style={{marginRight: "10px"}} />
              Show only favorite teams
            </label>
          </div>
        </div>
      </>
    )
  }

  render() {
    return(
      <div id="game-filter-form">
        <div className="field flex-no-grow">
          <label className="label">League</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="league" onChange={this.props.handleFilterChange}>
                <option value=""></option>
                <option value="mlb">MLB</option>
                <option value="nba">NBA</option>
                <option value="nfl">NFL</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field flex-no-grow">
          <label className="label">TV Network</label>
          <div className="control">
            <input type="text" name="tv_networks" placeholder="ESPN" onChange={this.props.handleFilterChange} className="input"/>
          </div>
        </div>

        <div className="field flex-no-grow">
          <label className="label">Team</label>
          <div className="control">
            <input type="text" name="team" placeholder="Cavaliers" onChange={this.props.handleFilterChange} className="input"/>
          </div>
        </div>

        <div className="field flex-no-grow">
          <label className="label">Date Range</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="date" onChange={this.props.handleDateChange} defaultValue="3-day">
                <option value="1-day">Today</option>
                <option value="2-day">Tomorrow</option>
                <option value="3-day">3 Days</option>
                <option value="1-week">1 Week</option>
                <option value="1-month">1 Month</option>
                <option value="1-year">1 Year</option>
              </select>
            </div>
          </div>
        </div>

        { this.favoriteTeamOnlyCheckboxComponent() }

        { this.favoriteTeamSelectComponent() }
      </div>
    )
  }
}

export default GameFilterForm
