import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  generateOtp,
  verifyOtp,
  resetPasswordOTP,
} from "@/store/slices/otpSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOtpGenerated,
  selectOtpLoading,
  selectOtpResetToken,
  selectOtpVerified,
  selectPasswordReset,
} from "@/store/selectors";

export default function ResetPassword({ open, onClose, email }) {
  const dispatch = useDispatch();
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Always get latest values from Redux store
  const otpGenerated = useSelector(selectOtpGenerated);
  const resetToken = useSelector(selectOtpResetToken);
  const isVerify = useSelector(selectOtpVerified);
  const passwordHasRest = useSelector(selectPasswordReset);
  const loading = useSelector(selectOtpLoading);

  console.log(resetToken);

  // Keep local state in sync with Redux for OTP verification and reset token
  useEffect(() => {
    if (isVerify && resetToken) {
      // OTP verified and reset token received
      setOtpSent(true);
    }
  }, [isVerify, resetToken]);

  // Timer function for OTP resend
  function startOtpTimer() {
    let seconds = 60;
    setOtpTimer(seconds);
    const timer = setInterval(() => {
      seconds -= 1;
      setOtpTimer(seconds);
      if (seconds <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  // Handle OTP generation
  const handleGenerateOTP = () => {
    dispatch(generateOtp(email));
    setOtpSent(true);
    startOtpTimer();
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    if (!form.otp) {
      alert("Please enter the OTP");
      return;
    }
    dispatch(verifyOtp({ email: email, otp: form.otp }));
    console.log("verify done >>");
    // No local state update here; rely on Redux state and useEffect above
  };

  // Handle password reset
  const handlePasswordReset = () => {
    if (!isVerify) {
      alert("Please verify OTP first.");
      return;
    }
    if (!form.newPassword || !form.confirmPassword) {
      alert("Please enter new password and confirm it.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(
      resetPasswordOTP({
        resetToken: resetToken,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      })
    );
  };

  // Watch for password reset success
  useEffect(() => {
    if (passwordHasRest) {
      alert("Password updated successfully!");
      onClose(false);
      setOtpSent(false);
      setOtpTimer(0);
      setForm({ otp: "", newPassword: "", confirmPassword: "" });
    }
  }, [passwordHasRest, onClose]);

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              We`ll send a verification code to your email address to confirm
              your identity.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* OTP Generation Section */}
            <div className="space-y-2">
              <Label>Email Verification</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleGenerateOTP}
                  disabled={otpTimer > 0}
                  className="flex-1"
                >
                  {otpTimer > 0
                    ? `Resend in ${otpTimer}s`
                    : otpSent
                    ? "Resend OTP"
                    : "Generate OTP"}
                </Button>
              </div>
              {otpSent && (
                <p className="text-sm text-muted-foreground">
                  Verification code sent to {email}
                </p>
              )}
            </div>

            {/* OTP Input and Verify Button */}
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="otp"
                    type="text"
                    value={form.otp}
                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleVerifyOtp}
                    disabled={loading || !form.otp}
                  >
                    Verify OTP
                  </Button>
                </div>
                {/* {msg && <div className="text-xs text-gray-500">{msg}</div>} */}
              </div>
            )}

            {/* New Password Fields */}
            {otpSent && isVerify && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={form.newPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                onClose(false);
                setOtpSent(false);
                setOtpTimer(0);
                setForm({
                  otp: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
            >
              Cancel
            </Button>
            {otpSent && isVerify && (
              <Button onClick={handlePasswordReset}>Update Password</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
