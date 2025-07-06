import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowPatientById } from "@/store/slices/patientSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { selectAllAppointments, selectShowPatientById, selectPatientsLoading } from "@/store/selectors";

export const StatCards = () => {
  const [fetchedPatients, setFetchedPatients] = useState({});
  const dispatch = useDispatch();
  
  // Use the same selectors as other components
  const Appointments = useSelector(selectAllAppointments);
  const currentPatient = useSelector(selectShowPatientById);
  const loading = useSelector(selectPatientsLoading);

  // Memoize unique patient IDs from appointments
  const uniquePatientIds = useMemo(() => {
    return [...new Set(
      Appointments
        .map(a => a.patientId?._id || a.patientId)
        .filter(Boolean)
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
  const today = new Date();
  const todaydate = `to ${today.toLocaleDateString()}`;
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  const weekAgoDate = weekAgo.toLocaleDateString();
  const weekperiod = `${weekAgoDate} ${todaydate}`;

  // Calculate patients registered this week
  const patientsThisWeek = useMemo(() => {
    return patients.filter(patient => {
      const createdDate = new Date(patient.createdAt);
      return createdDate >= weekAgo && createdDate <= today;
    }).length;
  }, [patients, weekAgo, today]);

  // Calculate appointments this week
  const appointmentsThisWeek = useMemo(() => {
    return Appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.createdAt || appointment.date);
      return appointmentDate >= weekAgo && appointmentDate <= today;
    }).length;
  }, [Appointments, weekAgo, today]);

  // Calculate trends (you can implement more sophisticated logic here)
  const patientsTrend = patientsThisWeek > 0 ? "+100%" : "0%";
  const appointmentsTrend = appointmentsThisWeek > 0 ? "+100%" : "0%";

  return (
    <>
      <Card
        title="Patients"
        value={patients.length}
        pilltext={patientsTrend}
        trend="up"
        period={todaydate}
      />
      <Card
        title="New this Week"
        value={patientsThisWeek}
        pilltext={patientsThisWeek > 0 ? "+100%" : "0%"}
        trend={patientsThisWeek > 0 ? "up" : "down"}
        period={weekperiod}
      />
      <Card
        title="Appointments"
        value={Appointments.length}
        pilltext={appointmentsTrend}
        trend="up"
        period={todaydate}
      />
      <Card
        title="New this week"
        value={appointmentsThisWeek}
        pilltext={appointmentsThisWeek > 0 ? "+100%" : "0%"}
        trend={appointmentsThisWeek > 0 ? "up" : "down"}
        period={weekperiod}
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