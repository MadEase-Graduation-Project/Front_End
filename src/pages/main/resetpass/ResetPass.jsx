import FloatingInput from "@/components/patientComps/register/FloatingInput";
import UnderLined from "../../../components/patientComps/register/UnderLined";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateOtp } from "@/store/slices/otpSlice";
import { selectOtpGenerated, selectOtpLoading } from "@/store/selectors";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });

  const [emailTouched, setEmailTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectOtpLoading);
  const otpGenerated = useSelector(selectOtpGenerated);

  const onSubmit = async ({ email }) => {
    setErrorMsg("");
    try {
      const result = await dispatch(generateOtp(email)).unwrap();
      if (result?.success) {
        navigate("/resetpass/otp", { state: { email } }); // pass email to /otp page
      } else {
        setErrorMsg(result?.message || "Failed to send OTP");
      }
    } catch (err) {
      setErrorMsg("Something went wrong while sending the OTP.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full items-center justify-center"
    >
      <div className="w-full flex flex-col justify-start mx-auto gap-[5px]">
        <h2 className="self-start font-jost font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-menavy mb-2">
          Recover Password
        </h2>

        {/* Email Input */}
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

        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px]
            hover:bg-menavy/90 hover:brightness-110 duration-250 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset code"}
        </button>

        <UnderLined text={"Back to Login"} link={"/register/login"} />
      </div>
    </form>
  );
};

export default ResetPass;
