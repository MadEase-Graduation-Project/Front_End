import React, { useState } from "react";
import { Patients_Main } from "@/components/doctor/Patients/Patients_Main";
import { Patients_Sidebar } from "@/components/doctor/Patients/Patients_Sidebar";

export const Patients_doctor = () => {
  const [selectedPatient, setSelectedPatient] = useState(null); // store the full object
  const [sortBy, setSortBy] = useState("newest");
  const [patientsList, setPatientsList] = useState([]);


  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient); // get full object from sidebar
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="grid grid-cols-12 w-full p-4 gap-3">
      <Patients_Sidebar
  onPatientSelect={handlePatientSelect}
  onSortChange={handleSortChange}
  sortBy={sortBy}
  onPatientsLoaded={setPatientsList}
/>

      <div className="col-span-9 overflow-y-auto">
<Patients_Main 
  selectedPatient={selectedPatient} 
  patientsList={patientsList}
/>      </div>
    </div>
  );
};
