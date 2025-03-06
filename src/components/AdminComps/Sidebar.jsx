import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdDateRange, MdArticle, MdSettingsSuggest } from "react-icons/md";
import { HiUsers, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaUserDoctor, FaUserShield, FaDisease } from "react-icons/fa6";
import { cn } from "@/lib/utils";

//* links classes
const linkStyles = cn(
  "flex items-center justify-center p-2 transition duration-200 hover:scale-110 text-gray-300 hover:text-gray-100"
);
const linkStylesSelected = cn(
  "flex p-2 items-center justify-center bg-indigo-700 rounded transition duration-200 ease-in scale-110 text-white"
);
// ----------------------------------------------------------------

export default function Sidebar({ currentPath }) {
  // Define a constant for link styles
  // Define a constant for icon styles
  const iconStyles = cn("inline-block ");

  return (
    <div className="flex flex-col justify-around items-center bg-gray-800 min-h-full rounded-2xl  lg:w-16  sm:w-12">
      {/*  */}
      {/*  */}
      {/* All pages in the sidebar */}
      <nav className="flex flex-col items-center justify-center gap-3">
        <NavItem to={"/admin"} isActive={currentPath === "/admin"}>
          <GoHomeFill className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="">Overview</span>} */}
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/appointments"}
          isActive={currentPath === "/admin/appointments"}
        >
          <MdDateRange className={iconStyles} size={20} />
          {/* {isCollapsed ? null : (
            <span className="  self-center">Appointments</span>
          )} */}
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/patients"}
          isActive={currentPath === "/admin/patients"}
        >
          <HiUsers className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Patients</span>} */}
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/doctors"}
          isActive={currentPath === "/admin/doctors"}
        >
          <FaUserDoctor className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Doctors</span>} */}
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/admins"}
          isActive={currentPath === "/admin/admins"}
        >
          <FaUserShield className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Admins</span>} */}
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/diseases"}
          isActive={currentPath === "/admin/diseases"}
        >
          <FaDisease className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Diseases</span>} */}
        </NavItem>
        {/*  */}
        <NavItem
          to={"/admin/advices"}
          isActive={currentPath === "/admin/advices"}
        >
          <MdArticle className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Advices</span>} */}
        </NavItem>
        {/*  */}
        <NavItem to={"/admin/chat"} isActive={currentPath === "/admin/chat"}>
          <HiChatBubbleBottomCenterText className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Chat</span>} */}
        </NavItem>
      </nav>
      {/*  */}
      <NavItem
        to={"/admin/setting"}
        isActive={currentPath === "/admin/setting"}
      >
        <MdSettingsSuggest className={iconStyles} size={20} />
        {/* {isCollapsed ? null : <span className="  self-center">Settings</span>} */}
      </NavItem>
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
