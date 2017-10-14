import React, { Component } from 'react';
// import '../styles/game_card.css';
import GameRow from './GameRow';
import Loading from './Loading';
import moment from 'moment-timezone';

class GameTable extends Component {
  render() {
    const { games } = this.props;
    if(!this.props.games) {
      return(
        <Loading />
      );
    }
    return (
      <table className="table is-striped">
        <thead>
          <tr>
            <th>Date</th>
            {console.log(moment.tz.guess())}
            <th>Time ({moment().tz(moment.tz.guess()).format('z')})</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>TV Networks</th>
            <th>League</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { games.map(game => <GameRow key={game.id} game={game} favoriteTeams={['cavaliers']}/>) }
        </tbody>
      </table>
    );
  }
}

export default GameTable;
