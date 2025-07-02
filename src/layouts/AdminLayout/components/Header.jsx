import { GoBellFill } from "react-icons/go";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMYData } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectMyDetails } from "@/store/selectors";

export default function Header({ isCollapsed, setIsCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(selectMyDetails);

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(fetchMYData());
  }, [dispatch, navigate]);
  return (
    <header className="flex items-center gap-2 h-12 lg:h-14 px-2">
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

      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-semibold">MadEase</h1>
        <div className="btns flex justify-between items-center gap-4">
          <button
            className="px-2 w-8 h-8 text-gray-600 hover:text-[#954827] transition duration-200 ease-in  relative "
            aria-label="Notifications"
          >
            <GoBellFill size={18} />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="profile-btn flex items-center gap-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={userData?.ImgUrl || "https://github.com/shadcn.png"}
                    alt="User avatar"
                  />
                  <AvatarFallback>{userData?.name?.[0] || "A"}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block font-medium text-gray-900 text-sm">
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
