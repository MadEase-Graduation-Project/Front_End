import React from 'react'
import { Topbar } from './Topbar'
import { Main_Grid } from '../../../pages/doctor/Main_Grid'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <div className='bg-gray-50 rounded-lg pb-4 shadow pt-2'>
      <Topbar/>
      <Outlet/>
      </div>
  )
}
