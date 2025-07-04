import { useState, useEffect } from "react";
import NavBar from "@/components/home/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/home/Footer";

const Landing_Layout = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[100vw] bg-mewhite">
      {/* Navbar */}
      <NavBar scrolled={scrolled} />

      {/* Main Content */}
      <div className="flex-grow w-full mt-[80px] sm:mt-[100px]">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing_Layout;
