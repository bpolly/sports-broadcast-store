import React, { Component } from 'react';
import logo from '../images/sportcasts-logo.png';
import '../styles/league_row.css';
import GameCard from './GameCard';

class LeagueRow extends Component {
  render() {
    return (
      <div className="league-row-container">
        <span class="league-name">{ this.props.leagueName }</span>
        <div className="league-row flexbox-row">
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

export default LeagueRow;
