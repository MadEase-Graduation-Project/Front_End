import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import NurseSidebar from "@/layouts/NurseLayout/components/NurseSidebar";
import Header from "@/layouts/NurseLayout/components/Header";

const NURSE_PATHS = [
  "/nurse",
  "/nurse/dashboard",
  "/nurse/patients",
  "/nurse/appointments",
  "/nurse/reports",
  "/nurse/prescriptions",
  "/nurse/lab-results",
  "/nurse/emergencies",
  "/nurse/chat",
  "/nurse/settings",
];

export default function NurseLayout() {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const showSidebar = NURSE_PATHS.some((path) => pathname.startsWith(path));

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {showSidebar && (
        <NurseSidebar currentPath={pathname} isCollapsed={isCollapsed} />
      )}

      <div
        className={`flex flex-col flex-1 overflow-hidden ${
          showSidebar ? "ml-14" : ""
        }`}
      >
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-[#f5f6f8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
