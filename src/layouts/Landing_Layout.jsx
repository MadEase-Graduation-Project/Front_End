import { useState, useEffect } from "react";
import NavBar from "@/components/home/Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "@/components/home/Footer";

const Landing_Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  // const [state, setState] = useState("lllll");
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex flex-col relative w-full max-w-[100vw] min-h-screen bg-mewhite">
      <NavBar scrolled={scrolled} />
      <div className="w-full  mt-[80px] sm:mt-[100px] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Landing_Layout;
