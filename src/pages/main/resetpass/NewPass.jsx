// File: NewPass.jsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordOTP } from "@/store/slices/otpSlice";
import FloatingInput from "@/components/patientComps/register/FloatingInput";
import UnderLined from "@/components/patientComps/register/UnderLined";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);

  const onSubmit = ({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      setMismatchError(true);
      return;
    }

    setMismatchError(false);
    dispatch(
      resetPasswordOTP({ resetToken: token, newPassword, confirmPassword })
    )
      .unwrap()
      .then(() =>
        navigate("/register/login", { state: { successReset: true } })
      )
      .catch(() => alert("Failed to reset password."));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full flex flex-col justify-start mx-auto gap-[5px]">
        {/* New Password */}
        <div className="relative">
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <FloatingInput
                {...field}
                label="New Password"
                id="newPassword"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("newPassword");
                  setMismatchError(false);
                }}
              />
            )}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
            }}
            render={({ field }) => (
              <FloatingInput
                {...field}
                label="Confirm Password"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("confirmPassword");
                  setMismatchError(false);
                }}
              />
            )}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Mismatch Error */}
        {mismatchError && (
          <div className="animate-slide-up bg-red-100 text-red-800 border border-red-300 rounded-xl px-3 py-2 shadow-md transition-all duration-700 ease-in-out text-center">
            <p className="text-sm font-medium">Passwords do not match</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px]
          hover:bg-menavy/90 hover:brightness-110 duration-250"
        >
          Save changes
        </button>

        <UnderLined text="Back" link="/resetpass/otp" />
      </div>
    </form>
  );
};

export default NewPass;
