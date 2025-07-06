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

//* styles
const linkStyles = cn(
  "flex justify-center items-center h-12 w-12 transition duration-300 ease-in text-gray-300 hover:text-[#88cce7]"
);
const linkStylesSelected = cn(
  "flex justify-center items-center h-12 w-12 bg-[#007eb1] rounded-md transition duration-300 ease-in text-white border-2 border-white"
);

export default function NurseSidebar({ currentPath }) {
  // قللت حجم الأيقونات من h-6 w-6 إلى h-5 w-5
  const iconStyles = cn("h-5 w-5");

  return (
    <div
      className="fixed top-0 left-0 z-50 flex flex-col items-center bg-[#142139] h-screen w-14 p-2 shadow-lg shadow-gray-900/50"
    >
      {/* Logo */}
      <div className="mb-10">
        <img src="/logo.png" alt="logo" className="w-10 h-10" />
      </div>

      {/* Nav Icons Only */}
      <nav className="flex flex-col gap-6">
        <NavItem to="/nurse/dashboard" isActive={currentPath === "/nurse/dashboard"}>
          <GoHomeFill className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/patients" isActive={currentPath === "/nurse/patients"}>
          <HiUsers className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/appointments" isActive={currentPath === "/nurse/appointments"}>
          <MdDateRange className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/reports" isActive={currentPath === "/nurse/reports"}>
          <MdReport className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/prescriptions" isActive={currentPath === "/nurse/prescriptions"}>
          <FaPills className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/lab-results" isActive={currentPath === "/nurse/lab-results"}>
          <FaMicroscope className={iconStyles} />
        </NavItem>

        <NavItem to="/nurse/emergencies" isActive={currentPath === "/nurse/emergencies"}>
          <MdEmergency className={iconStyles} />
        </NavItem>
      </nav>

      <div className="mt-auto">
        <NavItem to="/nurse/settings" isActive={currentPath === "/nurse/settings"}>
          <MdSettingsSuggest className={iconStyles} />
        </NavItem>
      </div>
    </div>
  );
}

function NavItem({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`${isActive ? linkStylesSelected : linkStyles}`}
    >
      {children}
    </Link>
  );
}
