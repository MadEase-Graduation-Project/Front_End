import { HospitalIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FiHome, FiLogOut, FiMessageCircle, FiSettings } from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";
import {RiHealthBookLine} from "react-icons/ri"

const RouteItem = ({ isSelected, Icon, title, onClick, expanded }) => {
  return (
    <button
      onClick={onClick}
      className={` ${expanded ? "w-full" : ""} rounded-lg px-2 py-1.5 text-lg transition-[box-shadow,_background-color,_color] ${
        isSelected
          ? "bg-white text-gray-950 shadow"
          : expanded 
            ? "hover:bg-gray-200 bg-transparent text-gray-500 shadow-none" 
            : "hover:bg-[#1e3356] bg-transparent text-gray-500 shadow-none"
      }`}
      
    >
      
      {expanded ? <div className="flex items-center justify-start gap-2"><Icon className="text-2xl" /> <span>{title}</span></div> : <Icon className={`text-2xl ${isSelected ? "text-[#37568d]" : "text-white"}`} />
    }
    </button>
  );
};

export const RouteSelect = ({expanded}) => {
  // Get the current location so we can initialize the selected route.
  const location = useLocation();
  const [selectedRoute, setSelectedRoute] = useState(location.pathname);

  // Update selectedRoute if the location changes (e.g. via browser navigation)
  useEffect(() => {
    setSelectedRoute(location.pathname);
  }, [location]);

  const handleRouteClick = (path) => {
    setSelectedRoute(path);
  };

  return (
    <div className="space-y-1 flex-col flex ">
      <Link to="/doctor" onClick={() => handleRouteClick("/doctor")}>
        <RouteItem isSelected={selectedRoute === "/doctor"} Icon={FiHome} title="Main Dashboard" expanded={expanded}/>
      </Link>
      <Link to="/doctor/messages" onClick={() => handleRouteClick("/doctor/messages")}>
        <RouteItem isSelected={selectedRoute === "/doctor/messages"} Icon={FiMessageCircle} title="Messages" expanded={expanded}/>
      </Link>
      <Link to="/doctor/diseases" onClick={() => handleRouteClick("/doctor/diseases")}>
        <RouteItem isSelected={selectedRoute === "/doctor/diseases"} Icon={RiHealthBookLine} title="Diseases" expanded={expanded}/>
      </Link>
    </div>
  );
};
