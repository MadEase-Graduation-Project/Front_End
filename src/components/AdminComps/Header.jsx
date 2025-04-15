import { GoBellFill } from "react-icons/go";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "@/store/Slices/Users";
import SearchBox from "./tinyComps/SearchBox";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ currentPath, isCollapsed, setIsCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { details: userData } = useSelector((state) => state.users);
  const [notificationCount, setNotificationCount] = useState(0);

  // Remove console.log in production

  // Route mapping object for better maintainability
  const routeTitleMap = {
    "/admin": "Dashboard",
    "/admin/appointments": "Appointments",
    "/admin/patients": "Patients",
    "/admin/doctors": "Doctors",
    "/admin/admins": "Admins",
    "/admin/diseases": "Diseases",
    "/admin/advices": "Advices",
    "/admin/chat": "Chat",
    "/admin/setting": "Setting",
  };

  // Memoized title to prevent unnecessary re-renders
  const title = useMemo(() => {
    return routeTitleMap[currentPath] || "Dashboard";
  }, [currentPath]);

  // Fetch user data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData(token));
    } else {
      // Redirect to login if no token
      navigate("/");
    }

    // Simulate fetching notifications
    const fetchNotifications = async () => {
      // This would be an API call in a real app
      setNotificationCount(3); // Example count
    };

    fetchNotifications();
  }, [dispatch, navigate]);
  return (
    <header className="flex items-center gap-2 h-12 lg:h-14">
      <button
        className="z-10 h-fit"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <TbLayoutSidebarFilled
          className={`${isCollapsed ? "text-gray-700" : "text-gray-900"}`}
          size={`${isCollapsed ? 17 : 20}`}
        />
      </button>

      <div className="flex justify-between gap-2 items-center w-full">
        <h1 className="text-lg sm:text-xl font-medium">{title}</h1>
        <SearchBox />
        <div className="btns flex justify-between items-center gap-4">
          <div className="relative">
            <button
              className="px-2 text-gray-600 hover:text-[#954827] transition duration-200 ease-in"
              aria-label="Notifications"
            >
              <GoBellFill size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="profile-btn flex items-center gap-2 hover:bg-gray-100 p-1 rounded-md transition-colors"
                aria-label="User profile"
              >
                <Avatar>
                  <AvatarImage
                    src={userData?.avatar || "https://github.com/shadcn.png"}
                    alt="User avatar"
                  />
                  <AvatarFallback>{userData?.name?.[0] || "A"}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">
                  {userData?.name || "Admin"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/admin/setting")}
              >
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                <FiLogOut className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
