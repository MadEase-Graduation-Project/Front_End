import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdDateRange, MdArticle, MdSettingsSuggest } from "react-icons/md";
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
      className={`fixed top-0 left-0 flex flex-col justify-between items-start bg-[#142139] h-screen shadow-lg shadow-gray-900/50 ${
        isCollapsed
          ? "w-screen lg:w-44 sm:w-40"
          : "hidden lg:w-14 sm:flex sm:w-12"
      } transition-all duration-300 ease-in-out  lg:p-2 overflow-hidden `}
    >
      {/*  */}
      <div className="w-full mb-auto flex items-center gap-3 h-10 text-white">
        <img src="/logo.png" alt="logo" className="w-10 self-center" />
        {isCollapsed && <span className="text-xl">MadEase</span>}
      </div>
      {/*  */}
      {/* All pages in the sidebar */}
      <nav className="flex flex-col items-start justify-center gap-3 w-full">
        <NavItem to={"/admin"} isActive={currentPath === "/admin"}>
          <GoHomeFill className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Overview</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/appointments"}
          isActive={currentPath === "/admin/appointments"}
        >
          <MdDateRange className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Appointments</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/patients"}
          isActive={currentPath === "/admin/patients"}
        >
          <HiUsers className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Patients</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/doctors"}
          isActive={currentPath === "/admin/doctors"}
        >
          <FaUserDoctor className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Doctors</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/admins"}
          isActive={currentPath === "/admin/admins"}
        >
          <FaUserShield className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Admins</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/diseases"}
          isActive={currentPath === "/admin/diseases"}
        >
          <FaDisease className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Diseases</span>
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/advices"}
          isActive={currentPath === "/admin/advices"}
        >
          <MdArticle className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Advices</span>
        </NavItem>
        {/*  */}
        <NavItem to={"/admin/chat"} isActive={currentPath === "/admin/chat"}>
          <HiChatBubbleBottomCenterText className={iconStyles} size={20} />
          <span className={isCollapsed ? "block" : "hidden"}>Chat</span>
        </NavItem>
      </nav>
      {/*  */}
      <div className="w-full mt-auto">
        <NavItem
          to={"/admin/setting"}
          isActive={currentPath === "/admin/setting"}
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
