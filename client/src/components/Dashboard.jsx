import React, { Component } from 'react';
import logo from '../images/sportcasts-logo.png';
import '../styles/dashboard.css';
import Navbar from './Navbar';
import LeagueColumn from './LeagueColumn';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div class="flexbox-row">
          {["MLB", "NBA", "NFL"].map((name) => <LeagueColumn leagueName={name} />)}
        </div>


      </div>
    );
  }
}

export default Dashboard;
