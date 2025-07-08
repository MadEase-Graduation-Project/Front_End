import { useState } from "react";
import TodayDate from "@/components/doctor/TodayDate";
import { FiSearch } from "react-icons/fi";
import { UserAvatar } from "@/components/doctor/Dashboard/UserAvatar";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { useLocation } from "react-router-dom";

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  // بيانات ثابتة
  const [name] = useState("Nurse Sarah");
  const [email] = useState("snurse@gmail.com");

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/nurse") return `Hello, ${name}!`;
    if (path.startsWith("/nurse/patients")) return "Patients";
    if (path.startsWith("/nurse/appointments")) return "Appointments";
    if (path.startsWith("/nurse/reports")) return "Reports";
    if (path.startsWith("/nurse/prescriptions")) return "Prescriptions";
    if (path.startsWith("/nurse/lab-results")) return "Lab Results";
    if (path.startsWith("/nurse/emergencies")) return "Emergencies";
    if (path.startsWith("/nurse/settings")) return "Settings";
    return "Nurse Panel";
  };

  return (
    <div className="px-2 md:px-4 mt-2 md:mt-4 pb-2 md:pb-3 border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
        {/* Left Side: Title & Date */}
        <div className="flex items-center gap-2">
          <button
            className="z-10 h-fit my-auto text-[#142139]"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <TbLayoutSidebarFilled
              className={`${isCollapsed ? "text-[#1e3356]" : "text-[#142139]"}`}
              size={isCollapsed ? 17 : 20}
            />
          </button>
          <div>
            <span className="text-xl md:text-3xl font-semibold block">
              {getPageTitle()}
            </span>
            <span className="text-xs md:text-sm block text-gray-500">
              <TodayDate />
            </span>
          </div>
        </div>

        {/* Right Side: Search & Avatar */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-2">
          <div className="relative bg-white rounded-lg flex items-center px-2 text-sm border border-gray-200 h-8 w-full md:w-64 md:mx-8">
            <FiSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent w-full placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <UserAvatar name={name} email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
