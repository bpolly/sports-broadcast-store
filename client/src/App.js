import React, { Component } from 'react';
import './styles/bulma.css';
import './styles/font-awesome-4.7.0/css/font-awesome.min.css';

import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Dashboard />
      </div>
    );
  }
}

export default App;
