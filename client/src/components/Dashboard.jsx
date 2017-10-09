import React, { Component } from 'react';
import logo from '../images/sportcasts-logo.png';
import '../styles/dashboard.css';
import LeagueRow from './LeagueRow';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <img id="logo" src={logo} alt="Logo" />
        </header>

        {["MLB", "NBA", "NFL"].map((name) => <LeagueRow leagueName={name} />)}

      </div>
    );
  }
}

export default Dashboard;
