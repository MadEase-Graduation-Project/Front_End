import React, { useState, useEffect } from "react";
import { FiHome, FiLogOut, FiMessageCircle, FiSettings } from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";

const RouteItem = ({ isSelected, Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded-lg px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        isSelected
          ? "bg-gray-50 text-gray-950 shadow"
          : "hover:bg-gray-200 bg-transparent text-gray-500 shadow-none"
      }`}
    >
      <Icon />
      <span>{title}</span>
    </button>
  );
};

export const RouteSelect = () => {
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
    <div className="space-y-1">
      <Link to="/tasneem" onClick={() => handleRouteClick("/tasneem")}>
        <RouteItem isSelected={selectedRoute === "/tasneem"} Icon={FiHome} title="Main Dashboard" />
      </Link>
      <Link to="/tasneem/messages" onClick={() => handleRouteClick("/tasneem/messages")}>
        <RouteItem isSelected={selectedRoute === "/tasneem/messages"} Icon={FiMessageCircle} title="Messages" />
      </Link>
      
    </div>
  );
};
