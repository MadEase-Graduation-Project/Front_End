import { Routes, Route } from "react-router-dom";
import NurseDashboard from "@/pages/nurse/NurseDashboard/NurseDashboard";
import NursePatients from "@/pages/nurse/NursePatients/NursePatients";
import NurseReport from "@/pages/nurse/NurseReport/NurseReport";
import Medications from "@/pages/nurse/Medications/Medications";
import NurseAppointments from "./pages/nurse/NurseAppointments/NurseAppointments";
import NursePrescriptions from "@/pages/nurse/NursePrescriptions/NursePrescriptions";
import NurseLabResults from "@/pages/nurse/NurseLabResults/NurseLabResults";
import NurseEmergencies from "@/pages/nurse/NurseEmergencies/NurseEmergencies";
import {NurseSetting} from "@/pages/nurse/NurseSetting/NurseSetting";
import NurseHome from "@/pages/nurse/NurseHome/NurseHome";


import NurseLayout from "@/layouts/NurseLayout/NurseLayout";

const NurseApp = () => {
  return (
    <Routes>
      <Route path="/" element={<NurseLayout />}>
        <Route path="/" element={<NurseHome />} />
        <Route path="dashboard" element={<NurseDashboard />} />
        <Route path="patients" element={<NursePatients />} />
        <Route path="appointments" element={<NurseAppointments />} />
        <Route path="prescriptions" element={<NursePrescriptions />} />
        <Route path="lab-results" element={<NurseLabResults />} />
        <Route path="emergencies" element={<NurseEmergencies />} />
        <Route path="reports" element={<NurseReport />} />
        <Route path="medications" element={<Medications />} />
        {/* Settings route */}
        <Route path="settings" element={<NurseSetting />} />
      </Route>
    </Routes>
  );
};

export default NurseApp;
