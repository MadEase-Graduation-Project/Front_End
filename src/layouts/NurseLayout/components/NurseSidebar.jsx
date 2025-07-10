import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import {
  MdDateRange,
  MdSettingsSuggest,
  MdReport,
  MdEmergency,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaMicroscope, FaPills } from "react-icons/fa6";
import { cn } from "@/utils/cnUtils";


const linkStyles = cn(
  "relative group flex justify-center items-center h-12 w-12 transition duration-300 ease-in text-gray-300 hover:text-[#88cce7]"
);
const linkStylesSelected = cn(
  "relative group flex justify-center items-center h-12 w-12 bg-[#007eb1] rounded-md transition duration-300 ease-in text-white border-2 border-white"
);

export default function NurseSidebar({ currentPath }) {
  const iconStyles = cn("h-5 w-5");

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col items-center bg-[#142139] h-screen w-14 p-2 shadow-lg shadow-gray-900/50">
      <div className="mb-10">
        <img src="/logo.png" alt="logo" className="w-10 h-10" />
      </div>

      <nav className="flex flex-col gap-6">
        <NavItem to="/nurse/dashboard" label="Dashboard" isActive={currentPath === "/nurse/dashboard"}>
          <GoHomeFill className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/patients" label="Patients" isActive={currentPath === "/nurse/patients"}>
          <HiUsers className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/appointments" label="Appointments" isActive={currentPath === "/nurse/appointments"}>
          <MdDateRange className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/reports" label="Reports" isActive={currentPath === "/nurse/reports"}>
          <MdReport className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/prescriptions" label="Prescriptions" isActive={currentPath === "/nurse/prescriptions"}>
          <FaPills className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/lab-results" label="Lab Results" isActive={currentPath === "/nurse/lab-results"}>
          <FaMicroscope className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/emergencies" label="Emergencies" isActive={currentPath === "/nurse/emergencies"}>
          <MdEmergency className={iconStyles} />
        </NavItem>

        
      </nav>

      <div className="mt-auto">
        <NavItem to="/nurse/settings" label="Settings" isActive={currentPath === "/nurse/settings"}>
          <MdSettingsSuggest className={iconStyles} />
        </NavItem>
      </div>
    </div>
  );
}

function NavItem({ to, isActive, label, children }) {
  return (
    <Link
      to={to}
      className={`${isActive ? linkStylesSelected : linkStyles}`}
    >
      {children}

      {/* Tooltip عند التحويم */}
      <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-200 bg-gray-800 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap shadow-md z-50">
        {label}
      </span>
    </Link>
  );
}
