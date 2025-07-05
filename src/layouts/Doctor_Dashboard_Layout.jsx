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
    <div className="flex w-screen min-h-screen bg-gray-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="z-10">
        <Sidebar isCollapsed={isCollapsed} currentPath={currentPath} />
      </aside>

      {/* Main Area */}
      <main
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          isCollapsed ? "sm:ml-40 lg:ml-44" : "sm:ml-12 lg:ml-14"
        }`}
      >
        {/* Topbar */}
       <header className="sticky top-0 z-30 backdrop-blur-md bg-white/60 shadow-sm">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </header>


        {/* Page Content */}
        <section className="flex-1 overflow-y-auto px-4 py-2">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
