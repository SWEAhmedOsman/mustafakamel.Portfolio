import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const AdminContent = () => {
  return (
    <div>
      <AdminNavbar />
      <div className='content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminContent