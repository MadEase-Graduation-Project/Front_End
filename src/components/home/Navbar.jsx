import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import { User, Mail, Menu } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

import { fetchMYData } from "@/store/slices/userSlice";
import { logout } from "@/store/slices/signSlice";

// Selectors
import { selectMyDetails } from "@/store/selectors/userSelectors";

// UI primitives
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Medical blogs", path: "/community" },
  { label: "Location", path: "/location" },
  { label: "Doctors", path: "/doctors" },
  { label: "About us", path: "/about" },
];

const NavBar = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const myDetails = useSelector(selectMyDetails);
  const currentRole = myDetails?.role || localStorage.getItem("role") || null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!myDetails?.role && token) {
      dispatch(fetchMYData());
    } else if (myDetails?.role === "Patient") {
      dispatch(fetchMYData());
    }
  }, [dispatch, myDetails?.role]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  const goTo = (path) => {
    setMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/register/login", { replace: true });
  };

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        ref={menuRef}
        className={`
          fixed z-50 bg-mewhite shadow-xl px-6 pt-6 transition-transform duration-300
          lg:hidden
          ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          ${
            menuOpen
              ? "translate-y-0 sm:translate-x-0"
              : "translate-y-full sm:-translate-x-full sm:translate-y-0"
          }
          w-full sm:w-[300px] bottom-0 sm:top-0 left-0 h-[80%] sm:h-full
          rounded-t-[20px] sm:rounded-tl-none sm:rounded-br-[20px] sm:rounded-r-[20px]
        `}
      >
        <div className="flex justify-end mb-6">
          <button onClick={() => setMenuOpen(false)}>
            <IoClose className="text-2xl text-menavy" />
          </button>
        </div>

        <nav className="flex flex-col gap-10">
          {navItems.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => goTo(path)}
              className="font-jost text-base text-menavy font-semibold text-left transition hover:text-mepale hover:brightness-110 duration-250"
            >
              {label}
            </button>
          ))}

          <Link
            to="/medbot"
            onClick={() => setMenuOpen(false)}
            className="font-jost text-base text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text font-semibold bg-[length:200%] animate-gradient-x"
          >
            Ask Medbot
          </Link>
        </nav>
      </div>

      <nav
        className={`w-full h-[80px] sm:h-[100px] bg-mewhite px-4 sm:px-8 py-4 fixed top-0 left-0 z-30 transition-shadow duration-200 ${
          scrolled ? "shadow-2xl" : "shadow-md"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-between">
          <button className="lg:hidden z-40" onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 sm:w-7 text-menavy" />
          </button>

          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              location.pathname === "/"
                ? window.scrollTo({ top: 0, behavior: "smooth" })
                : navigate("/");
            }}
          >
            <img
              src={Logo_navy}
              alt="Logo"
              className="h-12 xs:h-14 sm:h-16 object-contain z-40"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-10 xl:gap-20 z-40">
            {navItems.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => goTo(path)}
                className="font-jost text-base lg:text-lg xl:text-xl text-menavy font-semibold transition hover:text-mepale hover:brightness-110 duration-250"
              >
                {label}
              </button>
            ))}

            <Link
              to="/medbot"
              className="font-jost text-base lg:text-lg xl:text-xl text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text font-semibold bg-[length:200%] animate-gradient-x"
            >
              Ask Medbot
            </Link>
          </div>

          <div className="flex gap-2 sm:gap-3 md:gap-5 items-center text-menavy">
            {currentRole === "Patient" && (
              <button onClick={() => navigate("/test")} aria-label="Messages">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7" />
              </button>
            )}

            {currentRole === "Patient" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="profile-btn flex items-center gap-1">
                    <Avatar className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9">
                      <AvatarImage
                        src={
                          myDetails?.ImgUrl || "https://github.com/shadcn.png"
                        }
                        alt="User avatar"
                      />
                      <AvatarFallback className="bg-menavy text-white text-xs">
                        {myDetails?.name?.[0] || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block font-medium text-gray-900 text-sm">
                      {myDetails?.name || "Patient"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/settings")}
                  >
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={handleLogOut}
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="z-40 transition flex items-center justify-center"
                aria-label="/Settings"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 text-menavy" />
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
