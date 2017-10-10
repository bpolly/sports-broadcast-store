import React, { Component } from 'react';
import logo from '../images/sportcasts-logo.png';
import '../styles/league_column.css';
import GameCard from './GameCard';

class LeagueColumn extends Component {
  render() {
    return (
      <div className="league-column-container">
        <h1 class="title league-name has-text-centered">{ this.props.leagueName }</h1>
        <div className="league-column flexbox-column">
          <br/>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />

        </div>
      </div>
    );
  }
}

export default LeagueColumn;
