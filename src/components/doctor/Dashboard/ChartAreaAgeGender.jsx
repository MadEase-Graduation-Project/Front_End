"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { fetchShowPatientById } from "@/store/slices/patientSlice"
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
import {
  selectAllAppointments,
  selectShowPatientById,
  selectPatientsLoading,
} from "@/store/selectors"
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
  if (age < 10) return "0-9"
  if (age < 20) return "10-19"
  if (age < 30) return "20-29"
  if (age < 40) return "30-39"
  if (age < 50) return "40-49"
  if (age < 60) return "50-59"
  if (age < 70) return "60-69"
  return "70+"
}

export default function ChartAreaAgeGender() {
  const [fetchedPatients, setFetchedPatients] = useState({})
  const dispatch = useDispatch()
  const Appointments = useSelector(selectAllAppointments)
  const currentPatient = useSelector(selectShowPatientById)
  const loading = useSelector(selectPatientsLoading)

  const uniquePatientIds = useMemo(() => {
    return [
      ...new Set(
        Appointments.map((a) => a.patientId?._id || a.patientId).filter(Boolean)
      ),
    ]
  }, [Appointments])

  useEffect(() => {
    if (currentPatient && currentPatient._id) {
      setFetchedPatients((prev) => ({
        ...prev,
        [currentPatient._id]: currentPatient,
      }))
    }
  }, [currentPatient])

  useEffect(() => {
    if (uniquePatientIds.length > 0) {
      uniquePatientIds.forEach((id) => {
        if (!fetchedPatients[id]) {
          dispatch(fetchShowPatientById(id))
        }
      })
    }
  }, [dispatch, uniquePatientIds, fetchedPatients])

  useEffect(() => {
    dispatch(fetchAppointments())
  }, [dispatch])

  const patients = useMemo(() => {
    return uniquePatientIds.map((id) => fetchedPatients[id]).filter(Boolean)
  }, [fetchedPatients, uniquePatientIds])

  const isLoading =
    loading ||
    (uniquePatientIds.length > 0 &&
      uniquePatientIds.some((id) => !fetchedPatients[id]))

  const chartData = useMemo(() => {
    const dataMap = {}

    patients.forEach((patient) => {
      const age = calculateAge(patient.dateOfBirth)
      const ageGroup = getAgeGroup(age)
      const gender = patient.gender?.toLowerCase()

      if (!dataMap[ageGroup]) {
        dataMap[ageGroup] = { male: 0, female: 0 }
      }

      if (gender === "male") dataMap[ageGroup].male++
      else if (gender === "female") dataMap[ageGroup].female++
    })

    return Object.entries(dataMap)
      .sort((a, b) => {
        const parseMin = (label) => parseInt(label.split("-")[0]) || 70
        return parseMin(a[0]) - parseMin(b[0])
      })
      .map(([ageGroup, counts]) => ({
        ageGroup,
        ...counts,
      }))
  }, [patients])

  const chartConfig = {
    male: {
      label: "Male",
      color: "#3b82f6",
    },
    female: {
      label: "Female",
      color: "#ec4899",
    },
  }

  if (isLoading && patients.length === 0 && uniquePatientIds.length > 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Age & Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          Loading patients... ({uniquePatientIds.length} patients to fetch)
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border h-[calc(100vh_-_260px)] border-gray-200 bg-white shadow-sm sm:col-span-1 md:col-span-4 lg:col-span-8 overflow-hidden">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle>Age & Gender Chart</CardTitle>
        <CardDescription>
          Patient demographics by age group ({patients.length} patients)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-70px)]">
        <div className="h-full w-full px-6 pb-6">
          <ChartContainer config={chartConfig} className="h-full w-full max-h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="ageGroup"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
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
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
