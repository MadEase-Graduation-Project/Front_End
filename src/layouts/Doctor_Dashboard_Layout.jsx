import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Main_Grid } from "@/pages/doctor/Main_Grid";
import { Topbar } from "@/components/doctor/Dashboard/Topbar";
import Sidebar from "@/components/doctor/Sidebar/Sidebar";

export default function Doctor_Dashboard_Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex gap-2 w-full min-h-screen bg-gray-200">
      {/* sidebar */}
      <div className="text-white z-10">
        <Sidebar isCollapsed={isCollapsed} currentPath={currentPath}/>
      </div>
      <div
        className={`flex flex-col gap-2 pr-1 pb-1 w-full ${
          isCollapsed ? "sm:ml-40 lg:ml-44" : "sm:ml-12 lg:ml-14"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>

        {/* Main content */}
        <div className="pages h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
