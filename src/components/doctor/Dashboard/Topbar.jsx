import React, { useEffect, useState } from "react";
import TodayDate from "../TodayDate";
import { FiSearch } from "react-icons/fi";
import { UserAvatar } from "./UserAvatar";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { fetchUserById } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Topbar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.users);
  console.log(details);
  useEffect(() => {
    dispatch(
      fetchUserById({
        id: "67ca34e0f2d6e1f39d3e1759",
        token:
        localStorage.getItem("doctorToken"),
      })
    );
  }, [dispatch]);

  console.log(details);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    if (details[0]) {
      setName(details[0].name || "");
      setEmail(details[0].email || "");
    }
  }, [details[0]]);

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/doctor":
        return `Hello, Doctor ${name}!`;
      case "/doctor/chat":
        return "Chat";
      case "/doctor/diseases":
        return "Diseases";
      case "/doctor/advice":
        return "Advice";
      case "/doctor/patients":
        return "Patients";
      case "/doctor/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="px-2 md:px-4 mt-2 md:mt-4 pb-2 md:pb-3 border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
        <div className="flex items-center gap-2">
          <button
            className="z-10 h-fit my-auto text-[#142139]"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <TbLayoutSidebarFilled
              className={`${isCollapsed ? "text-[#1e3356]" : "text-[#142139]"}`}
              size={`${isCollapsed ? 17 : 20}`}
            />
          </button>
          <div>
            <span className="text-xl md:text-3xl font-semibold block">
              {getPageTitle()}
            </span>
            <span className="text-xs md:text-sm block text-gray-500">
              <TodayDate />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-2">
          <div className="relative bg-white rounded-lg flex items-center px-2 text-sm border-1 border-gray-200 h-8 w-full md:w-64 md:mx-8">
            <FiSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent w-full placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <UserAvatar name={name} email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};
