import React from "react";
import TodayDate from "../TodayDate";
import { AccountToggle } from "../Sidebar/AccountToggle";
import { FiSearch } from "react-icons/fi";
import { UserAvatar } from "./UserAvatar";

export const Topbar = () => {
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-gray-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            Hello, Doctor Tasneem!
          </span>
          <span className="text-xs block text-gray-500">
            <TodayDate />
          </span>
        </div>

        <div className="flex justify-end">
          <div className="relative bg-white rounded-lg flex items-center px-2 text-sm border-1 border-gray-200 mx-8 my-auto h-8 w-64">
            <FiSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <UserAvatar />
          </div>
        </div>
      </div>
    </div>
  );
};
