import React from "react";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdDateRange, MdArticle, MdSettingsSuggest } from "react-icons/md";
import { HiUsers, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaUserDoctor, FaUserShield } from "react-icons/fa6";
import { FaVirus } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

//* links classes
const linkStyles = cn(
  "flex items-center gap-3 pl-2 h-10 transition duration-300 ease-in text-gray-300 hover:text-[#88cce7] hover:bg-[#1d2d4a] rounded-r w-full"
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
      } transition-all duration-300 ease-in-out lg:p-2 overflow-hidden z-20`}
    >
      {/* Logo and brand */}
      <div className="w-full mb-auto flex items-center gap-3 h-16 text-white p-2">
        <img
          src="/logo.png"
          alt="logo"
          className="w-10 h-10 object-contain self-center"
        />
        {/* {isCollapsed && (
          <span className="text-xl font-semibold tracking-wide">MadEase</span>
        )} */}
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col items-start justify-center gap-3 w-full py-2">
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
          <FaVirus className={iconStyles} size={20} />
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
  // Extract the icon and text from children
  const childrenArray = React.Children.toArray(children);
  // We don't use icon directly, but we need to extract text
  const text = childrenArray[1];

  // If sidebar is collapsed, wrap in tooltip
  if (!text.props.className.includes("block")) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Link
              to={to}
              className={`nav-item ${
                isActive ? linkStylesSelected : linkStyles
              }`}
            >
              {children}
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-[#142139] text-white border-[#142139]"
          >
            {text.props.children}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Regular link when sidebar is expanded
  return (
    <Link
      to={to}
      className={`nav-item ${isActive ? linkStylesSelected : linkStyles}`}
    >
      {children}
    </Link>
  );
}
