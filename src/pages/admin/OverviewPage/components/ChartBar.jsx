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
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Appointments Overview</h3>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-md ${
                    chartType === "day"
                      ? "bg-[#954827] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setChartType("day")}
                >
                  Daily
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${
                    chartType === "month"
                      ? "bg-[#954827] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setChartType("month")}
                >
                  Monthly
                </button>
              </div>
            </div>

            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey={chartType === "day" ? "day" : "month"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  padding={{ left: 20, right: 20 }}
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="p-2"
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
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ChartContainer>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Total Appointments</p>
                <p className="text-2xl font-semibold">{totalAppointments}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">
                  Average per {chartType === "day" ? "day" : "month"}
                </p>
                <p className="text-2xl font-semibold">{averageAppointments}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-gray-500 px-6">
            <div>Data based on {appointments?.length || 0} appointments</div>
            <div>{chartType === "day" ? "Last 7 days" : "Last 6 months"}</div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
