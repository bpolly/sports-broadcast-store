import React, { Component } from 'react';
import '../../styles/admin/dashboard.scss';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import moment from 'moment-timezone';

class AdminDashboard extends Component {
  render() {
    return(
      <div id="admin-dashboard">
        <AdminSidebar />
      </div>
    )
  }
}

export default AdminDashboard;
