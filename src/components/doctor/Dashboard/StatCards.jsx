import React from 'react'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import { useEffect, useState } from 'react';


export const StatCards = () => {
    const today = new Date();
    const todaydate = `to ${today.toLocaleDateString()}`
    const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  const weekAgoDate = weekAgo.toLocaleDateString();
  const weekperiod = `${weekAgoDate} ${todaydate}`
  
  return (
    <>
        <Card title="Patients" value="1302" pilltext="+33%" trend="up" period={todaydate}/>
        <Card title="New this Week" value="55" pilltext="+10%" trend="up" period={weekperiod}/>
        <Card title="Appointments" value="1111" pilltext="+22%" trend="up" period={todaydate}/>
        <Card title="New this week" value="44" pilltext="+4%" trend="up" period={weekperiod}/>

    </>
  )
}
const Card = ({ title, value, pilltext, trend, period }) => {
    return(
        <div className='p-4 bg-white col-span-3 rounded-lg border-1 border-gray-200 shadow-sm'>
            <div className='flex mb-8 justify-between items-start'> 
                <div>
                    <h3 className='text-gray-500 mb-2 text-sm'>
                        {title}
                    </h3>
                    <p className='text-3xl font-semibold'>
                        {value}
                    </p>
                </div>
                <span className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`}>
                    {trend === 'up' ? <FiTrendingUp/> : <FiTrendingDown/>}
                    {pilltext}

                </span>
            </div>
            <p className='text-xs text-gray-500'>{period}</p>
        </div>
    )
}