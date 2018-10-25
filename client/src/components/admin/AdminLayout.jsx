import React, { Component } from 'react';
import '../../styles/admin/layout.scss';
import AdminSidebar from './AdminSidebar';

class AdminLayout extends Component {
  render() {
    return(
      <div id="admin-layout" className="container is-fluid">
        <div className="columns">
          <div className="column is-one-fifth">
            <AdminSidebar />
          </div>
          <div className="column">
          { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default AdminLayout;
