// NavBar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import { User, Mail, Menu } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { fetchMYData } from "@/store/slices/userSlice";

// ↳ selectors coming from the sign slice
import {
  selectSignUser,
  selectSignRole,
} from "@/store/selectors/signSelectors";

/* ------------------------------------------------------------------ */
/* Links shown in both desktop and mobile menus                       */
const navItems = [
  { label: "Medical blogs", path: "/community" },
  { label: "Location", path: "/location" },
  { label: "Doctors", path: "/doctors" },
  { label: "About us", path: "/about" },
];

const NavBar = ({ scrolled }) => {
  /* --- side‑menu state & refs ------------------------------------ */
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* --- router helpers ------------------------------------------- */
  const navigate = useNavigate();
  const location = useLocation();

  /* --- auth state (Redux) --------------------------------------- */
  const currentUser = useSelector(selectSignUser); // null if not logged in
  const currentRole = useSelector(selectSignRole); // e.g. 'patient' | 'doctor'
  const isLoggedIn = Boolean(currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRole) {
      dispatch(fetchMYData());
    }
  }, [dispatch, currentRole]);
  /* --- close side‑menu on outside click ------------------------- */
  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  /* -------------------------------------------------------------- */
  /* Convenience helpers                                            */
  /* -------------------------------------------------------------- */
  const goTo = (path) => {
    setMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  /* Where the user‑icon should send the user                       */
  const userTarget =
    isLoggedIn && currentRole === "Doctor" ? "/settings" : "/register";
  /* -------------------------------------------------------------- */
  return (
    <>
      {/* ── dark overlay behind mobile menu ─────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── mobile side‑drawer ──────────────────────────────────── */}
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

      {/* ── main (top) navbar ───────────────────────────────────── */}
      <nav
        className={`w-full h-[80px] sm:h-[100px] bg-mewhite px-4 sm:px-8 py-4 fixed top-0 left-0 z-30
        transition-shadow duration-200 ${
          scrolled ? "shadow-2xl" : "shadow-md"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-between">
          {/* hamburger (mobile) */}
          <button className="lg:hidden z-40" onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 sm:w-7 text-menavy" />
          </button>

          {/* logo (click to top) */}
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

          {/* desktop nav links */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-20 z-40">
            {navItems.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => goTo(path)}
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

          {/* right‑hand icons */}
          <div className="flex gap-2 sm:gap-3 md:gap-5 items-center text-menavy">
            {/* mail icon shows ONLY when logged in  */}
            {isLoggedIn && (
              <button onClick={() => navigate("/test")} className="relative">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7" />
              </button>
            )}

            {/* user icon   */}
            <button
              onClick={() => navigate(userTarget)}
              className="flex items-center justify-center z-40 transition"
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
