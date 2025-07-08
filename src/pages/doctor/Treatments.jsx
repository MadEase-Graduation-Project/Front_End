import React from 'react'
import AddTreatmentForm from '@/components/doctor/Treatments/AddTreatmentForm'
export const Treatments = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
      <div className='col-span-12'>
        <AddTreatmentForm />
      </div>
    </div>
  )
}
