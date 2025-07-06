import { useState, useEffect } from "react";
import NavBar from "@/components/home/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/home/Footer";
import { ChevronsUp } from "lucide-react"; // You can use any icon you like

const Landing_Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 200); // Show button after scrolling 200px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 bottom-5 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0
                     text-mepale p-3transition"
        >
          <ChevronsUp className="w-5 h-5 sm:w-8 sm:h-8" />
        </button>
      )}
    </div>
  );
};

export default Landing_Layout;
