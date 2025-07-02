import { Routes, Route } from "react-router-dom";

import Main_Layout from "@/layouts/Main_Layout";
import HomePage from "@/pages/main/HomePage";
import HomePage1 from "@/pages/general/HomePage1";
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

import ResetPass_Layout from "@/layouts/ResetPass_Layout";
import ResetPass from "@/pages/main/ResetPass";
import NewPass from "@/pages/main/NewPass";
import Otp from "@/pages/main/Otp";

import Chat from "@/pages/admin/Chat";
import SettingPage from "@/pages/admin/SettingPage/SettingPage";
import Community from "@/pages/main/Community";

import About from "@/pages/main/About";
import SignUp from "@/pages/main/SignUp";
import LogIn from "@/pages/main/LogIn";

import ProtectedRoute from "@/routes/protectedRoute";
import Test from "@/pages/general/test";
import Register_Layout from "@/layouts/Register_Layout";

function App() {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<Main_Layout />}>
        <Route index element={<HomePage />} />

        <Route path="community" element={<Community />} />
      </Route>

      {/* Register layout */}

      <Route path="/register" element={<Register_Layout />}>
        <Route index element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
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

      {/* reset pass layout */}
      <Route path="/resetpass" element={<ResetPass_Layout />}>
        <Route index element={<ResetPass />} />
        <Route path="new" element={<NewPass />} />
        <Route path="otp" element={<Otp />} />
      </Route>

      <Route path="/test" element={<Test />} />
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
