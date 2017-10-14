import React, { Component } from 'react';

class GameFilterForm extends Component {
  render() {
    return(
      <div>
        <div className="field">
          <label className="label">League</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="league" onChange={this.props.handleFilterChange}>
                <option value=""></option>
                <option value="mlb">MLB</option>
                <option value="nba">NBA</option>
                <option value="nfl">NFL</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">TV Network</label>
          <div className="control">
            <input type="text" name="tv_networks" placeholder="ESPN" onChange={this.props.handleFilterChange} className="input"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Team</label>
          <div className="control">
            <input type="text" name="team" placeholder="Cavaliers" onChange={this.props.handleFilterChange} className="input"/>
          </div>
        </div>
      </div>
    );
  }
}

export default GameFilterForm;
