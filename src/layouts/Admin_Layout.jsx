import { Outlet } from "react-router-dom";
import Sidebar from "../components/AdminComps/Sidebar";
import Header from "../components/AdminComps/Header";
import { useState } from "react";

export default function Admin_Layout() {
  const [title, setTitle] = useState("Dashboard");

  return (
    <div className="flex gap-2 px-2 w-screen min-h-screen bg-gray-200">
      {/* sidebar */}
      <div className="hidden items-center  py-2 sm:flex">
        <Sidebar setTitle={setTitle} title={title} />
      </div>
      <div className="flex flex-col gap-2 w-full   ">
        {/* Header */}
        <div className="">
          <Header title={title} />
        </div>

        {/* Main content */}
        <div className="pages h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
