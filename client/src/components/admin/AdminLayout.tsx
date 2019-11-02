import React, { Component, ReactChild } from 'react'
import '../../styles/admin/layout.scss'
import AdminSidebar from './AdminSidebar'

interface Props {
  children: ReactChild
}

const AdminLayout: React.FC<Props> = (props) => {
  return(
    <div id="admin-layout" className="container is-fluid">
      <div className="columns">
        <div className="column is-one-fifth">
          <AdminSidebar />
        </div>
        <div className="column">
        { props.children }
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
