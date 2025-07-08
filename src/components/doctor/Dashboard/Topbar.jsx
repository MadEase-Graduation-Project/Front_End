import React, { useEffect, useMemo, useState } from "react";
import TodayDate from "../TodayDate";
import { FiSearch } from "react-icons/fi";
import { UserAvatar } from "./UserAvatar";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { selectMyDetails } from "@/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchMYData } from "@/store/slices/userSlice";
import SearchBar from "./SearchBar";
import { handleNameRoute } from "@/utils/urlHelpers";

export const Topbar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const details = useSelector(selectMyDetails);

  useEffect(() => {
    dispatch(fetchMYData());
  }, [dispatch]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (details) {
      setName(details.name || "");
      setEmail(details.email || "");
    }
  }, [details]);

  const doctorSlug = useMemo(() => {
    return details?.name ? handleNameRoute(details.name) : "";
  }, [details]);

  const path = location.pathname;

  const getPageTitle = () => {
    if (!doctorSlug) return "";

    switch (path) {
      case `/${doctorSlug}`:
        return `Hello, Doctor ${details?.name || ""}!`;
      case `/${doctorSlug}/chat`:
        return "Chat";
      case `/${doctorSlug}/diagnosis`:
        return "Diagnosis";
      case `/${doctorSlug}/advice`:
        return "Advice";
      case `/${doctorSlug}/patients`:
        return "Patients";
      case `/${doctorSlug}/settings`:
        return "Settings";
      case `/${doctorSlug}/ads`:
        return "Advertisements";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="px-2 md:px-4 pt-2 md:pt-4 pb-2 md:pb-3 bg-gray-50 border-gray-200">
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
          <SearchBar />
          <div>
            <UserAvatar name={name} email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};
