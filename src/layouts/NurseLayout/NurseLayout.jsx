import { Outlet, useLocation } from "react-router-dom";
import NurseSidebar from "@/layouts/NurseLayout/components/NurseSidebar";
import Header from "@/layouts/NurseLayout/components/Header";

const NURSE_PATHS = [
   "/nurse", 
  "/nurse/dashboard",
  "/nurse/patients/",
  "/nurse/reports",
  "/nurse/chat",
  "/nurse/profile",
  "/nurse/filters"
];

export default function NurseLayout() {
  const { pathname } = useLocation();
  const showSidebar = NURSE_PATHS.some(path => pathname.startsWith(path));

  return (
    <div className="flex h-screen bg-gray-100">
      
      {showSidebar && (
        <NurseSidebar currentPath={pathname} />
      )}

      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-[#f5f6f8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
