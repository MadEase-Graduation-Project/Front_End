import TopReg from "../../../components/patientComps/register/TopReg";
import BottomBtn from "@/components/patientComps/register/BottomBtn";
import google from "@/assets/images/google.svg";
import apple from "@/assets/images/apple.svg";
import DividerText from "../../../components/patientComps/register/DividerText";
import FloatingInput from "@/components/patientComps/register/FloatingInput";
import UnderLined from "../../../components/patientComps/register/UnderLined";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

import { usePopup } from "@/contexts/PopupContext";
import { login } from "@/store/slices/signSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSignError, selectSignRole } from "@/store/selectors";
import { fetchMYData } from "@/store/slices/userSlice";
import { handleNameRoute } from "@/utils/urlHelpers";
import { selectMyDetails } from "@/store/selectors";

export default function LogIn() {
  const { setIsLoading } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isActivePopup, setActivePopup } = usePopup();
  const [hasLoginError, setHasLoginError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,

    clearErrors,
  } = useForm({ mode: "onTouched" });

  const role = useSelector(selectSignRole);
  const details = useSelector(selectMyDetails);
  const errorSign = useSelector(selectSignError);

  useEffect(() => {
    if (errorSign) {
      setActivePopup(true);
    }
  }, [errorSign]);

  useEffect(() => {
    if (role) {
      dispatch(fetchMYData());
    }
  }, [role, dispatch]);

  useEffect(() => {
    if (role && details?.name) {
      const slug = handleNameRoute(details.name);
      if (slug) {
        switch (role) {
          case "Doctor":
            navigate(`/doctor/${slug}`);
            break;
          case "Patient":
            navigate(`/`);
            break;
          case "Admin":
            navigate(`/admin/overview`);
            break;
          case "Nurse":
            navigate(`/nurse`);
            break;
          default:
            navigate("/");
            break;
        }
      }
    }
  }, [role, details, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const fieldOrder = ["email", "password"];

  useEffect(() => {
    if (isActivePopup) {
      const timer = setTimeout(() => {
        setActivePopup(false);
      }, 8000); // Auto-close after 3 seconds
      return () => clearTimeout(timer); // Cleanup
    }
  }, [isActivePopup]);

  const handleKeyDown = async (e, name) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const isValid = await trigger(name);
      const currentIndex = fieldOrder.indexOf(name);

      if (isValid) {
        if (currentIndex < fieldOrder.length - 1) {
          const nextInput = document.getElementById(
            fieldOrder[currentIndex + 1]
          );
          if (nextInput) nextInput.focus();
        } else {
          document.querySelector("form").requestSubmit();
        }
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(login(data)).unwrap();
    } catch (error) {
      console.error("Login error:", error.message);
      setIsLoading(false);
      setHasLoginError(true);
      setActivePopup(true);
    }
  };

  return (
    <form
      className="w-full h-auto flex items-center justify-center relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-3/4 flex flex-col justify-start gap-[5px]">
        <TopReg
          regtitle="Welcome Back!!"
          regnote="don't have an account?"
          reg="Sign up"
          dest="/register"
        />

        {/* Email */}
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
              id="email"
              type="email"
              hasError={hasLoginError || !!errors.email}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("email");
                setHasLoginError(false);
              }}
              onKeyDown={(e) => handleKeyDown(e, "email")}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative">
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
                id="password"
                type={showPassword ? "text" : "password"}
                hasError={hasLoginError || !!errors.email}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("password");
                  setHasLoginError(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, "password")}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <UnderLined text="Forgot your password?" link="/resetpass" />
        <button
          className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px] hover:bg-menavy/90 hover:brightness-110 duration-250"
          type="submit"
        >
          Login
        </button>
        {/* <DividerText reg="or login with" />
        <div className="flex gap-[12px]">
          <BottomBtn source={google} btn="Google" />
          <BottomBtn source={apple} btn="Apple" />
        </div> */}
      </div>
    </form>
  );
}
