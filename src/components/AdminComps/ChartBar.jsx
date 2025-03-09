import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchAppointments } from "@/store/Slices/Appointments";

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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmMDI1YTMyNWIzYWFhYzlkZDYzZDMiLCJuYW1lIjoia2FoIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc0MTUyOTQ4NCwiZXhwIjoxNzQxNTQzODg0fQ.QpHJO0bp04wuT3-qnFW8xC-r2f6UFgYxidRyUxK0vzQ";

export function ChartBar() {
  const dispatch = useDispatch();
  const {
    items: appointments,
    loading,
    error,
  } = useSelector((state) => state.appointments);
  const [chartType, setChartType] = useState("day");

  useEffect(() => {
    dispatch(fetchAppointments(token));
  }, [dispatch]);

  // Process days data
  const daysData = useMemo(() => {
    if (!appointments?.length) return [];

    const today = new Date();
    const result = [];

    for (let i = 5; i >= 0; i--) {
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
    const result = [];

    for (let i = 5; i >= 0; i--) {
      // Calculate month index (with wrapping for previous year)
      const monthIndex = (currentMonth - i + 12) % 12;

      // Count appointments for this month
      const count = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.createdAt);
        return appointmentDate.getMonth() === monthIndex;
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

  const chartConfig = {
    Appointments: {
      label: "Appointments",
      color: "hsl(var(--chart-1))",
    },
  };

  const toggleChartType = () => {
    setChartType((prev) => (prev === "day" ? "month" : "day"));
  };

  return (
    <div className="w-full md:w-2/3">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {appointments && (
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              {chartType === "day" ? "Last 7 days" : "Last 6 months"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={chartType}
                  tickLine={true}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="Appointments"
                  fill="hsl(var(--chart-1))"
                  radius={10}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm">
            <div>
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 2.1% this{" "}
                {chartType === "day" ? "week" : "month"}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total appointments for the{" "}
                {chartType === "day" ? "last week" : "last 6 months"}
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded-md ${
                chartType === "day"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={toggleChartType}
            >
              {chartType === "day" ? "Show Months" : "Show Days"}
            </button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
