import { useState } from "react";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Send,
  Loader2,
} from "lucide-react";

export default function Security() {
  const [formData, setFormData] = useState({
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [validations, setValidations] = useState({
    passwordLength: false,
    passwordMatch: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [isLoading, setIsLoading] = useState({
    verify: false,
    save: false,
    resend: false,
  });

  const [notifications, setNotifications] = useState({
    verification: null,
    password: null,
  });

  const [isVerified, setIsVerified] = useState(false);

  // Password validation
  const validatePassword = (password) => {
    const validations = {
      passwordLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    validations.passwordMatch =
      password === formData.confirmPassword && password.length > 0;

    setValidations(validations);
    return Object.values(validations).every(Boolean);
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "newPassword") {
      validatePassword(value);
    }

    if (field === "confirmPassword") {
      setValidations((prev) => ({
        ...prev,
        passwordMatch: value === formData.newPassword && value.length > 0,
      }));
    }
  };

  const handleVerifyEmail = async () => {
    setIsLoading((prev) => ({ ...prev, verify: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (formData.verificationCode.length === 6) {
        setIsVerified(true);
        setNotifications((prev) => ({
          ...prev,
          verification: {
            type: "success",
            message: "Email verified successfully!",
          },
        }));
      } else {
        setNotifications((prev) => ({
          ...prev,
          verification: {
            type: "error",
            message: "Invalid verification code. Please try again.",
          },
        }));
      }
    } catch (error) {
      setNotifications((prev) => ({
        ...prev,
        verification: {
          type: "error",
          message: "Verification failed. Please try again.",
        },
      }));
    } finally {
      setIsLoading((prev) => ({ ...prev, verify: false }));
    }
  };

  const handleResendCode = async () => {
    setIsLoading((prev) => ({ ...prev, resend: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setNotifications((prev) => ({
        ...prev,
        verification: {
          type: "success",
          message: "Verification code sent to your email!",
        },
      }));
    } catch (error) {
      setNotifications((prev) => ({
        ...prev,
        verification: {
          type: "error",
          message: "Failed to send code. Please try again.",
        },
      }));
    } finally {
      setIsLoading((prev) => ({ ...prev, resend: false }));
    }
  };

  const handleSave = async () => {
    if (!isVerified) {
      setNotifications((prev) => ({
        ...prev,
        password: { type: "error", message: "Please verify your email first." },
      }));
      return;
    }

    if (!Object.values(validations).every(Boolean)) {
      setNotifications((prev) => ({
        ...prev,
        password: {
          type: "error",
          message: "Please ensure all password requirements are met.",
        },
      }));
      return;
    }

    setIsLoading((prev) => ({ ...prev, save: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setNotifications((prev) => ({
        ...prev,
        password: {
          type: "success",
          message: "Password updated successfully!",
        },
      }));

      // Reset form
      setFormData({
        verificationCode: "",
        newPassword: "",
        confirmPassword: "",
      });
      setValidations({
        passwordLength: false,
        passwordMatch: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
    } catch (error) {
      setNotifications((prev) => ({
        ...prev,
        password: {
          type: "error",
          message: "Failed to update password. Please try again.",
        },
      }));
    } finally {
      setIsLoading((prev) => ({ ...prev, save: false }));
    }
  };

  const NotificationBanner = ({ notification, onClose }) => {
    if (!notification) return null;

    return (
      <div
        className={`p-4 rounded-lg border-l-4 flex items-start gap-3 ${
          notification.type === "success"
            ? "bg-green-50 border-green-400 text-green-800"
            : "bg-red-50 border-red-400 text-red-800"
        }`}
      >
        {notification.type === "success" ? (
          <CheckCircle size={20} className="text-green-600 mt-0.5" />
        ) : (
          <AlertCircle size={20} className="text-red-600 mt-0.5" />
        )}
        <div className="flex-1">
          <p className="font-medium">{notification.message}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>
    );
  };

  const PasswordRequirement = ({ met, text }) => (
    <div
      className={`flex items-center gap-2 text-sm ${
        met ? "text-green-600" : "text-gray-500"
      }`}
    >
      {met ? <Check size={16} /> : <X size={16} />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="text-blue-600" size={28} />
        <h1 className="text-2xl font-bold text-gray-800">Security Settings</h1>
      </div>

      <div className="space-y-8">
        {/* Email Verification Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">
              Email Verification
            </h2>
            {isVerified && (
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <CheckCircle size={16} />
                Verified
              </div>
            )}
          </div>

          <NotificationBanner
            notification={notifications.verification}
            onClose={() =>
              setNotifications((prev) => ({ ...prev, verification: null }))
            }
          />

          <div className="mt-4">
            <label
              htmlFor="verify"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="verify"
                value={formData.verificationCode}
                onChange={handleInputChange("verificationCode")}
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  isVerified
                    ? "bg-green-50 border-green-300"
                    : "bg-white border-gray-300"
                }`}
                placeholder="Enter 6-digit code"
                maxLength={6}
                disabled={isVerified}
              />
              <button
                onClick={handleVerifyEmail}
                disabled={
                  isLoading.verify ||
                  formData.verificationCode.length !== 6 ||
                  isVerified
                }
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                {isLoading.verify ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Check size={16} />
                )}
                {isLoading.verify ? "Verifying..." : "Verify"}
              </button>
            </div>

            <button
              onClick={handleResendCode}
              disabled={isLoading.resend || isVerified}
              className="mt-3 text-blue-600 hover:text-blue-700 disabled:text-gray-400 text-sm font-medium flex items-center gap-1"
            >
              {isLoading.resend ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Send size={14} />
              )}
              {isLoading.resend ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </div>

        {/* Password Update Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">
              Update Password
            </h2>
          </div>

          <NotificationBanner
            notification={notifications.password}
            onClose={() =>
              setNotifications((prev) => ({ ...prev, password: null }))
            }
          />

          <div className="space-y-4 mt-4">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  id="password"
                  value={formData.newPassword}
                  onChange={handleInputChange("newPassword")}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.confirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Password Requirements:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <PasswordRequirement
                    met={validations.passwordLength}
                    text="At least 8 characters"
                  />
                  <PasswordRequirement
                    met={validations.hasUppercase}
                    text="One uppercase letter"
                  />
                  <PasswordRequirement
                    met={validations.hasLowercase}
                    text="One lowercase letter"
                  />
                  <PasswordRequirement
                    met={validations.hasNumber}
                    text="One number"
                  />
                  <PasswordRequirement
                    met={validations.hasSpecialChar}
                    text="One special character"
                  />
                  <PasswordRequirement
                    met={validations.passwordMatch}
                    text="Passwords match"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={
              isLoading.save ||
              !isVerified ||
              !Object.values(validations).every(Boolean)
            }
            className={`
              px-8 py-3 font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2
              ${
                isLoading.save ||
                !isVerified ||
                !Object.values(validations).every(Boolean)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              }
            `}
          >
            {isLoading.save ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              <>
                <Shield size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
