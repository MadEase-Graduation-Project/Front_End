import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import { User, Mail, Menu } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
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

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Dark Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22><path d=%22M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z%22/></svg>'), auto]" />
      )}

      {/* Sidebar Menu */}
      <div
        ref={menuRef}
        className={`
          fixed z-50 bg-mewhite shadow-xl px-6 pt-6 transition-transform duration-300 ease-in-out
          lg:hidden
   ${
     menuOpen
       ? "opacity-100 pointer-events-auto"
       : "opacity-0 pointer-events-none"
   }
          ${
            menuOpen
              ? "translate-y-0 sm:translate-x-0 sm:translate-y-0"
              : "translate-y-full sm:translate-x-[-100%] sm:translate-y-0"
          }

          w-full sm:w-[300px]
          bottom-0 sm:top-0 left-0
          h-[80%] sm:h-full
          rounded-t-[20px] sm:rounded-tl-none sm sm:rounded-r-[20px]
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
              onClick={() => {
                setMenuOpen(false);
                if (location.pathname === path) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate(path);
                }
              }}
              className="font-jost text-base text-menavy font-semibold text-left"
            >
              {label}
            </button>
          ))}

          <Link
            to="/medbot"
            onClick={() => setMenuOpen(false)}
            className="font-jost text-base text-transparent bg-gradient-to-r from-red-400 via-pink-400 to-meyellow bg-clip-text font-semibold bg-[length:200%] animate-gradient-x"
          >
            Ask Medbot
          </Link>
        </nav>
      </div>

      {/* Top Navbar */}
      <nav
        className={`w-full h-[80px] sm:h-[100px] bg-mewhite px-4 sm:px-8 py-4 fixed top-0 left-0 z-30 
        transition-all duration-200 ${scrolled ? "shadow-2xl" : "shadow-md"}`}
      >
        <div className="relative w-full h-full flex items-center justify-between">
          {/* Hamburger */}
          <button className="lg:hidden z-40" onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 sm:w-7 text-menavy" />
          </button>
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
          >
            <img
              src={Logo_navy}
              alt="Logo"
              className="h-12 xs:h-14 sm:h-16 object-contain z-40"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-20 z-40">
            {navItems.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => {
                  if (location.pathname === path) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate(path);
                  }
                }}
                className="font-jost text-base lg:text-lg xl:text-xl text-menavy font-semibold"
              >
                {label}
              </button>
            ))}

            <Link
              to="/medbot"
              className="font-jost text-base lg:text-lg xl:text-xl text-transparent bg-gradient-to-r from-red-400 via-pink-400 to-meyellow bg-clip-text font-semibold bg-[length:200%] animate-gradient-x"
            >
              Ask Medbot
            </Link>
          </div>

          {/* top right navigation icons*/}

          <div className="flex gap-2 sm:gap-3 md:gap-5 items-center justify-center text-menavy ">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 " />
            <button
              onClick={() => navigate("/register")} // <-- useNavigate from react-router-dom
              className="z-40  transition duration-300 
    flex items-center justify-center"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 text-menavy" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
