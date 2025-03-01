import { Routes, Route } from "react-router-dom";
import Main_Layout from "./layouts/Main_Layout";
import Admin_Layout from "./layouts/Admin_Layout";
import Overview from "./pages/admin/Overview";
import Appointments from "./pages/admin/Appointments";
import Diseases from "./pages/admin/Diseases";

function App() {
  return (
    <Routes>
      {/* layouts and inside them their children  */}

      {/* layout like down */}
      <Route path="/" element={<Main_Layout />}>
        {/* children (pages that use this layout) like down */}
        {/* <Route index element={<Home/>}/> */}
      </Route>
      <Route path="/admin" element={<Admin_Layout />}>
        <Route index element={<Overview />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="diseases" element={<Diseases />} />
      </Route>
    </Routes>
  );
}

export default App;
