import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";

const RouteItem = ({ isSelected, Icon, title, onClick, expanded }) => {
  return (
    <button
      onClick={onClick}
      className={` ${expanded ? "w-full" : ""} rounded-lg px-2 py-1.5 text-lg transition-[box-shadow,_background-color,_color] ${
        isSelected
          ? "bg-gray-50 text-gray-950 shadow"
          : "hover:bg-white bg-transparent text-red-500 shadow-none"
      }`}
    >
      
      {expanded ? <div className="flex items-center justify-start gap-2"><Icon className="text-2xl" /> <span>{title}</span></div> : <Icon className="text-2xl"/>}
    </button>
  );
};

  export const LogOutItem = ({expanded}) => {
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
    return(<div className="flex sticky h-12 border-t px-2 border-gray-300 top-[calc(100vh_-_48px_-_16px)] pt-1">
      <Link to="/logout" onClick={() => handleRouteClick("/logout")}>
          <RouteItem isSelected={selectedRoute === "/logout"} Icon={FiLogOut} title="Log Out" expanded={expanded}/>
        </Link>
        </div>
    )
  }
