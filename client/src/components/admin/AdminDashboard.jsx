import React, { Component } from 'react';
import '../../styles/admin/dashboard.scss';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import moment from 'moment-timezone';

class AdminDashboard extends Component {
  render() {
    return(
      <div id="admin-dashboard">
        <div class="columns">
          <div class="column is-one-quarter">
            <AdminSidebar />
          </div>
          { this.props.selectedPage }
          </div>
      </div>
    )
  }
}

export default AdminDashboard;
