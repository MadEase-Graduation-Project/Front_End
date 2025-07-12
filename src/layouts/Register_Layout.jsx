import { Link, Outlet } from "react-router-dom";
import Logo_navy from "@/assets/images/LogoNew_navy.svg";
import Logo_white from "@/assets/images/LogoNew_white.svg";

import { usePopup } from "@/contexts/PopupContext";
import { useState } from "react";

const Register_Layout = () => {
  const { isActivePopup, popupType } = usePopup();
  const [isLoading, setIsLoading] = useState();

  function signLoadin() {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-jost font-light">
              Logging in...
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="w-full bg-mewhite min-h-screen flex items-center justify-center relative">
      <div className="absolute w-4/5 h-auto lg:h-[90vh] flex flex-col lg:flex-row items-stretch p-5">
        <div className="hidden lg:flex flex-col w-1/2 bg-menavy rounded-tl-[40px] rounded-bl-[40px] h-full items-center justify-center gap-10">
          <Link to="/">
            <img
              src={Logo_white}
              alt="Logo"
              className="h-auto p-5 cursor-pointer"
            />
          </Link>
          <div className="text-left">
            <p className="font-jost font-semibold text-4xl xl:text-5xl text-white">
              Care with ease,
              <br />
              Health with peace.
            </p>
          </div>
        </div>

        {isActivePopup && (
          <div className="absolute top-10 lg:top-10 left-1/2 lg:left-3/4 transform -translate-x-1/2 w-[80%] md:w-[70%] lg:w-[60%] max-w-[400px] z-50">
            <div
              className={`animate-slide-up rounded-xl px-3 sm:px-5 py-2 sm:py-3 shadow-md transition-all duration-700 ease-in-out text-center ${
                popupType === "confirmation"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              <p className="text-[11px] sm:text-sm md:text-base font-medium">
                {popupType === "confirmation"
                  ? "An email has been sent to confirm your account. Please check your inbox."
                  : "Invalid email or password"}
              </p>
            </div>
          </div>
        )}

        <div className="w-full lg:w-1/2 bg-meblue rounded-[20px] lg:rounded-tr-[40px] lg:rounded-br-[40px] lg:rounded-tl-none lg:rounded-bl-none flex flex-col justify-center items-center gap-[15px] p-5 h-full">
          <Link to="/">
            <img
              src={Logo_navy}
              alt="Logo"
              className="block lg:hidden w-2/3 sm:w-[200px] h-auto mb-2 cursor-pointer mx-auto"
            />
          </Link>
          <Outlet context={{ setIsLoading }} />
        </div>
      </div>
      {signLoadin()}
    </div>
  );
};

export default Register_Layout;
