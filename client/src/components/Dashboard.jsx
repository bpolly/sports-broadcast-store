import React, { Component } from 'react';
// import '../styles/dashboard.css';
import GameTable from './GameTable';
import GameFilterForm from './GameFilterForm';
import axios from 'axios';
import moment from 'moment-timezone';
import cookie from 'react-cookies';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      games: undefined,
      filters: {},
      favoriteTeamSlugs: []
    };
  }

  componentWillMount() {
    this.setState({
      favoriteTeamSlugs: cookie.load('favoriteTeamSlugs') || []
    });
  }

  componentDidMount() {
    this.fetchGames();
  }

  fetchGames = (_endDate) => {
    axios.get(`/games${_endDate ? `?end_date=${_endDate}` : ''}`)
    .then(response => {
      this.setState({
        games: response.data || []
      });
    })
  }

  handleDateChange = (event) => {
    const { value } = event.target;
    const dateValue = value.match(/(\d)-(\w+)/);
    if(value.length !== 0){
      let numUnits = parseInt(dateValue[1]);
      let unitName = dateValue[2];
      const targetDate = moment().add(numUnits, unitName);
      this.fetchGames(targetDate);
    }
  }

  handleFilterChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    if(name === 'favorite-teams-only') {
      value = event.target.checked;
    }

    this.setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  }

  handleFavoriteTeamChange = (team) => {
    const favoriteTeamSlugs = this.state.favoriteTeamSlugs;
    if(favoriteTeamSlugs.includes(team.slug)){
      var i = favoriteTeamSlugs.indexOf(team.slug);
      this.setState({
        favoriteTeamSlugs: [...favoriteTeamSlugs.slice(0,i), ...favoriteTeamSlugs.slice(i+1)]
      }, this.saveFavoriteTeamSlugsCookie);
    }
    else {
      this.setState({
        favoriteTeamSlugs: favoriteTeamSlugs.concat(team.slug)
      }, this.saveFavoriteTeamSlugsCookie);
    }
  }

  handleShowOnlyFavoriteTeams = (event) => {
    const { name, value } = event.target;

  }

  saveFavoriteTeamSlugsCookie = () => {
    cookie.save('favoriteTeamSlugs', this.state.favoriteTeamSlugs, { path: '/' })
  }


  filteredGames = () => {
    const { games, filters, favoriteTeamSlugs } = this.state;

    return Object.keys(filters).reduce((games, filterName) => {
      return games.filter((game) => {
        if (filters[filterName]) {
          if (typeof game[filterName] === 'string' || filterName === 'team') {
            let gameAttrText = '';
            let filterText = filters[filterName].toLowerCase();
            if(filterName === 'team'){
              gameAttrText = (game['home_team']['name'] + ' ' + game['away_team']['name']).toLowerCase();
            } else {
              gameAttrText = game[filterName].toLowerCase();
            }

            return gameAttrText.indexOf(filterText) !== -1;
          }
          else if (filters['favorite-teams-only'] === true) {
            return (favoriteTeamSlugs.includes(game.home_team.slug) || favoriteTeamSlugs.includes(game.away_team.slug));
          } else {
            return game[filterName] === filters[filterName];
          }
        }

        return true;
      });
    }, games);
  }

  render() {
    const { favoriteTeamSlugs } = this.state;
    return (
      <div className="dashboard-container">
        <div className="columns">
          <div className="column is-one-quarter">
            <GameFilterForm
              handleFilterChange={this.handleFilterChange}
              handleDateChange={this.handleDateChange}
              handleFavoriteTeamChange={this.handleFavoriteTeamChange}
              handleFavoriteTeamChange={this.handleFavoriteTeamChange}
              favoriteTeamSlugs={favoriteTeamSlugs}/>
          </div>
          <div className="column">
            <GameTable
              games={this.filteredGames()}
              handleFavoriteTeamChange={this.handleFavoriteTeamChange}
              favoriteTeamSlugs={favoriteTeamSlugs}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
