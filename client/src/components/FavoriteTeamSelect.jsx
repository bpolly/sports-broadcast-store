import React, { Component } from 'react';
import axios from 'axios';
import '../styles/favorite_team_select.css';
import FavoriteTeamSelectRow from './FavoriteTeamSelectRow';


class FavoriteTeamSelect extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      favoriteTeamSlugs: []
    };
  }

  handleFavoriteTeamChange = (team) => {
    console.log('clicked');
    console.log(team);
    const favoriteTeamSlugs = this.state.favoriteTeamSlugs;
    console.log('fave');
    console.log(favoriteTeamSlugs);
    if(favoriteTeamSlugs.includes(team.slug)){
      var i = favoriteTeamSlugs.indexOf(team.slug);
      this.setState({
        favoriteTeamSlugs: [...favoriteTeamSlugs.slice(0,i), ...favoriteTeamSlugs.slice(i+1)]
      });
    }
    else {
      this.setState({
        favoriteTeamSlugs: favoriteTeamSlugs.concat(team.slug)
      });
    }
  }

  componentWillMount(){
    axios.get('/teams')
    .then(response => {
      console.log(response);
      this.setState({
        teams: response.data || []
      });
    })
  }

  render(){
    const { teams, favoriteTeamSlugs } = this.state;
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
                                    handleFavoriteTeamChange={this.handleFavoriteTeamChange} />)}
          <p className="favorite-team-select-league">NBA</p>
          {nbaTeams.map((team) => <FavoriteTeamSelectRow
                                    key={team.id}
                                    team={team}
                                    favoriteTeamSlugs={favoriteTeamSlugs}
                                    handleFavoriteTeamChange={this.handleFavoriteTeamChange} />)}
          <p className="favorite-team-select-league">MLB</p>
          {mlbTeams.map((team) => <FavoriteTeamSelectRow
                                    key={team.id}
                                    team={team}
                                    favoriteTeamSlugs={favoriteTeamSlugs}
                                    handleFavoriteTeamChange={this.handleFavoriteTeamChange} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteTeamSelect;
