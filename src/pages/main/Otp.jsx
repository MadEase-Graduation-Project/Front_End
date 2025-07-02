import { useState } from "react";
import UnderLined from "@/components/patientComps/register/UnderLined";
import {
  Check,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [hasError, setHasError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setHasError(false);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    setIsVerifying(true);
    setNotification(null);

    await new Promise((res) => setTimeout(res, 1500));

    if (code !== "123456") {
      setHasError(true);
      setNotification({
        type: "error",
        message: "Invalid verification code. Please try again.",
      });
    } else {
      setNotification({
        type: "success",
        message: "Code verified successfully!",
      });
    }

    setIsVerifying(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    setNotification(null);
    await new Promise((res) => setTimeout(res, 1500));
    setNotification({
      type: "success",
      message: "Verification code has been resent.",
    });
    setIsResending(false);
  };

  const NotificationBanner = ({ notification, onClose }) => {
    if (!notification) return null;

    return (
      <div
        className={`mt-2 p-3 rounded-lg border-l-4 flex items-start gap-3 text-sm ${
          notification.type === "success"
            ? "bg-green-50 border-green-400 text-green-800"
            : "bg-red-50 border-red-400 text-red-800"
        }`}
      >
        {notification.type === "success" ? (
          <CheckCircle size={18} className="mt-0.5" />
        ) : (
          <AlertCircle size={18} className="mt-0.5" />
        )}
        <div className="flex-1">
          <p className="font-medium">{notification.message}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={14} />
        </button>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full flex flex-col justify-start mx-auto gap-[5px]">
        <p className="text-menavy text-center text-sm mb-4">
          Please enter the 6-digit code sent to your email.
        </p>

        <div className="grid grid-cols-6 gap-[5px] w-full">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              placeholder="•"
              className={`w-full aspect-square h-12 sm:h-16 text-center text-base sm:text-xl lg:text-2xl font-semibold text-menavy rounded-md bg-white border focus:ring-2 outline-none ${
                hasError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-menavyoff focus:ring-menavy"
              }`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <NotificationBanner
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <button
          type="submit"
          disabled={isVerifying}
          className="flex items-center justify-center gap-2 bg-mepale font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[30px] sm:h-[48px] rounded-[5px] hover:bg-menavy/90 hover:brightness-110 transition-all disabled:opacity-60"
        >
          {isVerifying ? (
            <Loader2 className="animate-spin w-3 h-3 sm:w-5 sm:h-5" />
          ) : (
            <Check className="w-3 h-3 sm:w-5 sm:h-5" />
          )}
          {isVerifying ? "Verifying..." : "Verify Code"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="w-full flex items-center justify-center gap-1 text-mepale hover:text-menavy font-jost text-[8px] xs:text-xs sm:text-base disabled:opacity-60"
        >
          {isResending ? (
            <Loader2 className="animate-spin w-3 h-3" />
          ) : (
            <Send className="w-3 h-3" />
          )}
          {isResending ? "Sending..." : "Resend Code"}
        </button>

        <UnderLined text="Back" link="/register/login" />
      </div>
    </form>
  );
};

export default Otp;
