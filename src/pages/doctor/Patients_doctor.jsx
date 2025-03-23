import React, { useState } from "react";
import { Patients_Main } from "@/components/doctor/Patients/Patients_Main";
import { Patients_Sidebar } from "@/components/doctor/Patients/Patients_Sidebar";
import Patients_Sort_Bar from "@/components/doctor/Patients/Patients_Sort_Bar";
import { FiSearch } from "react-icons/fi";

export const Patients_doctor = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const handlePatientSelect = (patientId) => {
    setSelectedPatientId(patientId);
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
      />
      <div className="col-span-9 overflow-y-auto">
        <Patients_Main selectedPatientId={selectedPatientId} />
      </div>
    </div>
  );
};