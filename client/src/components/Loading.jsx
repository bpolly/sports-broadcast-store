import React, { Component } from 'react';
import '../styles/loading.css';

class Loading extends Component {
  render(){
    return(
      <div className="loading">
        <span>Loading Game Data</span>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
      </div>
    );
  }
}

export default Loading;
