import React, { Component } from 'react';
// import '../styles/game_card.css';
import moment from 'moment-timezone';

class GameRow extends Component {
  isFavoriteTeam = (game) => {
    let teamSlugs = this.props.favoriteTeamSlugs || [];
    return (teamSlugs.includes(game.home_team.slug) || teamSlugs.includes(game.away_team.slug))
  }

  render() {
    const { game } = this.props;
    const starStyling = {
      visibility: this.isFavoriteTeam(game) ? 'visible' : 'hidden',
      color: '#fc6066'
    };
    return (
      <tr>
        <td>
          { moment(game.date).tz(moment.tz.guess()).format('dddd MMM Do') }
        </td>
        <td>
          { moment(game.date).tz(moment.tz.guess()).format('h:mma') }
        </td>
        <td>
          { game.home_team.name }
        </td>
        <td>
          { game.away_team.name }
        </td>
        <td>
          { game.tv_networks }
        </td>
        <td>
          { game.league }
        </td>
        <td>
          <i className="fa fa-star" style={starStyling}></i>
        </td>
      </tr>
    );
  }
}

export default GameRow;
