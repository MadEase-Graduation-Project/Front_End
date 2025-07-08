import React from 'react'
import { StatCards } from '../../components/doctor/Dashboard/StatCards'
import DiagnosisChart from '../../components/doctor/Dashboard/DiagnosisChart'
import ChartAreaAgeGender from '../../components/doctor/Dashboard/ChartAreaAgeGender'

export const Main_Grid = () => {
  return (
    <div className='px-3 pb-2 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 h-[calc(100vh_-_120px)]'>
        <StatCards/> 
        <ChartAreaAgeGender/>
        <DiagnosisChart/>  
    </div>
  )
}
