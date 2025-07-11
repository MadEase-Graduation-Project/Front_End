import React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/utils/cnUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Calendar,
  Users,
  UserCheck,
  Shield,
  Bug,
  FolderOpen,
  FileText,
  Pill,
  Settings,
  ChevronLeft,
} from "lucide-react";

//* links classes
const linkStyles = cn(
  "flex items-center gap-3 pl-2 h-10 transition duration-300 ease-in text-gray-300 hover:text-[#88cce7] hover:bg-[#1d2d4a] rounded-r w-full"
);
const linkStylesSelected = cn(
  "flex items-center gap-3 pl-2 h-10 bg-blue-600 rounded-r transition duration-300 ease-in text-white w-full border-l-4 border-white"
);
// ----------------------------------------------------------------
const navigationItems = [
  {
    id: 1,
    title: "Overview",
    href: "/admin/overview",
    icon: Home,
  },
  {
    id: 2,
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Patients",
    href: "/admin/patients",
    icon: Users,
  },
  {
    id: 4,
    title: "Doctors",
    href: "/admin/doctors",
    icon: UserCheck,
  },
  {
    id: 5,
    title: "Admins",
    href: "/admin/admins",
    icon: Shield,
  },
  {
    id: 6,
    title: "Diseases",
    href: "/admin/diseases",
    icon: Bug,
  },
  {
    id: 7,
    title: "Categories",
    href: "/admin/diseaseCategories",
    icon: FolderOpen,
  },
  {
    id: 8,
    title: "Advices",
    href: "/admin/advices",
    icon: FileText,
  },
  {
    id: 9,
    title: "Treatments",
    href: "/admin/treatments",
    icon: Pill,
  },
];
// ---------------------------

export default function Sidebar({ currentPath, isCollapsed }) {
  // Define a constant for icon styles
  const iconStyles = cn(`min-w-[20px] flex-shrink-0`);

  return (
    <div
      className={`fixed py-2 px-1 top-0 left-0 flex flex-col justify-between items-start bg-[#142139] h-screen shadow-lg shadow-gray-900/50 ${
        isCollapsed
          ? "w-screen lg:w-44 sm:w-40"
          : "hidden lg:w-14 sm:flex sm:w-12"
      } transition-all duration-300 ease-in-out lg:p-2 overflow-hidden z-20`}
    >
      {/*  */}
      <div className="flex items-center  gap-3 ">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        {isCollapsed && <span className="text-lg font-semibold">MedEase</span>}
      </div>
      {/* <div className="w-full flex items-center gap-3 h-10 text-white mb-12">
        <img src="/logo.png" alt="logo" className="w-10 self-center" />
        {isCollapsed && <span className="text-xl">MadEase</span>}
      </div> */}
      {/*  */}

      {/* Navigation links */}
      <nav className="flex flex-col items-start justify-center gap-3 w-full py-2 ">
        {navigationItems.map((item) => {
          const linkContent = (
            <NavItem
              key={item.id}
              to={item.href}
              isActive={currentPath === item.href}
            >
              <item.icon className={iconStyles} size={20} />
              <span className={isCollapsed ? "block" : "hidden"}>
                {item.title}
              </span>
            </NavItem>
          );
          return linkContent;
        })}
      </nav>
      {/*  */}
      <div className="w-full  ">
        <NavItem
          to={"/admin/setting"}
          isActive={currentPath === "/admin/setting"}
        >
          <Settings className={iconStyles} size={20} />
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
