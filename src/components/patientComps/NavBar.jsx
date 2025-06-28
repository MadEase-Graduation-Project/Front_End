import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import hambmenu from "../../assets/images/hambmenu.svg";
import { IoClose } from "react-icons/io5";

const navItems = ["Medical blogs", "Location", "Ask MedBot", "Doctors"];

const NavBar = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22><path d=%22M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z%22/></svg>'), auto]" />
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
          {navItems.map((item) => (
            <p
              key={item}
              className="font-jost text-base text-menavy font-semibold"
            >
              {item}
            </p>
          ))}
        </nav>
      </div>

      {/* Top Navbar */}
      <nav
        className={`w-full h-[100px] bg-mewhite px-4 sm:px-8 py-4 fixed top-0 left-0 z-30 
        transition-all duration-200 ${scrolled ? "shadow-2xl" : "shadow-md"}`}
      >
        <div className="relative w-full h-full flex items-center justify-between">
          {/* Hamburger */}
          <button className="lg:hidden z-40" onClick={() => setMenuOpen(true)}>
            <img src={hambmenu} alt="Menu" className="w-6 sm:w-7" />
          </button>

          {/* Logo */}
          <img
            src={Logo_navy}
            alt="Logo"
            className="h-14 sm:h-16 object-contain z-40"
          />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-20 z-40">
            {navItems.map((item) => (
              <p
                key={item}
                className="font-jost text-base lg:text-xl text-menavy font-semibold"
              >
                {item}
              </p>
            ))}
          </div>

          {/* Register Button */}
          <Link
            to="/register"
            className="z-40 bg-menavy hover:bg-menavy/90 transition duration-300 
            text-white text-xs sm:text-sm md:text-base lg:text-lg font-jost font-light 
            px-4 py-1.5 rounded-[10px] flex items-center justify-center"
          >
            Register
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
