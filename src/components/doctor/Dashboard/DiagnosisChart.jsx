import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Constants
const COLORS = ["#37568d", "#007eb1", "#00a5ba", "#00c8a6", "#8be585"];
const RADIAN = Math.PI / 180;

// Label renderer
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
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

const DiagnosisChart = () => {
  const diagnosis = useSelector((state) => state.diagnosis?.diagnosis || []);
  const loading = useSelector((state) => state.diagnosis?.loading);
  const error = useSelector((state) => state.diagnosis?.error);

  const chartData = useMemo(() => {
    const counts = {};
    diagnosis.forEach((item) => {
      const title = item?.title || "Unknown";
      counts[title] = (counts[title] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [diagnosis]);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 col-span-4">
        <p>Loading diagnoses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 col-span-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm col-span-4">
      <div className="flex items-center justify-center mt-4">
        <h2 className="text-lg md:text-xl font-semibold">Average Diagnoses</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
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

export default DiagnosisChart;
