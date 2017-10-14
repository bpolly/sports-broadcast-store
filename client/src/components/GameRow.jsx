import React, { Component } from 'react';
// import '../styles/game_card.css';
import moment from 'moment-timezone';

class GameRow extends Component {
  isFavoriteTeam = (game) => {
    const fullTeamText = game.home_team + ' ' + game.away_team;
    return this.props.favoriteTeams.filter((team) => fullTeamText.indexOf(team) !== -1).length > 0;
  }

  render() {
    const { game } = this.props;
    return (
      <tr>
        <td>
          { moment(game.date).tz(moment.tz.guess()).format('dddd MMM Do') }
        </td>
        <td>
          { moment(game.date).tz(moment.tz.guess()).format('h:mma') }
        </td>
        <td>
          { game.home_team }
        </td>
        <td>
          { game.away_team }
        </td>
        <td>
          { game.tv_networks }
        </td>
        <td>
          { game.league }
        </td>
        <td>
          {this.isFavoriteTeam(game) ? <i className="fa fa-star"></i> : null}

        </td>
      </tr>
    );
  }
}

export default GameRow;
