import React, { Component } from 'react';
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
    let dateCol = null;
    if(moment(game.date).tz(moment.tz.guess()).isSame(moment().tz(moment.tz.guess()), 'day')){
      dateCol = <td><span className="tag is-warning">Today</span></td>;
    } else {
      dateCol = <td>{ moment(game.date).tz(moment.tz.guess()).format('dddd MMM Do') }</td>;
    }
    return (
      <tr>
        { dateCol }
        <td>
          { moment(game.date).tz(moment.tz.guess()).format('h:mma') }
        </td>
        <td className="capitalize">
          { game.home_team.name }
        </td>
        <td className="capitalize">
          { game.away_team.name }
        </td>
        <td>
          { game.tv_networks }
        </td>
        <td>
          { game.league.toUpperCase() }
        </td>
        <td>
          <i className="fa fa-star" style={starStyling}></i>
        </td>
      </tr>
    );
  }
}

export default GameRow;
