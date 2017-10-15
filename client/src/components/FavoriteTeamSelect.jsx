import React, { Component } from 'react';
import axios from 'axios';
import '../styles/favorite_team_select.css';
import FavoriteTeamSelectRow from './FavoriteTeamSelectRow';


class FavoriteTeamSelect extends Component {
  constructor() {
    super();
    this.state = {
      teams: []
    };
  }

  componentWillMount(){
    axios.get('/teams')
    .then(response => {
      this.setState({
        teams: response.data || []
      });
    })
  }

  render(){
    const { teams } = this.state;
    const { favoriteTeamSlugs, handleFavoriteTeamChange } = this.props;
    const nflTeams = teams.filter((team) => team.league === "nfl")
    const nbaTeams = teams.filter((team) => team.league === "nba")
    const mlbTeams = teams.filter((team) => team.league === "mlb")
    return(
      <div className="favorite-team-select-container">
        <div className="field">
          <label className="label">Favorite Teams</label>
          <div className="control favorite-team-select">
          <p className="favorite-team-select-league">NFL</p>
          {nflTeams.map((team) => <FavoriteTeamSelectRow
                                    key={team.id}
                                    team={team}
                                    favoriteTeamSlugs={favoriteTeamSlugs}
                                    handleFavoriteTeamChange={handleFavoriteTeamChange} />)}
          <p className="favorite-team-select-league">NBA</p>
          {nbaTeams.map((team) => <FavoriteTeamSelectRow
                                    key={team.id}
                                    team={team}
                                    favoriteTeamSlugs={favoriteTeamSlugs}
                                    handleFavoriteTeamChange={handleFavoriteTeamChange} />)}
          <p className="favorite-team-select-league">MLB</p>
          {mlbTeams.map((team) => <FavoriteTeamSelectRow
                                    key={team.id}
                                    team={team}
                                    favoriteTeamSlugs={favoriteTeamSlugs}
                                    handleFavoriteTeamChange={handleFavoriteTeamChange} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteTeamSelect;
