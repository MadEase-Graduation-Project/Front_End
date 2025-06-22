import { Link } from "react-router-dom";
import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import Logo_white from "../../assets/images/LogoNew_white.svg";
import TopReg from "../../components/patientComps/register/TopReg";
import BottomBtn from "@/components/patientComps/register/BottomBtn";
import google from "../../assets/images/google.svg";
import apple from "../../assets/images/apple.svg";
import DividerText from "../../components/patientComps/register/DividerText";
import FloatingInput from "@/components/patientComps/register/FloatingInput";
import UnderLined from "../../components/patientComps/register/UnderLined";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const LogInPage = () => {
  return (
    <div className="w-full bg-mewhite min-h-screen flex items-center justify-center relative">
      <div className="absolute w-4/5 h-auto lg:h-[90vh] flex flex-col lg:flex-row items-stretch p-5">
        {/* Left side — only visible on large screens */}
        <div className="hidden lg:flex flex-col w-1/2 bg-menavy rounded-tl-[40px] rounded-bl-[40px] h-full items-center justify-center gap-10">
          <Link to="/home">
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

        {/* Right side — form */}
        <div
          className="w-full lg:w-1/2 bg-meblue rounded-[20px] lg:rounded-tr-[40px] lg:rounded-br-[40px] lg:rounded-tl-none lg:rounded-bl-none
        flex flex-col justify-center items-center gap-[15px] p-5 h-full"
        >
          {/* Logo shown only on small screens */}
          <img
            src={Logo_navy}
            className="block lg:hidden w-2/3 sm:w-[250px] h-auto p-5"
          />
          <div className="w-3/4 flex flex-col justify-start gap-[5px]">
            <TopReg
              regtitle={"Welcome Back!!"}
              regnote={"Don't have an account?"}
              reg={"Sign up"}
              dest={"/signup"}
            />
            <FloatingInput label="E-mail" type="email" id="email" />
            <FloatingInput label="Password" type="password" id="password" />
            <UnderLined text={"Forgot your password?"} link={"/resetpass"} />
            <button
              className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[48px] rounded-[5px]
              hover:bg-menavy/90 hover:brightness-110 duration-250"
              onClick={() => alert("btn clicked")}
            >
              Login
            </button>
            <DividerText reg={"or login with"} />
            <div className="flex gap-[12px]">
              <BottomBtn source={google} btn={"Google"} />
              <BottomBtn source={apple} btn={"Apple"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
//justify>>with the axis of the flex
//items>>with the normal to the flex
