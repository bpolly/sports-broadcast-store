import React, { Component } from 'react';
import moment from 'moment-timezone';

class GameRow extends Component {
  isFavoriteTeam = (game) => {
    let teamSlugs = this.props.favoriteTeamSlugs || [];
    return (teamSlugs.includes(game.home_team.slug) || teamSlugs.includes(game.away_team.slug))
  }

  getDateColumn = () => {
    const { game } = this.props;
    let gameDate = moment(game.date).tz(moment.tz.guess());
    let todayDate = moment().tz(moment.tz.guess());
    let tomorrowDate = moment().tz(moment.tz.guess()).add(1, 'day');
    if(gameDate.isSame(todayDate, 'day')){
      return <td><span className="tag is-warning">Today</span></td>;
    }
    else if (gameDate.isSame(tomorrowDate, 'day')){
      return <td><span className="tag is-primary">Tomorrow</span></td>;
    }
    else {
      return <td>{ moment(game.date).tz(moment.tz.guess()).format('dddd MMM Do') }</td>;
    }
  }

  render() {
    const { game } = this.props;
    const dateCol = this.getDateColumn();
    const starStyling = {
      visibility: this.isFavoriteTeam(game) ? 'visible' : 'hidden',
      color: '#fc6066'
    };

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
