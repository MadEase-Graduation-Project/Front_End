import { Routes, Route } from "react-router-dom";
import Main_Layout from "@/layouts/Main_Layout";
import HomePage1 from "./pages/general/HomePage1";
import LogInPage from "./pages/general/LogInPage";
import SignUpPage from "./pages/general/SignUpPage";
import ResetPassPage from "./pages/general/ResetPassPage";
import Admin_Layout from "@/layouts/AdminLayout/Admin_Layout";
import OverviewPage from "@/pages/admin/OverviewPage/OverviewPage";
import AppointmentsPage from "@/pages/admin/AppointmentsPage/AppointmentsPage";
import DiseasesPage from "@/pages/admin/DiseasesPage/DiseasesPage";
import PatientsPage from "@/pages/admin/UsersPages/PatientsPage";
import DoctorsPage from "@/pages/admin/UsersPages/DoctorsPage";
import AdminsPage from "@/pages/admin/UsersPages/AdminsPage";
import AdvicesPage from "@/pages/admin/AdvicesPage/AdvicesPage";
import Doctor_Dashboard_Layout from "@/layouts/Doctor_Dashboard_Layout";
import { Main_Grid } from "@/pages/doctor/Main_Grid";
import { Messages } from "@/pages/doctor/Messages";
import { Diseases_doctor } from "@/pages/doctor/Diseases_doctor";
import { Patients_doctor } from "@/pages/doctor/Patients_doctor";
import { Advice } from "@/pages/doctor/Advice";
import Chat from "@/pages/admin/Chat";
import SettingPage from "@/pages/admin/SettingPage/SettingPage";
import Community from "@/pages/main/Community";
import ProtectedRoute from "@/routes/protectedRoute";
import AdviceBlogPost from "@/pages/main/AdviceBlogPost";

function App() {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<Main_Layout />}>
        <Route path="community" element={<Community />} />
        <Route path="community/:id" element={<AdviceBlogPost />} />
      </Route>

      {/* doctor layout */}
      <Route path="doctor" element={<Doctor_Dashboard_Layout />}>
        <Route index element={<Main_Grid />} />
        <Route path="chat" element={<Messages />} />
        <Route path="diseases" element={<Diseases_doctor />} />
        <Route path="patients" element={<Patients_doctor />} />
        <Route path="advice" element={<Advice />} />
      </Route>


      <Route path="/home" element={<HomePage1 />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/resetpass" element={<ResetPassPage />} />

      {/* children (pages that use this layout) like down */}
      {/* <Route index element={<Home/>}/> */}
      {/* admin layout */}
      <Route path="/admin" element={<Admin_Layout />}>
        <Route path="overview" element={<OverviewPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="admins" element={<AdminsPage />} />
        <Route path="diseases" element={<DiseasesPage />} />
        <Route path="advices" element={<AdvicesPage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
