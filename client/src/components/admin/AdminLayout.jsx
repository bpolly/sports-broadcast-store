import React, { Component } from 'react';
import '../../styles/admin/layout.scss';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import moment from 'moment-timezone';

class AdminLayout extends Component {
  render() {
    return(
      <div id="admin-layout">
        <div class="columns">
          <div class="column is-one-fifth">
            <AdminSidebar />
          </div>
          <div class="column">
          { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default AdminLayout;
