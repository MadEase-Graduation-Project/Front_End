import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMYData } from "@/store/slices/userSlice";
import { selectMyDetails } from "@/store/selectors";
import { handleNameRoute } from "@/utils/urlHelpers";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import {
  MdDateRange,
  MdArticle,
  MdSettingsSuggest,
  MdChat,
} from "react-icons/md";
import { HiUsers, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaUserDoctor, FaUserShield, FaDisease } from "react-icons/fa6";
import { cn } from "@/utils/cnUtils";
import { FaDiagnoses } from "react-icons/fa";

//* links classes
const linkStyles = cn(
  "flex items-center gap-3 pl-2 h-10 transition duration-300 ease-in text-gray-300 hover:text-[#88cce7] w-full"
);
const linkStylesSelected = cn(
  "flex items-center gap-3 pl-2 h-10 bg-[#007eb1] rounded-r transition duration-300 ease-in text-white w-full border-l-4 border-white"
);
// ----------------------------------------------------------------

export default function Sidebar({ currentPath, isCollapsed }) {
  const dispatch = useDispatch();
const doctorData = useSelector(selectMyDetails);

// Fetch data on mount
useEffect(() => {
  dispatch(fetchMYData());
}, [dispatch]);

// Create slug from doctor name
const slug = useMemo(() => {
  if (doctorData?.name) {
    return handleNameRoute(doctorData.name); // e.g. "john-doe"
  }
  return "";
}, [doctorData]);

  // Define a constant for icon styles
  const iconStyles = cn(`min-w-[20px] flex-shrink-0`);

  return (
    <div
      className={`fixed top-0 left-0 flex flex-col bg-[#142139] h-screen shadow-lg shadow-gray-900/50 ${
        isCollapsed
          ? "w-screen lg:w-44 sm:w-40"
          : "hidden lg:w-14 sm:flex sm:w-12"
      } transition-all duration-300 ease-in-out  lg:p-2 overflow-hidden `}
    >
      {/*  */}
      <div className="w-full flex items-center gap-3 h-10 text-white mb-12">
        <img src="/logo.png" alt="logo" className="w-10 self-center" />
        {isCollapsed && <span className="text-xl">MadEase</span>}
      </div>
      {/*  */}
      {/* All pages in the sidebar */}
      <nav className="flex flex-col items-start w-full gap-3">
        <NavItem to={`/${slug}`} isActive={currentPath === `/${slug}`}>
  <GoHomeFill className={iconStyles} size={20} />
  <span className={isCollapsed ? "block" : "hidden"}>Main</span>
</NavItem>

<NavItem to={`/${slug}/patients`} isActive={currentPath === `/${slug}/patients`}>
  <HiUsers className={iconStyles} size={20} />
  <span className={isCollapsed ? "block" : "hidden"}>Patients</span>
</NavItem>

<NavItem to={`/${slug}/diagnosis`} isActive={currentPath === `/${slug}/diagnosis`}>
  <FaDiagnoses className={iconStyles} size={20} />
  <span className={isCollapsed ? "block" : "hidden"}>Diagnosis</span>
</NavItem>

<NavItem to={`/${slug}/advice`} isActive={currentPath === `/${slug}/advice`}>
  <MdArticle className={iconStyles} size={20} />
  <span className={isCollapsed ? "block" : "hidden"}>Advices</span>
</NavItem>

<NavItem to={`/${slug}/chat`} isActive={currentPath === `/${slug}/chat`}>
  <HiChatBubbleBottomCenterText className={iconStyles} size={20} />
  <span className={isCollapsed ? "block" : "hidden"}>Chat</span>
</NavItem>

<NavItem to={`/${slug}/settings`} isActive={currentPath === `/${slug}/settings`}>
  <MdSettingsSuggest className={iconStyles} size={20} />
  <span className={isCollapsed ? "block" : "hidden"}>Settings</span>
</NavItem>
      </nav>
      {/*  */}
    </div>
  );
}

function NavItem({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`nav-item ${isActive ? linkStylesSelected : linkStyles}`}
    >
      {children}
    </Link>
  );
}
