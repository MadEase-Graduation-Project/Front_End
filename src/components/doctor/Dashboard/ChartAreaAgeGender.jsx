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
import { TrendingUp } from "lucide-react"
import { fetchAllPatients } from "@/store/slices/patientSlice"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

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
  const dispatch = useDispatch()
  const patients = useSelector((state) => state.patients.patients) || []
  const loading = useSelector((state) => state.patients.loading)

  useEffect(() => {
    dispatch(fetchAllPatients())
  }, [dispatch])

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

    return Object.entries(dataMap).map(([ageGroup, counts]) => ({
      ageGroup,
      ...counts,
    }))
  }, [patients])

  const chartConfig = {
    male: {
      label: "Male",
      color: "var(--chart-1)",
    },
    female: {
      label: "Female",
      color: "var(--chart-2)",
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
    <div className="col-span-1 sm:col-span-2 md:col-span-5 lg:col-span-5 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-center mt-4">
        <h2 className="text-lg md:text-xl font-semibold">Average Diagnoses</h2>
      </div><Card>
      <CardHeader>
        <CardTitle>Age & Gender Chart - Gradient</CardTitle>
        <CardDescription>
          Showing patient demographics by age group
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
                <stop offset="5%" stopColor="var(--color-male)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-male)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillFemale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-female)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-female)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="natural"
              dataKey="male"
              stackId="a"
              fill="url(#fillMale)"
              stroke="var(--color-male)"
              fillOpacity={0.4}
            />
            <Area
              type="natural"
              dataKey="female"
              stackId="a"
              fill="url(#fillFemale)"
              stroke="var(--color-female)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            
          </div>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}
