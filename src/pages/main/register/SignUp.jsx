import { Link, useNavigate } from "react-router-dom";
import TopReg from "../../../components/patientComps/register/TopReg";
import DividerText from "../../../components/patientComps/register/DividerText";
import BottomBtn from "@/components/patientComps/register/BottomBtn";
import google from "@/assets/images/google.svg";
import apple from "@/assets/images/apple.svg";
import FloatingInput from "../../../components/patientComps/register/FloatingInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
// import { registerUser, loginUser } from "@/services/userApi";
import { usePopup } from "@/contexts/PopupContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { showPopup } = usePopup();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm({ mode: "onTouched" });

  const [showPassword, setShowPassword] = useState(false);
  const fieldOrder = ["name", "phone", "email", "password"];

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
      const payload = { ...data, role: "Patient" };

      const regRes = await registerUser(payload);
      console.log("Registered:", regRes);

      // 👇 Check if backend returned errors
      if (regRes?.error) {
        showPopup(regRes.error || "Registration failed", "error");
        return;
      }

      // ✅ Auto-login
      const loginRes = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (loginRes?.accessToken) {
        localStorage.setItem("accessToken", loginRes.accessToken);
        localStorage.setItem("userRole", loginRes.Role || "Patient");
        navigate("/home");
      } else {
        showPopup("Registered but couldn't log in automatically", "warning");
      }
    } catch (err) {
      console.error("Signup error:", err);
      showPopup("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <form
      className="w-full h-auto flex items-center justify-center relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-3/4 flex flex-col justify-start gap-[5px]">
        <TopReg
          regtitle="Create an account"
          regnote="already have one?"
          reg="Log in"
          dest="/register/login"
        />

        {/* Name */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="Name"
              id="name"
              onChange={(e) => {
                field.onChange(e);
                clearErrors("name");
              }}
              onKeyDown={(e) => handleKeyDown(e, "name")}
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}

        {/* Phone Number */}
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Phone number is required",
            validate: (value) => {
              const digitsOnly = (value || "").replace(/\D/g, "");

              if (/\D/.test(value)) return "Only numbers are allowed";
              if (!/^01[0125]/.test(digitsOnly))
                return "Phone number must start with 010, 011, 012, or 015";
              if (digitsOnly.length < 11)
                return "Phone number must be exactly 11 digits";
              if (digitsOnly.length > 11)
                return "Phone number can't exceed 11 digits";
              return true;
            },
          }}
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="Phone Number"
              id="phone"
              type="tel"
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("phone");
              }}
              onKeyDown={(e) => handleKeyDown(e, "phone")}
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}

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
              onChange={(e) => {
                field.onChange(e);
                clearErrors("email");
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
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("password");
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

        <button
          className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px] hover:bg-menavy/90 hover:brightness-110 duration-250"
          type="submit"
        >
          Sign up
        </button>

        <DividerText reg="or signup with" />
        <div className="flex gap-[12px]">
          <BottomBtn source={google} btn="Google" />
          <BottomBtn source={apple} btn="Apple" />
        </div>
      </div>
    </form>
  );
}
