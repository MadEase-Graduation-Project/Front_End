import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Mail, Lock, Trash2, CheckCircle, XCircle } from "lucide-react";
import { isEmpty } from "@/utils/objectUtils";
import ResetPassword from "./ResetPassword";
import ChangeEmail from "./ChangeEmail";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/services/editUserApi";
import { useNavigate } from "react-router-dom";
import { generateOtp } from "@/store/slices/otpSlice";

export default function SecurityPage({ details }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(false);
  const [securityData, setSecurityData] = useState({
    email: "",
    lastPasswordChange: "",
    lastUpdated: "",
    accountCreated: "",
  });

  useEffect(() => {
    if (!isEmpty(details)) {
      setSecurityData({
        email: details.email,
        lastUpdated: details.updatedAt,
        accountCreated: details.createdAt,
      });
      setEmailVerified(details.isVerified);
    }
  }, [details]);

  // to show changEmail and resetpassword dialogs
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const handleResendVerification = () => {
    dispatch(generateOtp(securityData.email));
  };

  //! danger ya waaaaaaaaaaaaaaaald
  const handleDeleteAccount = () => {
    dispatch(deleteUser());
    navigate("/register/login");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Email & Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email & Verification
          </CardTitle>
          <CardDescription>
            Manage your email address and verification status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Address</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {securityData.email}
                </span>
                {emailVerified ? (
                  <Badge variant="default" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <XCircle className="h-3 w-3" />
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {!emailVerified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendVerification}
                >
                  Resend Verification
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEmailDialog(true)}
              >
                Change Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password Security
          </CardTitle>
          <CardDescription>
            Manage your password and account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Password</Label>
              <p className="text-sm text-muted-foreground">
                Last changed on{" "}
                {new Date(securityData.lastPasswordChange).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(true)}
            >
              Reset Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            View your account timeline and activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-1">
                <Label>Account Created</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(securityData.accountCreated).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-2">
              <div className="space-y-1">
                <Label>Last Updated</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(securityData.lastUpdated).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  <button onClick={handleDeleteAccount}>Delete Account</button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Reset Password Dialog */}
      <ResetPassword
        open={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        email={securityData.email}
      />

      {/* Change Email Dialog */}
      <ChangeEmail
        open={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
        email={securityData.email}
      />
    </div>
  );
}
