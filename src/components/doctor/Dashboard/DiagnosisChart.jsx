import React from 'react'
import { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Hypertension", value: 456 },
  { name: "Coronary Artery Disease (CAD)", value: 326 },
  { name: "Other", value: 195 },
  { name: "Heart Failure", value: 195 },
  { name: "Atrial Fibrillation (AFib)", value: 130 }
];

const COLORS = ["#37568d", "#007eb1", "#00a5ba", "#00c8a6","#8be585"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;

  // Label inside the slice (percentage)
  const innerRadiusLabel = innerRadius + (outerRadius - innerRadius) * 0.5;
  const innerX = cx + innerRadiusLabel * Math.cos(-midAngle * RADIAN);
  const innerY = cy + innerRadiusLabel * Math.sin(-midAngle * RADIAN);

  // Label outside the slice (category name)
  const outerRadiusLabel = outerRadius * 1.3; // Move the label outside
  const outerX = cx + outerRadiusLabel * Math.cos(-midAngle * RADIAN);
  const outerY = cy + outerRadiusLabel * Math.sin(-midAngle * RADIAN);

  return (
    <>
      {/* Inside the slice: Percentage */}
      <text
        x={innerX}
        y={innerY}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>

      {/* Outside the slice: Category name */}
      <text
        x={outerX}
        y={outerY}
        fill="#000000"
        textAnchor={outerX > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="8"
        fontWeight="bold"
      >
        {name}
      </text>
    </>
  );
};


export const DiagnosisChart = () => {
  return (
    <div className='col-span-5 rounded-lg border-1 border-gray-200 bg-white shadow-sm'>
      <div className='flex items-center justify-center mt-4'>
      <h2 className="text-xl font-semibold">Average Diagnoses</h2>
      </div>
      <PieChart width={475} height={300}>
      <Pie
  data={data}
  cx="50%"
  cy="50%"
  label={renderCustomizedLabel} // This enables proper labels inside each slice
  outerRadius={90} // Slightly increased for better layout
  dataKey="value"
  stroke="none" // Removes extra borders for a cleaner look
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart></div>
  )
}
