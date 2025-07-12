import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowPatientById } from "@/store/slices/patientSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { selectAllAppointments, selectShowPatientById, selectPatientsLoading } from "@/store/selectors";

// Helper function to calculate percentage change
const calculateTrend = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? "+100%" : "0%";
  }
  
  const percentChange = ((current - previous) / previous) * 100;
  const sign = percentChange >= 0 ? "+" : "";
  return `${sign}${Math.round(percentChange)}%`;
};

// Helper function to determine trend direction
const getTrendDirection = (trendString) => {
  return trendString.startsWith("+") || trendString === "0%" ? "up" : "down";
};

export const StatCards = () => {
  const [fetchedPatients, setFetchedPatients] = useState({});
  const dispatch = useDispatch();
  
  // Use the same selectors as other components
  const appointments = useSelector(selectAllAppointments);
  const currentPatient = useSelector(selectShowPatientById);
  const loading = useSelector(selectPatientsLoading);

  // Memoize unique patient IDs from appointments
  const uniquePatientIds = useMemo(() => {
    return [...new Set(
      appointments
        .map(a => a.patientId?._id || a.patientId)
        .filter(Boolean)
    )];
  }, [appointments]);

  // Store the current patient when it's fetched
  useEffect(() => {
    if (currentPatient && currentPatient._id) {
      setFetchedPatients(prev => ({
        ...prev,
        [currentPatient._id]: currentPatient
      }));
    }
  }, [currentPatient]);

  // Fetch appointments once
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

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

  // Get patient list from the fetchedPatients
  const patients = useMemo(() => {
    return uniquePatientIds.map(id => fetchedPatients[id]).filter(Boolean);
  }, [fetchedPatients, uniquePatientIds]);

  // Calculate date ranges
  const { today, weekAgo, previousWeekStart, todayDate, weekPeriod } = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    
    const previousWeekStart = new Date();
    previousWeekStart.setDate(today.getDate() - 14);
    
    return {
      today,
      weekAgo,
      previousWeekStart,
      todayDate: `to ${today.toLocaleDateString()}`,
      weekPeriod: `${weekAgo.toLocaleDateString()} to ${today.toLocaleDateString()}`
    };
  }, []);

  // Calculate metrics with proper trend analysis
  const metrics = useMemo(() => {
    // Debug logging
    console.log('Debug - patients:', patients);
    console.log('Debug - appointments:', appointments);
    console.log('Debug - patients length:', patients?.length);
    console.log('Debug - appointments length:', appointments?.length);
    
    if (!patients || !appointments || patients.length === 0 || appointments.length === 0) {
      console.log('Debug - Missing data, returning zeros');
      return {
        totalPatients: uniquePatientIds?.length || 0,
        patientsThisWeek: 0,
        patientsTrend: "0%",
        totalAppointments: appointments?.length || 0,
        appointmentsThisWeek: 0,
        appointmentsTrend: "0%"
      };
    }

    // Calculate patients registered this week
    const patientsThisWeek = patients.filter(patient => {
      const createdDate = new Date(patient.createdAt);
      return createdDate >= weekAgo && createdDate <= today;
    }).length;

    // Calculate patients registered previous week for trend
    const patientsPreviousWeek = patients.filter(patient => {
      const createdDate = new Date(patient.createdAt);
      return createdDate >= previousWeekStart && createdDate < weekAgo;
    }).length;

    // Calculate appointments this week
    const appointmentsThisWeek = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.createdAt || appointment.date);
      return appointmentDate >= weekAgo && appointmentDate <= today;
    }).length;

    // Calculate appointments previous week for trend
    const appointmentsPreviousWeek = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.createdAt || appointment.date);
      return appointmentDate >= previousWeekStart && appointmentDate < weekAgo;
    }).length;

    // Calculate trends
    const patientsTrend = calculateTrend(patientsThisWeek, patientsPreviousWeek);
    const appointmentsTrend = calculateTrend(appointmentsThisWeek, appointmentsPreviousWeek);

    return {
      totalPatients: uniquePatientIds.length,
      patientsThisWeek,
      patientsTrend,
      totalAppointments: appointments.length,
      appointmentsThisWeek,
      appointmentsTrend
    };
  }, [patients, appointments, weekAgo, today, previousWeekStart]);

  if (loading) {
    return (
      <>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 bg-gray-100 col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-3 bg-gray-300 rounded"></div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <Card
        title="Patients"
        value={metrics.totalPatients}
        pilltext={metrics.patientsTrend}
        trend={getTrendDirection(metrics.patientsTrend)}
        period={todayDate}
      />
      <Card
        title="New this Week"
        value={metrics.patientsThisWeek}
        pilltext={metrics.patientsTrend}
        trend={getTrendDirection(metrics.patientsTrend)}
        period={weekPeriod}
      />
      <Card
        title="Appointments"
        value={metrics.totalAppointments}
        pilltext={metrics.appointmentsTrend}
        trend={getTrendDirection(metrics.appointmentsTrend)}
        period={todayDate}
      />
      <Card
        title="New this week"
        value={metrics.appointmentsThisWeek}
        pilltext={metrics.appointmentsTrend}
        trend={getTrendDirection(metrics.appointmentsTrend)}
        period={weekPeriod}
      />
    </>
  );
};

const Card = ({ title, value, pilltext, trend, period }) => {
  return (
    <div className="p-4 bg-white col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 rounded-lg border-1 border-gray-200 shadow-sm">
      <div className="flex mb-8 justify-between items-start">
        <div>
          <h3 className="text-gray-500 mb-2 text-sm">{title}</h3>
          <p className="text-2xl md:text-3xl font-semibold">{value}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
          {pilltext}
        </span>
      </div>
      <p className="text-xs text-gray-500">{period}</p>
    </div>
  );
};