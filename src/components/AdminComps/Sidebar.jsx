import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdDateRange, MdArticle, MdSettingsSuggest } from "react-icons/md";
import { HiUsers, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaUserDoctor, FaUserShield, FaDisease } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export default function Sidebar({ title, setTitle }) {
  // Define a constant for link styles
  const linkStyles = cn(
    "flex items-center justify-center p-2 transition duration-200 hover:scale-110 text-gray-300 hover:text-gray-100"
  );
  const linkStylesSelected = cn(
    "flex p-2 items-center justify-center bg-indigo-700 rounded transition duration-200 ease-in scale-110 text-white"
  );
  // Define a constant for icon styles
  const iconStyles = cn("inline-block ");

  return (
    <div className="flex flex-col justify-around items-center bg-gray-800 min-h-full rounded-2xl  lg:w-16  sm:w-12">
      {/*  */}
      {/*  */}
      {/* All pages in the sidebar */}
      <nav className="flex flex-col items-center justify-center gap-3">
        <Link
          onClick={() => setTitle("Dashboard")}
          to="/admin"
          className={title === "Dashboard" ? linkStylesSelected : linkStyles}
        >
          <GoHomeFill className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="">Overview</span>} */}
        </Link>
        {/*  */}
        <Link
          onClick={() => setTitle("Appointments")}
          to="/admin/appointments"
          className={title === "Appointments" ? linkStylesSelected : linkStyles}
        >
          <MdDateRange className={iconStyles} size={20} />
          {/* {isCollapsed ? null : (
            <span className="  self-center">Appointments</span>
          )} */}
        </Link>
        {/*  */}
        <Link
          onClick={() => setTitle("Patients")}
          to="/"
          className={title === "Patients" ? linkStylesSelected : linkStyles}
        >
          <HiUsers className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Patients</span>} */}
        </Link>
        {/*  */}
        <Link
          onClick={() => setTitle("Doctors")}
          to="/"
          className={title === "Doctors" ? linkStylesSelected : linkStyles}
        >
          <FaUserDoctor className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Doctors</span>} */}
        </Link>
        {/*  */}
        <Link
          onClick={() => setTitle("Admins")}
          to="/"
          className={title === "Admins" ? linkStylesSelected : linkStyles}
        >
          <FaUserShield className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Admins</span>} */}
        </Link>
        {/*  */}
        <Link
          onClick={() => setTitle("Diseases")}
          to="/admin/diseases"
          className={title === "Diseases" ? linkStylesSelected : linkStyles}
        >
          <FaDisease className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Diseases</span>} */}
        </Link>
        {/*  */}
        <Link
          onClick={() => setTitle("Advices")}
          to="/admin"
          className={title === "Advices" ? linkStylesSelected : linkStyles}
        >
          <MdArticle className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Advices</span>} */}
        </Link>
        {/*  */}
        <Link
          onClick={() => setTitle("Chat")}
          to="/admin"
          className={title === "Chat" ? linkStylesSelected : linkStyles}
        >
          <HiChatBubbleBottomCenterText className={iconStyles} size={20} />
          {/* {isCollapsed ? null : <span className="  self-center">Chat</span>} */}
        </Link>
        {/* <Link to="" className={linkStyles}>
          <MdSettingsSuggest className={iconStyles} size={20} />
        </Link> */}
      </nav>
      {/*  */}
      <Link
        onClick={() => setTitle("Setting")}
        to="/admin"
        className={title === "Setting" ? linkStylesSelected : linkStyles}
      >
        <MdSettingsSuggest className={iconStyles} size={20} />
        {/* {isCollapsed ? null : <span className="  self-center">Settings</span>} */}
      </Link>
      {/*  */}
    </div>
  );
}
