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
  const fieldOrder = [
    "name",
    "phone",
    "email",
    "city",
    "dateOfBirth",
    "password",
  ];

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

      if (regRes?.error) {
        showPopup(regRes.error || "Registration failed", "error");
        return;
      }

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
          rules={{ required: true }}
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="Name"
              id="name"
              hasError={!!errors.name}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("name");
              }}
              onKeyDown={(e) => handleKeyDown(e, "name")}
            />
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phone"
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              const digitsOnly = (value || "").replace(/\D/g, "");
              if (/\D/.test(value)) return false;
              if (!/^01[0125]/.test(digitsOnly)) return false;
              if (digitsOnly.length !== 11) return false;
              return true;
            },
          }}
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="Phone Number"
              id="phone"
              type="tel"
              hasError={!!errors.phone}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("phone");
              }}
              onKeyDown={(e) => handleKeyDown(e, "phone")}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          }}
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="E-mail"
              id="email"
              type="email"
              hasError={!!errors.email}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("email");
              }}
              onKeyDown={(e) => handleKeyDown(e, "email")}
            />
          )}
        />

        {/* Gender & Country */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  id="gender"
                  className={`peer w-full h-[30px] sm:h-[48px] rounded-[5px]  text-menavy bg-transparent px-4 border ${
                    errors.gender
                      ? "border-red-500 focus:ring-red-500"
                      : "border-menavyoff focus:ring-menavy"
                  } focus:ring-2 outline-none`}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("gender");
                  }}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              )}
            />
          </div>

          <div className="w-1/2">
            <Controller
              name="country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  id="country"
                  className={`peer w-full h-[30px] sm:h-[48px] rounded-[5px]  text-menavy bg-transparent px-4 border ${
                    errors.country
                      ? "border-red-500 focus:ring-red-500"
                      : "border-menavyoff focus:ring-menavy"
                  } focus:ring-2 outline-none`}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("country");
                  }}
                >
                  <option value="">Select country</option>
                  <option value="Egypt">Egypt</option>
                </select>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* City */}
          <div className="w-1/2">
            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FloatingInput
                  {...field}
                  label="City"
                  id="city"
                  hasError={!!errors.city}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("city");
                  }}
                  onKeyDown={(e) => handleKeyDown(e, "city")}
                />
              )}
            />
          </div>

          {/* Date of Birth */}
          <div className="w-1/2">
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  id="dateOfBirth"
                  type="date"
                  value={field.value || ""}
                  className={`peer w-full h-[30px] sm:h-[48px] rounded-[5px] text-menavy bg-transparent px-4 border ${
                    errors.dateOfBirth
                      ? "border-red-500 focus:ring-red-500"
                      : "border-menavyoff focus:ring-menavy"
                  } focus:ring-2 outline-none`}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("dateOfBirth");
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => (
              <FloatingInput
                {...field}
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                hasError={!!errors.password}
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
        </div>

        <button
          className="bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px] hover:bg-menavy/90 hover:brightness-110 duration-250"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
