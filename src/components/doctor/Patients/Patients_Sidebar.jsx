import React from 'react'
import { FiSearch } from 'react-icons/fi'
import Patients_Sort_Bar from './Patients_Sort_Bar'
import { Patients_List } from './Patients_List'

export const Patients_Sidebar = ({ onPatientSelect, onSortChange, sortBy }) => {
  return (
    <aside className="p-4 col-span-3 bg-gray-100 rounded-lg h-[calc(100vh_-_130px)] flex flex-col w-full">
        <h2 className="text-2xl font-semibold mb-4">Patient Queue</h2>
        <div className="relative bg-white rounded-lg flex items-center px-2 text-sm border-1 border-gray-200 h-9 w-full mb-3 overflow-hidden">
          <FiSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-full placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        <Patients_Sort_Bar onSortChange={onSortChange} />
        <div className="overflow-y-auto">
        <Patients_List onPatientSelect={onPatientSelect} sortBy={sortBy} />
        </div>
    </aside>
  )
}
