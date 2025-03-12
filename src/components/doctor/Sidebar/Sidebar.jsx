import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdDateRange, MdArticle, MdSettingsSuggest, MdChat } from "react-icons/md";
import { HiUsers, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaUserDoctor, FaUserShield, FaDisease } from "react-icons/fa6";
import { cn } from "@/lib/utils";

//* links classes
const linkStyles = cn(
  "flex items-center gap-3 pl-2 h-10 transition duration-300 ease-in text-gray-300 hover:text-[#88cce7] w-full"
);
const linkStylesSelected = cn(
  "flex items-center gap-3 pl-2 h-10 bg-[#007eb1] rounded-r transition duration-300 ease-in text-white w-full border-l-4 border-white"
);
// ----------------------------------------------------------------

export default function Sidebar({ currentPath, isCollapsed }) {
  // Define a constant for icon styles
  const iconStyles = cn(`min-w-[20px] flex-shrink-0`);

  return (
    <div
      className={`fixed top-0 left-0 flex flex-col bg-[#142139] h-screen shadow-lg shadow-gray-900/50 ${
        isCollapsed
          ? "w-screen lg:w-44 sm:w-40"
          : "hidden lg:w-14 sm:flex sm:w-12"
      } transition-all duration-300 ease-in-out  lg:p-2 overflow-hidden `}
    >
      {/*  */}
      <div className="w-full flex items-center gap-3 h-10 text-white mb-12">
        <img src="/logo.png" alt="logo" className="w-10 self-center" />
        {isCollapsed && <span className="text-xl">MadEase</span>}
      </div>
      {/*  */}
      {/* All pages in the sidebar */}
      <nav className="flex flex-col items-start w-full gap-3">
        <NavItem to={"/doctor"} isActive={currentPath === "/doctor"}>
          <GoHomeFill className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Main</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/doctor/patients"}
          isActive={currentPath === "/doctor/patients"}
        >
          <HiUsers className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Patients</span>
        </NavItem>
        {/*  */}
        
        <NavItem
          to={"/doctor/diseases"}
          isActive={currentPath === "/doctor/diseases"}
        >
          <FaDisease className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Diseases</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/doctor/advice"}
          isActive={currentPath === "/doctor/advice"}
        >
          <MdArticle className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Advices</span>
        </NavItem>
        {/*  */}
        <NavItem to={"/doctor/chat"} isActive={currentPath === "/doctor/chat"}>
          <HiChatBubbleBottomCenterText className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Chat</span>
        </NavItem>
      </nav>
      {/*  */}
      <div className="w-full mt-auto">
        <NavItem
          to={"/doctor/settings"}
          isActive={currentPath === "/doctor/settings"}
        >
          <MdSettingsSuggest className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Settings</span>
        </NavItem>
      </div>
      {/*  */}
    </div>
  );
}

function NavItem({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`nav-item ${isActive ? linkStylesSelected : linkStyles}`}
    >
      {children}
    </Link>
  );
}
