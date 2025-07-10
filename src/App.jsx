import { Routes, Route } from "react-router-dom";

import LogInPage from "./pages/general/LogInPage";
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
import Messages from "@/pages/doctor/Messages";
import { Diseases_doctor } from "@/pages/doctor/Diseases_doctor";
import { Patients_doctor } from "@/pages/doctor/Patients_doctor";
import { Advice } from "@/pages/doctor/Advice";

import ResetPass_Layout from "@/layouts/ResetPass_Layout";
import ResetPass from "@/pages/main/resetpass/ResetPass";
import NewPass from "@/pages/main/resetpass/NewPass";
import Otp from "@/pages/main/resetpass/Otp";

import SettingPage from "@/pages/admin/SettingPage/SettingPage";

import Community from "@/pages/main/Community/Community";
import Doctors from "@/pages/patient/Doctors/Doctors";
import MedBot from "@/pages/patient/MedBot/MedBot";
import Settings from "@/pages/patient/Settings/Settings";

import SignUp from "@/pages/main/register/SignUp";
import LogIn from "@/pages/main/register/LogIn";
import Landing_Layout from "@/layouts/Landing_Layout";
import Home from "@/pages/main/Home/Home";
import Test from "@/pages/general/Test";
import Register_Layout from "@/layouts/Register_Layout";

import AdviceBlogPost from "@/pages/main/AdviceBlogPost";
import NurseApp from "@/NurseApp";
import DiseasesCategoriesPage from "./pages/admin/DiseasesCategoriesPage/DiseasesCategoriesPage";
import Diagnosis_doctor from "./pages/doctor/Diagnosis_doctor";

import TreatmentsPage from "./pages/admin/TreatmentsPage/TreatmentsPage";
import { Settingss } from "./pages/doctor/Settingss";
import About from "./pages/main/About";

import ShowProfile from "./pages/admin/UsersPages/components/ShowProfile";
import ShowTreatment from "./pages/admin/TreatmentsPage/components/ShowTreatment";
import ShowAppointment from "./pages/admin/AppointmentsPage/components/ShowAppointment";
import ShowDisease from "./pages/admin/DiseasesPage/components/ShowDisease";
import ShowDiseaseCategory from "./pages/admin/DiseasesCategoriesPage/components/ShowDiseaseCategory";
import Messenger from "./pages/patient/Messenger/Messenger";
import { Ads } from "./pages/doctor/Ads";
import { Treatments } from "./pages/doctor/Treatments";

function App() {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<Landing_Layout />}>
        <Route index element={<Home />} />
        <Route path="community" element={<Community />} />
        <Route path="community/:id" element={<AdviceBlogPost />} />
        <Route path="doctors" element={<Doctors />} />
        {/* <Route path="doctors/" element={</>} /> */}
        <Route path="settings" element={<Settings />} />
        <Route path="messenger" element={<Messenger />} />
        <Route path="about" element={<About />} />
        {/* <Route path="location" element={< />} /> */}
      </Route>

      {/* Register layout */}

      <Route path="/register" element={<Register_Layout />}>
        <Route index element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
      </Route>


      {/* reset pass layout */}
      <Route path="/resetpass" element={<ResetPass_Layout />}>
        <Route index element={<ResetPass />} />
        <Route path="new" element={<NewPass />} />
        <Route path="otp" element={<Otp />} />
      </Route>

      <Route path="/test" element={<Test />} />
      {/* children (pages that use this layout) like down */}
      {/* <Route index element={<Home/>}/> */}

      <Route path="/medbot" element={<MedBot />} />
      {/* admin layout */}
      <Route path="/admin" element={<Admin_Layout />}>
        <Route path="overview" element={<OverviewPage />} />
        {/* for appointment pages */}
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="appointment/:id" element={<ShowAppointment />} />
        {/* for users and their pages -----------------------------*/}
        <Route path="patients" element={<PatientsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="admins" element={<AdminsPage />} />
        <Route path="profile/:id" element={<ShowProfile />} />
        {/* for disease pages ------------------------------ */}
        <Route path="diseases" element={<DiseasesPage />} />
        <Route path="disease/:id" element={<ShowDisease />} />
        {/* for diseaseCategory pages ------------------------------ */}
        <Route path="diseaseCategories" element={<DiseasesCategoriesPage />} />
        <Route path="diseaseCategory/:id" element={<ShowDiseaseCategory />} />
        {/* for advice pages ------------------------------ */}
        <Route path="advices" element={<AdvicesPage />} />
        {/* for treatment and its pages -----------------------*/}
        <Route path="treatments" element={<TreatmentsPage />} />
        <Route path="treatment/:id" element={<ShowTreatment />} />
        {/* ---------------------------------------------------- */}
        <Route path="setting" element={<SettingPage />} />
      </Route>

      {/* nurse layout */}
      <Route path="nurse/*" element={<NurseApp />} />

      {/* doctor layout */}
    <Route path="/doctor/:doctorName" element={<Doctor_Dashboard_Layout />}>
        <Route index element={<Main_Grid />} />
        <Route path="chat" element={<Messages />} />
        <Route path="diagnosis" element={<Diagnosis_doctor />} />
        <Route path="patients" element={<Patients_doctor />} />
        <Route path="advice" element={<Advice />} />
        <Route path="settings" element={<Settingss />} />
        <Route path="ads" element={<Ads />} />
        <Route path="treatments" element={<Treatments />} />
        <Route path="diseases" element={<Diseases_doctor />} />
      </Route>
    </Routes>
  );
}

export default App;
