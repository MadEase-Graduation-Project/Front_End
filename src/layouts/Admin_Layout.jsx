import { Outlet } from "react-router-dom";
import Sidebar from "../components/AdminComps/Sidebar";
import Header from "../components/AdminComps/Header";
import { useState } from "react";

export default function Admin_Layout() {
  const [title, setTitle] = useState("Dashboard");

  return (
    <div className="flex w-screen min-h-screen bg-gray-200">
      {/* sidebar */}
      <div className="flex items-center p-2">
        <Sidebar setTitle={setTitle} title={title} />
      </div>
      <div className="flex flex-col gap-2 w-full p-2">
        {/* Header */}
        <Header title={title} />
        {/* Main content */}
        <div className="pages h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
