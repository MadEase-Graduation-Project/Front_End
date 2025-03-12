import { Routes, Route } from "react-router-dom";
import Main_Layout from "./layouts/Main_Layout";
import Admin_Layout from "./layouts/Admin_Layout";
import Overview from "./pages/admin/Overview";
import Appointments from "./pages/admin/Appointments";
import Diseases from "./pages/admin/Diseases";
import Patients from "./pages/admin/Patients";
import Doctors from "./pages/admin/Doctors";
import Admins from "./pages/admin/Admins";
import Advices from "./pages/admin/Advices";
import Blabal from "./layouts/blabal";
import Doctor_Dashboard_Layout from "./layouts/Doctor_Dashboard_Layout";
import { Main_Grid } from "./pages/doctor/Main_Grid";
import { Messages } from "./pages/doctor/Messages";
import { Settings } from "./pages/doctor/Settings";
import { Diseases_doctor } from "./pages/doctor/Diseases_doctor";
import { Patients_doctor } from "./pages/doctor/Patients_Doctor";
import { Advice } from "./pages/doctor/Advice";

function App() {
  return (
    <Routes>
      {/* layouts and inside them their children  */}

      {/* layout like down */}
      <Route path="/" element={<Main_Layout />}></Route>
      <Route path="/blabal" element={<Blabal />}></Route>
      <Route path="doctor" element={<Doctor_Dashboard_Layout />}>
        <Route index element={<Main_Grid />} />
        <Route path="chat" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="diseases" element={<Diseases_doctor />} />
        <Route path="patients" element={<Patients_doctor />} />
        <Route path="advice" element={<Advice />} />

      </Route>
      {/* children (pages that use this layout) like down */}
      {/* <Route index element={<Home/>}/> */}

      <Route path="/admin" element={<Admin_Layout />}>
        <Route index element={<Overview />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="admins" element={<Admins />} />
        <Route path="diseases" element={<Diseases />} />
        <Route path="advices" element={<Advices />} />
      </Route>
    </Routes>
  );
}

export default App;
