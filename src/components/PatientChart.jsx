import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Visits: 10 },
  { name: 'Feb', Visits: 12 },
  { name: 'Mar', Visits: 8 },
  { name: 'Apr', Visits: 15 },
];

const PatientChart = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Monthly Patient Visits</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Visits" fill="#4C51BF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientChart;
