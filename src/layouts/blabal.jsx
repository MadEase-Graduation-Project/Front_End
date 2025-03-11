import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/AdminComps/Sidebar";
import Header from "../components/AdminComps/Header";
import { useState } from "react";
import { Dashboard } from "@/components/doctor/Dashboard/Dashboard";
import { Main_Grid } from "@/pages/doctor/Main_Grid";
import { Topbar } from "@/components/doctor/Dashboard/Topbar";

export default function Blabal() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex gap-2 w-full min-h-screen bg-gray-200">
      {/* sidebar */}
      <div className="text-white z-10">
        <Sidebar currentPath={currentPath} isCollapsed={isCollapsed} />
      </div>
      <div
        className={`flex flex-col gap-2 pr-1 pb-1 w-full ${
          isCollapsed ? "sm:ml-40 lg:ml-44" : "sm:ml-12 lg:ml-14"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="">
          <Topbar />
        </div>

        {/* Main content */}
        <div className="pages h-full">
          <Main_Grid />
        </div>
      </div>
    </div>
  );
}
