import { Link } from "react-router-dom";
import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import FloatingInput from "@/components/patientComps/register/FloatingInput";
import { useForm, Controller } from "react-hook-form";
import api from "../../services/axios"; // Your axios instance
import { useState } from "react";
import UnderLined from "../../components/patientComps/register/UnderLined";
const ResetPasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/password-reset", {
        email: data.email,
      });
      setMessage("Reset code sent! Please check your email.");
      setErrorMsg("");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send reset code.";
      setErrorMsg(msg);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full min-h-screen bg-mewhite flex items-center justify-center p-5"
    >
      <div className="bg-meblue rounded-[20px] w-full sm:w-[90%] md:w-[70%] lg:w-[40%] p-6 flex flex-col items-center gap-6">
        <Link to="/home">
          <img
            src={Logo_navy}
            alt="Logo"
            className="w-2/3 sm:w-[200px] h-auto mb-2 cursor-pointer mx-auto"
          />
        </Link>

        <h2 className="font-jost font-semibold text-xl sm:text-2xl text-center text-menavy">
          Reset Your Password
        </h2>
        <p className="text-sm sm:text-base text-center text-menavyoff">
          Enter your email and we’ll send you a code to reset your password.
        </p>

        <div className="w-full flex flex-col gap-1">
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
              <FloatingInput {...field} label="Email" type="email" id="email" />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="bg-mepale text-white w-full h-[44px] rounded-[5px] font-jost text-base hover:bg-menavy duration-300"
        >
          Send Reset Code
        </button>
        <UnderLined text={"Back to Login"} link={"/login"} />
      </div>
    </form>
  );
};

export default ResetPasswordPage;
