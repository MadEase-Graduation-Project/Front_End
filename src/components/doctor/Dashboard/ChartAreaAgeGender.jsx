"use client"

import React, { useEffect, useMemo, useState } from "react"
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
const [fetchedPatients, setFetchedPatients] = useState({});
const dispatch = useDispatch();
const Appointments = useSelector(selectAllAppointments);
const currentPatient = useSelector(selectShowPatientById); // This is a single patient object
const loading = useSelector(selectPatientsLoading);

// Memoize unique patient IDs from appointments (adjusted for API structure)
const uniquePatientIds = useMemo(() => {
  return [...new Set(
    Appointments
      .map(a => a.patientId?._id || a.patientId) // Handle both object and string formats
      .filter(Boolean) // Remove null/undefined values
  )];
}, [Appointments]);

// Store the current patient when it's fetched
useEffect(() => {
  if (currentPatient && currentPatient._id) {
    setFetchedPatients(prev => ({
      ...prev,
      [currentPatient._id]: currentPatient
    }));
  }
}, [currentPatient]);

// Fetch patients individually based on appointment data
useEffect(() => {
  if (uniquePatientIds.length > 0) {
    uniquePatientIds.forEach(id => {
      if (!fetchedPatients[id]) {
        dispatch(fetchShowPatientById(id));
      }
    });
  }
}, [dispatch, uniquePatientIds, fetchedPatients]);

// Fetch appointments once
useEffect(() => {
  dispatch(fetchAppointments());
}, [dispatch]);

// Get patient list from the fetchedPatients
const patients = useMemo(() => {
  console.log('Chart - fetchedPatients content:', fetchedPatients);
  console.log('Chart - uniquePatientIds:', uniquePatientIds);
  
  const result = uniquePatientIds.map(id => fetchedPatients[id]).filter(Boolean);
  console.log('Chart - Patients result:', result);
  return result;
}, [fetchedPatients, uniquePatientIds]);

// Check if we're still loading any patients
const isLoading = loading || (uniquePatientIds.length > 0 && uniquePatientIds.some(id => !fetchedPatients[id]));

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

  if (isLoading && patients.length === 0 && uniquePatientIds.length > 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Age & Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>Loading patients... ({uniquePatientIds.length} patients to fetch)</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border border-gray-200 bg-white shadow-sm sm:col-span-1 md:col-span-4 lg:col-span-8">
      <CardHeader>
        <CardTitle>Age & Gender Chart</CardTitle>
        <CardDescription>
          Patient demographics by age group ({patients.length} patients)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[50%]">
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