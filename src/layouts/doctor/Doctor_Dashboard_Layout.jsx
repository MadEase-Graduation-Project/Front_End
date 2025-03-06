import { Dashboard } from '@/components/doctor/Dashboard/Dashboard';
import { Sidebar } from '@/components/doctor/Sidebar/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Doctor_Dashboard_Layout = () => {
  return (
    <div className='bg-gray-200 grid gap-4 p-4 grid-cols-5 '>
      <Sidebar />
      <div className="col-span-4">
      <Dashboard />
      </div>
    </div>
  );
};
