import React, { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { getAllDiagnosis } from "@/services/diagnosisApi"
import { fetchAllPatients } from "@/store/slices/patientSlice"
import { selectAllPatients } from "@/store/selectors"
import { isEmpty } from "@/utils/objectUtils"

const COLORS = ["#37568d", "#007eb1", "#00a5ba", "#00c8a6", "#8be585"]
const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  const outerRadiusLabel = outerRadius * 1.3
  const outerX = cx + outerRadiusLabel * Math.cos(-midAngle * RADIAN)
  const outerY = cy + outerRadiusLabel * Math.sin(-midAngle * RADIAN)

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
  )
}

export const DiagnosisChart = () => {
  const dispatch = useDispatch()
  const patients = useSelector(selectAllPatients)
  const [diagnosisData, setDiagnosisData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEmpty(patients)) {
      dispatch(fetchAllPatients())
    }
  }, [dispatch, patients])

  useEffect(() => {
    const fetchDiagnosesForAll = async () => {
      if (!Array.isArray(patients) || patients.length === 0) return

      setLoading(true)
      setError(null)

      try {
        let allDiagnoses = []

        for (const patient of patients) {
          const res = await getAllDiagnosis(patient._id)

          if (res?.success && Array.isArray(res.diagnoses)) {
            allDiagnoses = [...allDiagnoses, ...res.diagnoses]
          } else if (res?.success === false && res.code === 404) {
            console.log(`No diagnoses for patient ${patient._id}, skipping.`)
          } else {
            console.warn("Unexpected diagnosis response:", res)
          }
        }

        setDiagnosisData(allDiagnoses)
      } catch (e) {
        setError(e.message || "Failed to fetch diagnoses.")
      } finally {
        setLoading(false)
      }
    }

    fetchDiagnosesForAll()
  }, [patients])

  const chartData = useMemo(() => {
    const counts = {}
    diagnosisData.forEach((item) => {
      const title = item?.title || "Unknown"
      counts[title] = (counts[title] || 0) + 1
    })

    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [diagnosisData])

  if (loading) {
    return (
      <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-4 rounded-lg border border-gray-200 bg-white shadow-sm p-4">
        <p>Loading diagnoses...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-4 rounded-lg border border-gray-200 bg-white shadow-sm p-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-4 rounded-lg border border-gray-200 bg-white shadow-sm">
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
  )
}
