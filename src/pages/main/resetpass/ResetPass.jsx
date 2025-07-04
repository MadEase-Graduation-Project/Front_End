import FloatingInput from "@/components/patientComps/register/FloatingInput";
import UnderLined from "../../../components/patientComps/register/UnderLined";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

const ResetPass = () => {
  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  return (
    <form
      onSubmit={handleSubmit()}
      className="w-full items-center justify-center"
    >
      <div className="w-full flex flex-col justify-start mx-auto gap-[5px]">
        <h2 className="self-start font-jost font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-menavy mb-2">
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
          Send reset code
        </button>

        <UnderLined text={"Back to Login"} link={"/register/login"} />
      </div>
    </form>
  );
};

export default ResetPass;
