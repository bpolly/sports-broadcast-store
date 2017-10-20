import React, { Component } from 'react';
import '../styles/game_table.css';
import GameRow from './GameRow';
import Loading from './Loading';
import moment from 'moment-timezone';

class GameTable extends Component {
  render() {
    const { games, favoriteTeamSlugs } = this.props;
    if(!this.props.games) {
      return(
        <Loading />
      );
    }
    return (
      <table id="game-table" className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time ({moment().tz(moment.tz.guess()).format('z')})</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>TV Networks</th>
            <th>League</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { games.map(game => <GameRow key={game.id} game={game} favoriteTeamSlugs={favoriteTeamSlugs}/>) }
        </tbody>
      </table>
    );
  }
}

export default GameTable;
