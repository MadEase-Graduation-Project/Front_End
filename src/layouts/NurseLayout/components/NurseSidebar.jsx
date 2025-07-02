import { Link } from "react-router-dom";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { MdSettingsSuggest } from "react-icons/md";
import { HiUsers, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaDisease } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { cn } from "@/utils/cnUtils";

const linkStyles = cn(
  "flex items-center gap-3 pl-2 h-10 transition duration-300 ease-in text-gray-300 hover:text-[#88cce7] w-full"
);
const linkStylesSelected = cn(
  "flex items-center gap-3 pl-2 h-10 bg-[#007eb1] rounded-r transition duration-300 ease-in text-white w-full border-l-4 border-white"
);

export default function NurseSidebar({ currentPath }) {
  const iconStyles = cn(`min-w-[10px] flex-shrink-0`);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`flex flex-col bg-[#142139] shadow-lg shadow-gray-900/50 
      transition-all duration-300 ease-in-out overflow-hidden 
      ${isCollapsed ? "w-48" : "w-14"} h-screen`}
    >
      
      <div className="flex items-center justify-between px-3 py-4 text-white">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          {isCollapsed && <span className="text-lg font-semibold">MadEase</span>}
        </div>
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-start w-full gap-3 px-2">
        <NavItem to="/nurse/dashboard" isActive={currentPath === "/nurse/dashboard"}>
          <GoHomeFill className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Dashboard</span>
        </NavItem>

        <NavItem to="/nurse/patients" isActive={currentPath === "/nurse/patients"}>
          <HiUsers className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Patients</span>
        </NavItem>

        <NavItem to="/nurse/reports" isActive={currentPath === "/nurse/reports"}>
          <FaDisease className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Reports</span>
        </NavItem>

        <NavItem to="/nurse/chat" isActive={currentPath === "/nurse/chat"}>
          <HiChatBubbleBottomCenterText className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Chat</span>
        </NavItem>

        <NavItem to="/nurse/filters" isActive={currentPath === "/nurse/filters"}>
          <FiFilter className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Filters</span>
        </NavItem>
      </nav>

      {/* Bottom Section */}
      <div className="w-full mt-auto px-2 mb-4">
        <NavItem to="/nurse/profile" isActive={currentPath === "/nurse/profile"}>
          <MdSettingsSuggest className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Profile</span>
        </NavItem>
      </div>
    </div>
  );
}

function NavItem({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`${isActive ? linkStylesSelected : linkStyles} text-sm`}
    >
      {children}
    </Link>
  );
}
