import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/adminComps/Sidebar";
import Header from "../components/adminComps/Header";
import { useState, useEffect } from "react";

export default function Admin_Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Get saved sidebar state from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return (
    <div className="flex  w-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="text-white z-11">
        <Sidebar currentPath={currentPath} isCollapsed={isCollapsed} />
      </div>

      {/* Main content wrapper */}
      <div
        className={`flex flex-col gap-2 pb-2 w-full ${
          isCollapsed ? "sm:ml-40 lg:ml-44" : "sm:ml-12 lg:ml-14"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-2 bg-white/70 backdrop-blur-sm shadow-sm">
          <Header
            currentPath={currentPath}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>

        {/* Main content */}
        <div className="pages h-full overflow-auto ml-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
