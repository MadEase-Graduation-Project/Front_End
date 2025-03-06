import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/AdminComps/Sidebar";
import Header from "../components/AdminComps/Header";

export default function Admin_Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex gap-2 px-2 w-screen min-h-screen bg-gray-200">
      {/* sidebar */}
      <div className="hidden items-center  py-2 sm:flex">
        <Sidebar currentPath={currentPath} />
      </div>
      <div className="flex flex-col gap-2 w-full   ">
        {/* Header */}
        <div className="">
          <Header currentPath={currentPath} />
        </div>

        {/* Main content */}
        <div className="pages h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
