import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../styles/favorite_team_select.css';

class FavoriteTeamSelect extends Component {
  constructor() {
    super();
    this.state = {
      teams: []
    };
  }

  generateTeamOptions = () => {
    return this.state.teams.map(function(team) {
      let tmp = {}
      tmp['value'] = team.slug;
      tmp['label'] = team.name;
      tmp['className'] = 'favorite-team-option'
      return tmp;
    });
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
    const teamOptions = this.generateTeamOptions();
    return(
      <div id="favorite-team-select-container flex-grow">
        <label className="label">Favorite Teams</label>
        <Select
          name="favorite-team-multiselect"
          value={ favoriteTeamSlugs }
          onChange={ handleFavoriteTeamChange }
          options={ teamOptions }
          multi={true}
          closeOnSelect={false}
        />
      </div>
    );
  }
}

export default FavoriteTeamSelect;
