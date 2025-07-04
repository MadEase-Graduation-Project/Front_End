import { Routes, Route } from "react-router-dom";
import NurseDashboard from "@/pages/nurse/NurseDashboard/NurseDashboard";
import NursePatients from "@/pages/nurse/NursePatients/NursePatients";
import ChatDoctors from "@/pages/nurse/ChatDoctors/ChatDoctors";
import Medications from "@/pages/nurse/Medications/Medications";
import NurseReport from "@/pages/nurse/NurseReport/NurseReport";
import NurseHome from "@/pages/nurse/NurseHome/NurseHome";
import NurseLayout from "./layouts/NurseLayout/NurseLayout";
import Setting from "@/components/shared/Setting/Setting";
import PatientDetails from "@/pages/nurse/PatientDetails/PatientDetails";


const NurseApp = () => {
  return (
    <Routes>
      <Route path="/" element={<NurseLayout />}>
        <Route index element={<NurseHome />} /> 
        <Route path="dashboard" element={<NurseDashboard />} />
        <Route path="patients" element={<NursePatients />} />
        <Route path="chat" element={<ChatDoctors />} />
        <Route path="medications" element={<Medications />} />
        <Route path="reports" element={<NurseReport />} />
        <Route path="profile" element={<Setting />} />
        <Route path="patients/:id" element={<PatientDetails />} />
      </Route>
    </Routes>
  );
};

export default NurseApp;
