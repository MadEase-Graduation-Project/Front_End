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
import { logout } from "@/store/slices/signSlice";
import SearchBox from "@/components/ui/SearchBox";

export default function Header({ isCollapsed, setIsCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(selectMyDetails);

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(fetchMYData());
  }, [dispatch, navigate]);

  function handleLogOut() {
    dispatch(logout());

    navigate("/register/login", { replace: true });
  }

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

      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center gap-8">
          {!isCollapsed && <h1 className="text-xl font-semibold">MadEase</h1>}
          <SearchBox />
        </div>
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
                handleLogOut();
              }}
            >
              <FiLogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
