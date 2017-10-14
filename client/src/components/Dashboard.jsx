import React, { Component } from 'react';
// import '../styles/dashboard.css';
import GameTable from './GameTable';
import GameFilterForm from './GameFilterForm';
import Loading from './Loading';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      games: undefined,
      filters: {},
    };
  }

  componentDidMount() {
    axios.get('/games')
    .then(response => {
      console.log(response);
      this.setState({
        games: response.data || []
      });
    })
  }

  handleFilterChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  }

  filteredGames = () => {
    const { games, filters } = this.state;

    return Object.keys(filters).reduce((games, filterName) => {
      return games.filter((game) => {
        if (filters[filterName]) {
          if (typeof game[filterName] === 'string' || filterName === 'team') {
            let gameAttrText = '';
            let filterText = filters[filterName].toLowerCase();
            if(filterName === 'team'){
              gameAttrText = (game['home_team'] + ' ' + game['away_team']).toLowerCase();
            } else {
              gameAttrText = game[filterName].toLowerCase();
            }

            return gameAttrText.indexOf(filterText) !== -1;
          } else {
            return game[filterName] === filters[filterName];
          }
        }

        return true;
      });
    }, games);
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="columns">
          <div className="column is-one-quarter">
            <GameFilterForm
              handleFilterChange={this.handleFilterChange}/>
          </div>
          <div className="column">
            <GameTable games={this.filteredGames()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
