import React, { useState } from 'react'
import { AccountToggle } from './AccountToggle'
import { Search } from './Search'
import { RouteSelect } from './RouteSelect'
import { LogOutItem } from './LogOutItem'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import Logo from "../../../assets/Logo.svg"
export const OldSidebar = ({expanded,setExpanded}) => {
  return (
    <div className={`${expanded ? "" : 'rounded-lg bg-[#37568d]'}`}>
        {/*main Sidebar content*/}
        <div className={`overflow-hidden sticky top-4 h-[calc(100vh-32px-48px)] pt-2 flex-col flex transition-all ${expanded ? "w-64" : "gap-[64px] w-14 text-center"}`}>
        <div className='flex flex-row'>
        <img src={Logo} alt='Logo' className={`text-[#37568d] ${expanded ? "w-full mr-6" : "w-0"}`}/>
        <Button onClick={() => setExpanded(curr => !curr)} className={`mt-6 ml-0 bg-[#37568d] ${expanded ? "" : "shadow-none hover:bg-[#1e3356] mx-auto"}`}>
            {expanded ? <FiChevronsLeft/> : <FiChevronsRight/>}
        </Button>
    </div>
        <RouteSelect expanded={expanded}/>
        </div>
        <LogOutItem expanded={expanded}/>
    </div>
  )
}
