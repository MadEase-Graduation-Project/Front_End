import { Link } from "react-router-dom";
import Logo_navy from "../../assets/images/LogoNew_navy.svg";
import FloatingInput from "@/components/patientComps/register/FloatingInput";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import UnderLined from "../../components/patientComps/register/UnderLined";

const ResetPasswordPage = () => {
  const {
    control,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  return (
    <form
      onSubmit={handleSubmit()}
      className="w-full bg-mewhite min-h-screen flex items-center justify-center p-5"
    >
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 bg-meblue rounded-[20px] flex flex-col justify-center items-center gap-[15px]  p-10 lg:p-20 h-auto">
        <Link to="/home">
          <img
            src={Logo_navy}
            alt="Logo"
            className="w-2/3 sm:w-[200px] h-auto mb-2 cursor-pointer mx-auto"
          />
        </Link>

        <div className="w-3/4 flex flex-col justify-start gap-[5px]">
          <h2 className="self-start font-jost font-semibold text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl text-menavy mb-3">
            Recover Password
          </h2>

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
                label="Email"
                type="email"
                id="email"
                onChange={(e) => {
                  field.onChange(e);
                  if (emailTouched) clearErrors("email");
                }}
                onBlur={() => {
                  setEmailTouched(true);
                  trigger("email");
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setEmailTouched(true);
                    const valid = await trigger("email");
                    if (valid) {
                      document.querySelector("form").requestSubmit();
                    }
                  }
                }}
              />
            )}
          />
          {errors.email && emailTouched && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}
          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px]
            hover:bg-menavy/90 hover:brightness-110 duration-250"
          >
            Send Reset Code
          </button>

          <UnderLined text={"Back to Login"} link={"/resgister/login"} />
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordPage;
