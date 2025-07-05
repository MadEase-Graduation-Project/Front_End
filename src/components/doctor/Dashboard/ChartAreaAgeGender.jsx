"use client"

import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { fetchAllPatients, fetchShowPatientById } from "@/store/slices/patientSlice"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { selectAllAppointments, selectAllPatients, selectPatientsLoading, selectShowPatientById } from "@/store/selectors"
import { fetchAppointments } from "@/store/slices/appointmentSlice"

const calculateAge = (dob) => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const getAgeGroup = (age) => {
  if (age < 18) return "0-17"
  if (age < 30) return "18-29"
  if (age < 45) return "30-44"
  if (age < 60) return "45-59"
  return "60+"
}

export default function ChartAreaAgeGender() {
const dispatch = useDispatch();
const Appointments = useSelector(selectAllAppointments);
const patientMap = useSelector(selectShowPatientById);
const loading = useSelector(selectPatientsLoading);

// Memoize IDs
const uniquePatientIds = useMemo(() => {
  return [...new Set(Appointments.map(a => a.patientId))];
}, [Appointments]);

// Fetch patients
useEffect(() => {
  if (uniquePatientIds.length > 0) {
    uniquePatientIds.forEach(id => {
      if (!patientMap[id]) dispatch(fetchShowPatientById(id));
    });
  }
}, [dispatch, uniquePatientIds, patientMap]);

// Fetch appointments once
useEffect(() => {
  dispatch(fetchAppointments());
}, [dispatch]);

// Get patient list
const patients = useMemo(() => {
  return uniquePatientIds.map(id => patientMap[id]).filter(Boolean);
}, [patientMap, uniquePatientIds]);

// Loading state
const isLoading = uniquePatientIds.some(id => !patientMap[id]);

// Chart Data
const chartData = useMemo(() => {
  const dataMap = {};

  patients.forEach((patient) => {
    const age = calculateAge(patient.dateOfBirth);
    const ageGroup = getAgeGroup(age);
    const gender = patient.gender?.toLowerCase();

    if (!dataMap[ageGroup]) {
      dataMap[ageGroup] = { male: 0, female: 0 };
    }

    if (gender === "male") dataMap[ageGroup].male++;
    else if (gender === "female") dataMap[ageGroup].female++;
  });

  return Object.entries(dataMap).map(([ageGroup, counts]) => ({
    ageGroup,
    ...counts,
  }));
}, [patients]);


  const chartConfig = {
    male: {
      label: "Male",
      color: "#3b82f6", // blue
    },
    female: {
      label: "Female",
      color: "#ec4899", // pink
    },
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Age & Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Age & Gender Chart</CardTitle>
        <CardDescription>
          Patient demographics by age group
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="ageGroup"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillMale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillFemale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="natural"
              dataKey="male"
              stackId="a"
              fill="url(#fillMale)"
              stroke="#3b82f6"
              fillOpacity={0.4}
            />
            <Area
              type="natural"
              dataKey="female"
              stackId="a"
              fill="url(#fillFemale)"
              stroke="#ec4899"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
