import React from 'react'
import { StatCards } from '../../components/doctor/Dashboard/StatCards'
import { DiagnosisChart } from '../../components/doctor/Dashboard/DiagnosisChart'
import MonthlyOverviewChart from '../../components/doctor/Dashboard/MonthlyOverviewChart'

export const Main_Grid = () => {
  return (
    <div className='px-6 py-2 grid gap-6 grid-cols-12'>
        <StatCards/> 
        <MonthlyOverviewChart/>
        <DiagnosisChart/>
    </div>
  )
}
