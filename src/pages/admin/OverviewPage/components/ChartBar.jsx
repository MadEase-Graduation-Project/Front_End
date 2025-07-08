import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useSelector } from "react-redux";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useMemo } from "react";
import { selectAllAppointments } from "@/store/selectors"; // adjust path if needed

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ChartBar() {
  const appointments = useSelector(selectAllAppointments);
  const [chartType, setChartType] = useState("day");
  // Process days data
  const daysData = useMemo(() => {
    if (!appointments?.length) return [];

    const today = new Date();
    const result = [];

    for (let i = 6; i >= 0; i--) {
      // Calculate the date i days ago
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dayIndex = date.getDay();

      // Count appointments for this day
      const count = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.createdAt);
        return (
          appointmentDate.getDate() === date.getDate() &&
          appointmentDate.getMonth() === date.getMonth() &&
          appointmentDate.getFullYear() === date.getFullYear()
        );
      }).length;

      result.push({
        day: days[dayIndex],
        Appointments: count,
      });
    }

    return result;
  }, [appointments]);

  // Process months data
  const monthsData = useMemo(() => {
    if (!appointments?.length) return [];

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const result = [];

    for (let i = 5; i >= 0; i--) {
      // Calculate month index (with wrapping for previous year)
      const monthIndex = (currentMonth - i + 12) % 12;
      // Calculate year (for proper filtering of appointments from previous year)
      const yearOffset = currentMonth - i < 0 ? -1 : 0;
      const year = currentYear + yearOffset;

      // Count appointments for this month and year
      const count = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.createdAt);
        return (
          appointmentDate.getMonth() === monthIndex &&
          appointmentDate.getFullYear() === year
        );
      }).length;

      result.push({
        month: months[monthIndex],
        Appointments: count,
      });
    }

    return result;
  }, [appointments]);

  // Get current chart data based on type
  const chartData = chartType === "day" ? daysData : monthsData;

  // Calculate total appointments
  const totalAppointments = useMemo(() => {
    return appointments?.length || 0;
  }, [appointments]);

  // Calculate average appointments per period
  const averageAppointments = useMemo(() => {
    const data = chartType === "day" ? daysData : monthsData;
    if (!data.length) return 0;

    const sum = data.reduce((acc, item) => acc + item.Appointments, 0);
    return (sum / data.length).toFixed(1);
  }, [chartType, daysData, monthsData]);

  const chartConfig = {
    Appointments: {
      label: "Appointments",
      color: "hsl(var(--chart-1))",
    },
  };

  // Chart data and configuration ready

  return (
    <div className="w-full">
      {appointments && (
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Appointments Overview
                </h3>
                <p className="text-sm text-gray-500">
                  Track appointment trends over time
                </p>
              </div>
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    chartType === "day"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setChartType("day")}
                >
                  Daily
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    chartType === "month"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setChartType("month")}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="mb-6">
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey={chartType === "day" ? "day" : "month"}
                    tickLine={false}
                    tickMargin={12}
                    axisLine={false}
                    padding={{ left: 20, right: 20 }}
                    className="text-gray-600"
                  />
                  <ChartTooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            className="p-3 bg-white border border-gray-200 rounded-lg shadow-lg"
                            items={[
                              {
                                label: "Appointments",
                                value: payload[0].value,
                                color: "#954827",
                              },
                            ]}
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="Appointments"
                    fill="#954827"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <p className="text-sm font-medium text-blue-700 mb-1">
                  Total Appointments
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {totalAppointments}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <p className="text-sm font-medium text-green-700 mb-1">
                  Average per {chartType === "day" ? "day" : "month"}
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {averageAppointments}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-gray-500 px-6 py-4 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Data based on {appointments?.length || 0} appointments
            </div>
            <div className="font-medium">
              {chartType === "day" ? "Last 7 days" : "Last 6 months"}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
