import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTreatments } from "@/store/slices/treatmentSlice";
import { fetchAllPatients } from "@/store/slices/patientSlice";
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
  const patient = location.state?.patient;

  const medications = useSelector((state) => state.treatments.treatments);
  const allPatients = useSelector((state) => state.patients.patients);

  useEffect(() => {
    dispatch(fetchAllTreatments());
    dispatch(fetchAllPatients());
  }, [dispatch]);

  const finalPatients = Array.isArray(allPatients) && allPatients.length > 0 ? allPatients : fallbackPatients;

  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <AddDiagnosisForm
        doctorId={doctorId}
        medicationOptions={medications}
        selectedPatient={patient}
        patients={finalPatients}
      />
    </div>
  );
};

export default Diagnosis_doctor;
