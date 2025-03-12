import React from 'react'
import { FiSearch } from 'react-icons/fi'

export const Search = () => {
  return (
    <div className='bg-gray-300 mb-4 relative rounded-lg flex items-center px-2 py-1.5 text-sm'>
    <FiSearch className='mr-2 text-gray-500'/>
    <input type='text' placeholder='Search' className='w-full bg-transparent placeholder:text-gray-500 focus:outline-none'/>
    </div>
  )
}
