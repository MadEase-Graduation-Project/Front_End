import React from 'react'
import { StatCards } from './StatCards'
import { DiagnosisChart } from './DiagnosisChart'
import MonthlyOverviewChart from './MonthlyOverviewChart'

export const Main_Grid = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
        <StatCards/> 
        <MonthlyOverviewChart/>
        <DiagnosisChart/>
    </div>
  )
}
