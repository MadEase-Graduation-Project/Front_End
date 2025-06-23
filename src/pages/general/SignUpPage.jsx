import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import Logo_white from "../../assets/images/LogoNew_white.svg";
import TopReg from "../../components/patientComps/register/TopReg";
import DividerText from "../../components/patientComps/register/DividerText";
import BottomBtn from "@/components/patientComps/register/BottomBtn";
import google from "../../assets/images/google.svg";
import apple from "../../assets/images/apple.svg";
import FloatingInput from "../../components/patientComps/register/FloatingInput";

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup data:", data);
  };

  return (
    <form
      className="w-full bg-mewhite min-h-screen flex items-center justify-center relative"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          <div className="text-left ">
            <p className="font-jost font-semibold text-4xl xl:text-5xl text-white">
              Care with ease,
              <br />
              Health with peace.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div
          className="w-full lg:w-1/2 bg-meblue rounded-[20px] lg:rounded-tr-[40px] lg:rounded-br-[40px] lg:rounded-tl-none lg:rounded-bl-none
          flex flex-col justify-center items-center gap-[15px] p-5 h-full"
        >
          <Link to="/home">
            <img
              src={Logo_navy}
              alt="Logo"
              className="block lg:hidden w-2/3 sm:w-[200px] h-auto mb-2 cursor-pointer mx-auto"
            />
          </Link>

          <div className="w-3/4 flex flex-col justify-start gap-[5px]">
            <TopReg
              regtitle={"Create an account"}
              regnote={"Already have one?"}
              reg={"Log in"}
              dest={"/login"}
            />
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <FloatingInput {...field} label="First name" id="first-name" />
              )}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}

            <Controller
              name="secondName"
              control={control}
              rules={{ required: "Second name is required" }}
              render={({ field }) => (
                <FloatingInput
                  {...field}
                  label="Second name"
                  id="second-name"
                />
              )}
            />
            {errors.secondName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.secondName.message}
              </p>
            )}

            {/* Email with validation */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FloatingInput
                  {...field}
                  label="E-mail"
                  type="email"
                  id="email"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            {/* Password with validation */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FloatingInput
                  {...field}
                  label="Password"
                  type="password"
                  id="password"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <button
              className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px]
                hover:bg-menavy/90 hover:brightness-110 duration-250"
              type="submit"
            >
              Sign up
            </button>

            <DividerText reg={"or signup with"} />
            <div className="flex gap-[12px]">
              <BottomBtn source={google} btn={"Google"} />
              <BottomBtn source={apple} btn={"Apple"} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpPage;

//justify>>with the axis of the flex
//items>>with the normal to the flex
