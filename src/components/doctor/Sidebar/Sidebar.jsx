import React from 'react'
import { AccountToggle } from './AccountToggle'
import { Search } from './Search'
import { RouteSelect } from './RouteSelect'
import { LogOutItem } from './LogOutItem'

export const Sidebar = () => {
  return (
    <div>
        {/*main Sidebar content*/}
        <div className='col-span-1 overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)] pt-2'>
        <AccountToggle/>
        <Search/>
        <RouteSelect/>
        </div>
        <LogOutItem/>
    </div>
  )
}
