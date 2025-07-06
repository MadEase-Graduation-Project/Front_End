import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTreatments } from "@/store/slices/treatmentSlice";
import { fetchShowPatientById } from "@/store/slices/patientSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { selectAllAppointments, selectShowPatientById, selectPatientsLoading } from "@/store/selectors";
import { AddDiagnosisForm } from "@/components/doctor/Diagnosis/AddDignosisForm";
import { useLocation } from "react-router-dom";

// Fallback patients
const fallbackPatients = [
  {
    _id: "fallback-1",
    name: "Sarah Elmasry",
    gender: "Female",
    dateOfBirth: "1992-03-15",
    email: "sarah.elmasry@example.com",
    phone: "+201000112233",
    city: "Cairo",
    country: "Egypt",
    createdAt: "2023-11-15T10:00:00Z",
    emergencyContact: {
      name: "Laila Elmasry",
      relationship: "Mother",
      phone: "+201234567890",
    },
  },
  {
    _id: "fallback-2",
    name: "Mohamed Hisham",
    gender: "Male",
    dateOfBirth: "1988-07-22",
    email: "mohamed.hisham@example.com",
    phone: "+201555667788",
    city: "Alexandria",
    country: "Egypt",
    createdAt: "2023-09-10T14:30:00Z",
    emergencyContact: {
      name: "Ahmed Hisham",
      relationship: "Brother",
      phone: "+201098765432",
    },
  },
  {
    _id: "fallback-3",
    name: "Nour Khaled",
    gender: "Female",
    dateOfBirth: "2001-12-05",
    email: "nour.khaled@example.com",
    phone: "+201112223344",
    city: "Giza",
    country: "Egypt",
    createdAt: "2024-01-20T09:45:00Z",
    emergencyContact: {
      name: "Khaled Youssef",
      relationship: "Father",
      phone: "+201234001122",
    },
  },
];

const Diagnosis_doctor = ({ doctorId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedPatient = location.state?.patient;

  const [fetchedPatients, setFetchedPatients] = useState({});
  const [sortBy] = useState("newest"); // you can expose this if needed

  const appointments = useSelector(selectAllAppointments);
  const currentPatient = useSelector(selectShowPatientById);
  const loading = useSelector(selectPatientsLoading);
  const medications = useSelector((state) => state.treatments.treatments);

  // Fetch treatments and appointments on mount
  useEffect(() => {
    dispatch(fetchAllTreatments());
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Get unique patient IDs from appointments
  const uniquePatientIds = useMemo(() => {
    return [...new Set(
      appointments
        .map(a => a.patientId?._id || a.patientId)
        .filter(Boolean)
    )];
  }, [appointments]);

  // Store fetched patient when available
  useEffect(() => {
    if (currentPatient && currentPatient._id) {
      setFetchedPatients(prev => ({
        ...prev,
        [currentPatient._id]: currentPatient
      }));
    }
  }, [currentPatient]);

  // Fetch individual patients
  useEffect(() => {
    uniquePatientIds.forEach(id => {
      if (!fetchedPatients[id]) {
        dispatch(fetchShowPatientById(id));
      }
    });
  }, [dispatch, uniquePatientIds, fetchedPatients]);

  // Final list of patients from fetched data or fallback
  const patients = useMemo(() => {
    const result = uniquePatientIds.map(id => fetchedPatients[id]).filter(Boolean);
    return result.length > 0 ? result : fallbackPatients;
  }, [fetchedPatients, uniquePatientIds]);

  // Sort the patients
  const sortedPatients = [...patients].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "alphabetical":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <AddDiagnosisForm
        doctorId={doctorId}
        medicationOptions={medications}
        selectedPatient={selectedPatient}
        patients={sortedPatients}
      />
    </div>
  );
};

export default Diagnosis_doctor;
