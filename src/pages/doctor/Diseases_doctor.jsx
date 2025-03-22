import React from 'react'
import { AddDiseaseForm } from '../../components/doctor/Diseases/AddDiseaseForm'

export const Diseases_doctor = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
      <div className='border-b mb-2 pb-4 border-gray-200 col-span-12'>
        <h1 className='font-semibold block text-3xl'>
          Diseases
        </h1>
      </div>
        <AddDiseaseForm token={localStorage.getItem("doctorToken")}/>
    </div>
  )
}
