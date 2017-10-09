import React, { Component } from 'react';
import '../styles/game_card.css';

class GameCard extends Component {
  render() {
    return (
      <div className="game-card-container">
        <div className="game-card">
          Team 1
          <br/>
          Team 2
          <br/>
          Time
        </div>
      </div>
    );
  }
}

export default GameCard;
