import {
  selectAllAppointments,
  selectPatientsLoading,
  selectShowPatientById,
} from "@/store/selectors";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { fetchShowPatientById } from "@/store/slices/patientSlice";
import { getAllDiagnosis } from "@/services/diagnosisApi";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#37568d", "#007eb1", "#00a5ba", "#00c8a6", "#8be585"];
const RADIAN = Math.PI / 180;

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
        fontSize="10"
        fontWeight="bold"
      >
        {name}
      </text>
    </>
  );
};

const DiagnosisChart = () => {
  const dispatch = useDispatch();
  const [fetchedPatients, setFetchedPatients] = useState({});
  const [diagnosisMap, setDiagnosisMap] = useState({});
  const [isDiagnosisLoading, setIsDiagnosisLoading] = useState(true);
  const [diagnosisError, setDiagnosisError] = useState(null);
  const diagnosisFetchedRef = useRef(new Set());

  const appointments = useSelector(selectAllAppointments);
  const currentPatient = useSelector(selectShowPatientById);
  const patientsLoading = useSelector(selectPatientsLoading);

  const uniquePatientIds = useMemo(() => {
    return [...new Set(
      appointments
        .map((a) => a.patientId?._id || a.patientId)
        .filter(Boolean)
    )];
  }, [appointments]);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (currentPatient && currentPatient._id) {
      setFetchedPatients((prev) => ({
        ...prev,
        [currentPatient._id]: currentPatient,
      }));
    }
  }, [currentPatient]);

  useEffect(() => {
    if (uniquePatientIds.length > 0) {
      uniquePatientIds.forEach((id) => {
        if (!fetchedPatients[id]) {
          dispatch(fetchShowPatientById(id));
        }
      });
    }
  }, [dispatch, uniquePatientIds, fetchedPatients]);

  const patients = useMemo(() => {
    return uniquePatientIds.map((id) => fetchedPatients[id]).filter(Boolean);
  }, [fetchedPatients, uniquePatientIds]);

  const isLoadingPatients =
    patientsLoading ||
    (uniquePatientIds.length > 0 &&
      uniquePatientIds.some((id) => !fetchedPatients[id]));

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        setIsDiagnosisLoading(true);
        const newDiagnosisMap = {};

        for (const patient of patients) {
          if (!diagnosisFetchedRef.current.has(patient._id)) {
            const result = await getAllDiagnosis(patient._id);
            newDiagnosisMap[patient._id] = result?.diagnoses || [];
            diagnosisFetchedRef.current.add(patient._id);
          }
        }

        setDiagnosisMap((prev) => ({ ...prev, ...newDiagnosisMap }));
      } catch (err) {
        setDiagnosisError(err.message || "Failed to fetch diagnosis");
      } finally {
        setIsDiagnosisLoading(false);
      }
    };

    if (patients.length > 0 && !isLoadingPatients) {
      fetchDiagnoses();
    }
  }, [patients, isLoadingPatients]);

  const chartData = useMemo(() => {
    const counts = {};
    Object.values(diagnosisMap)
      .flat()
      .forEach((item) => {
        const title = item?.title || "Unknown";
        counts[title] = (counts[title] || 0) + 1;
      });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [diagnosisMap]);

  const renderCardContent = (content) => (
    <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Average Diagnoses</h2>
      {content}
    </div>
  );

  if (isLoadingPatients || (isDiagnosisLoading && chartData.length === 0)) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 col-span-4">
        {renderCardContent(
          <p>
            {isLoadingPatients
              ? `Loading patients... (${uniquePatientIds.length} patients to fetch)`
              : "Loading diagnoses..."}
          </p>
        )}
      </div>
    );
  }

  if (diagnosisError) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 col-span-4">
        {renderCardContent(
          <p className="text-red-500">Error: {diagnosisError}</p>
        )}
      </div>
    );
  }

  if (uniquePatientIds.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 col-span-4">
        {renderCardContent(<p>No appointments found.</p>)}
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 col-span-4">
        {renderCardContent(<p>No diagnosis data available</p>)}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 col-span-4">
      <div className="text-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Average Diagnoses</h2>
      </div>
      <div className="flex justify-center">
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
    </div>
  );
};

export default DiagnosisChart;
