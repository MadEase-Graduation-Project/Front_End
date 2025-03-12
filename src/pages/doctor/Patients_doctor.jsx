import React from 'react'
import { Messages_List_Panel } from '../../components/doctor/Messages/Messages_List_Panel'
import ChatPanel from '../../components/doctor/Messages/ChatPanel'

export const Patients_doctor = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
      <div className='border-b mb-2 pb-4 border-gray-200 col-span-12'>
        <h1 className='font-semibold block text-3xl'>
          Patients
        </h1>
      </div>
        
    </div>
  )
}
