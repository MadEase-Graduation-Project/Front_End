import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getAllDiagnosis } from "@/services/diagnosisApi";
import { fetchAllPatients } from "@/store/slices/patientSlice";

const COLORS = ["#37568d", "#007eb1", "#00a5ba", "#00c8a6", "#8be585"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const outerRadiusLabel = outerRadius * 1.3;
  const outerX = cx + outerRadiusLabel * Math.cos(-midAngle * RADIAN);
  const outerY = cy + outerRadiusLabel * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
      <text
        x={outerX}
        y={outerY}
        fill="#000"
        textAnchor={outerX > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {name}
      </text>
    </>
  );
};

export const AgeChart = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const getAgeGroup = (age) => {
  const lower = Math.floor(age / 10) * 10;
  const upper = lower + 9;
  return `${lower}-${upper}`;
};

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  if (isNaN(birthDate)) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return getAgeGroup(age);
};


  useEffect(() => {
    dispatch(fetchAllPatients());
  }, [dispatch]);

  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    const fetchAgeDataForAll = async () => {
      if (!Array.isArray(patients) || patients.length === 0) return;

      let allAges = [];

      for (const patient of patients) {
  const ageGroup = calculateAge(patient.dateOfBirth);
  if (ageGroup) allAges.push(ageGroup);
}


      // Transform allAges into the format expected by PieChart
      const ageCounts = {};
      allAges.forEach(age => {
        ageCounts[age] = (ageCounts[age] || 0) + 1;
      });

      const chartData = Object.entries(ageCounts).map(([name, value]) => ({
        name: name,
        value: value,
      }));

      setAgeData(chartData);
    };

    fetchAgeDataForAll();
  }, [patients]);

  
  return (
    <div className="col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-center mt-4">
        <h2 className="text-lg md:text-xl font-semibold">Average Age</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={ageData}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            {ageData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
