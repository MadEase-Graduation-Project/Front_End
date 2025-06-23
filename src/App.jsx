import { Routes, Route } from "react-router-dom";
import Main_Layout from "@/layouts/Main_Layout";
import Admin_Layout from "@/layouts/Admin_Layout";
import Overview from "@/pages/admin/Overview";
import Appointments from "@/pages/admin/Appointments";
import Diseases from "@/pages/admin/Diseases";
import Patients from "@/pages/admin/Patients";
import Doctors from "@/pages/admin/Doctors";
import Admins from "@/pages/admin/Admins";
import Advices from "@/pages/admin/Advices";
import Doctor_Dashboard_Layout from "./layouts/Doctor_Dashboard_Layout";
import { Main_Grid } from "./pages/doctor/Main_Grid";
import { Messages } from "./pages/doctor/Messages";
import { Settings } from "./pages/doctor/Settings";
import { Diseases_doctor } from "./pages/doctor/Diseases_doctor";
import { Patients_doctor } from "./pages/doctor/Patients_Doctor";
import { Advice } from "./pages/doctor/Advice";
import HomePage from "./pages/general/HomePage";
import Register from "./pages/general/Register";
import Chat from "@/pages/admin/Chat";
import Setting from "@/pages/admin/Setting";
import HomePage from "@/pages/main/HomePage";
import Community from "@/pages/main/Community";
import About from "@/pages/main/About";
import SignUp from "@/pages/main/SignUp";
import SignIn from "@/pages/main/SignIn";
import ProtectedRoute from "@/routes/protectedRoute";


function App() {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<Main_Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="community" element={<Community />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* doctor layout */}
      <Route path="doctor" element={<Doctor_Dashboard_Layout />}>
        <Route index element={<Main_Grid />} />
        <Route path="chat" element={<Messages />} />
        <Route path="settings" element={<Setting />} />
        <Route path="diseases" element={<Diseases_doctor />} />
        <Route path="patients" element={<Patients_doctor />} />
        <Route path="advice" element={<Advice />} />
      </Route>

      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      {/* admin layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin_Layout />
          </ProtectedRoute>
        }
      >
        <Route path="overview" element={<Overview />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="admins" element={<Admins />} />
        <Route path="diseases" element={<Diseases />} />
        <Route path="advices" element={<Advices />} />
        <Route path="setting" element={<Setting />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
