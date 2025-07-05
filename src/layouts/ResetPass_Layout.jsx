import { Outlet, Link } from "react-router-dom";
import Logo_navy from "@/assets/images/LogoNew_navy.svg";

const ResetPassLayout = () => {
  return (
    <div className="w-full bg-mewhite min-h-screen flex items-center justify-center p-5">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 bg-meblue rounded-[20px] flex flex-col justify-center items-center gap-[15px] p-10 lg:p-20 h-auto">
        <Link to="/">
          <img
            src={Logo_navy}
            alt="Logo"
            className="w-2/3 sm:w-[200px] h-auto mb-2 cursor-pointer mx-auto"
          />
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default ResetPassLayout;
