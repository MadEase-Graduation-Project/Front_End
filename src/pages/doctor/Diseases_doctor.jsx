import React from 'react'
import AddDiseaseForm from '../../components/doctor/Diseases/AddDiseaseForm'

export const Diseases_doctor = () => {
  return (
    <div className='px-4'>
        <AddDiseaseForm token={localStorage.getItem("doctorToken")}/>
    </div>
  )
}
