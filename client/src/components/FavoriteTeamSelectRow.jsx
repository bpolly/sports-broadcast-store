import React, { Component } from 'react';
import '../styles/favorite_team_select_row.css';

class FavoriteTeamSelectRow extends Component {
  render(){
    const { team, favoriteTeamSlugs } = this.props;
    return(
      <div className="favorite-team-select-row" onClick={() => this.props.handleFavoriteTeamChange(team)}>
        <div className="favorite-team-star">
          <i className={"fa fa-star" + (favoriteTeamSlugs.includes(team.slug) ? '' : '-o')} aria-hidden="true"></i>
        </div>
        <div className="favorite-team-name">{ team.name }</div>
      </div>
    );
  }
}

export default FavoriteTeamSelectRow;
