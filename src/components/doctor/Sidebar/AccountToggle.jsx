import React from 'react'
import {FiChevronUp,FiChevronDown} from 'react-icons/fi'

export const AccountToggle = () => {
  return (
    <div className='border-b mb-4 mt-2 pb-4 border-gray-400'>
        <button className='flex p-0.5 hover:bg-gray-50 rounded-lg transition-colors relative gap-2 w-full items-center'>
            <img src="src\assets\doctor-F.png"
            alt="avatar"
            className='size-10 rounded-[50%] shrink-0 shadow'/>
            <div className='text-start'>
              <span className='text-sm font-bold block'>
                Tasneem Fahmi
              </span>
              <span className='text-xs block text-gray-500'>
                tasneemfahmimadkour@gmail.com
              </span>
              <FiChevronDown className='absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs'/>
              <FiChevronUp className='absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs'/>
            </div>
        </button>
    </div>
  )
}
