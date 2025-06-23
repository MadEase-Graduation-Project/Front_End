import React from 'react'
import { useCallback, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Hypertension", value: 1 },
  { name: "Coronary Artery Disease (CAD)", value: 1 },
  // { name: "Other", value: 0 },
  { name: "Heart Failure", value: 2 },
  { name: "Atrial Fibrillation (AFib)", value: 1 }
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
    <div className='col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-5 rounded-lg border-1 border-gray-200 bg-white shadow-sm'>
      <div className='flex items-center justify-center mt-4'>
        <h2 className="text-lg md:text-xl font-semibold">Average Diagnoses</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
