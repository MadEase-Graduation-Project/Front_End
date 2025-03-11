import { Dashboard } from "@/components/doctor/Dashboard/Dashboard";
import { Sidebar } from "@/components/doctor/Sidebar/Sidebar";
import React, { useState } from "react";

export const Doctor_Dashboard_Layout = () => {
  const [expanded, setExpanded] = useState(true); // Manage sidebar state at parent level

  return (
    <div className="bg-gray-200 gap-4 p-4 flex">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <div
        className={`${
          expanded ? "w-[calc(100vw_-_256px)]" : "w-[calc(100vw_-_56px)]"
        }`}
      >
        <Dashboard />
      </div>
    </div>
  );
};
