"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { isEmpty } from "@/utils/objectUtils";
import { formatDateShort } from "@/utils/formatDateUtils";
import { useDispatch } from "react-redux";
import { updateData } from "@/store/slices/userSlice";
import { getMyData } from "@/services/userApi";
import { logout } from "@/store/slices/signSlice";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ details }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [profile, setProfile] = useState({
    fullname: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    city: "",
    country: "",
    avatar: null,
  });

  useEffect(() => {
    if (!isEmpty(details)) {
      setProfile({
        fullname: details.name,
        dateOfBirth: details.dateOfBirth,
        gender: details.gender,
        phone: details.phone,
        city: details.city,
        country: details.country,
        avatar: details.ImgUrl,
      });
    }
  }, [details]);

  const handleSave = () => {
    setIsEditing(false);
    try {
      dispatch(
        updateData({
          name: profile.fullname,
          dateOfBirth: profile.dateOfBirth,
          gender: profile.gender,
          phone: profile.phone,
          city: profile.city,
          country: profile.country,
        })
      );
    } catch (e) {
      console.log(e);
    }
    dispatch(getMyData());
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChangeAvatar = async () => {
    if (!profile.avatar) return;
    const formData = new FormData();
    formData.append("image", profile.avatar);
    try {
      dispatch(updateData(formData));
    } catch (e) {
      console.log(e);
    }
    setShowAvatarDialog(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information and how others see you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={profile.avatar || "https://github.com/shadcn.png"}
                alt={profile.fullname}
              />
              <AvatarFallback>
                {profile.fullname
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => setShowAvatarDialog(true)}
              >
                <Camera className="h-4 w-4" />
                Change Avatar
              </Button>
              <p className="text-sm text-muted-foreground mt-1">
                JPG, GIF or PNG. Max size of 2MB.
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                value={profile.fullname}
                onChange={(e) =>
                  setProfile({ ...profile, fullname: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formatDateShort(profile.dateOfBirth)}
                onChange={(e) =>
                  setProfile({ ...profile, dateOfBirth: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={profile.gender}
                  onChange={(e) =>
                    setProfile({ ...profile, gender: e.target.value })
                  }
                  disabled={!isEditing}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="">Prefer not to say</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profile.city}
                  onChange={(e) =>
                    setProfile({ ...profile, city: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter your city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={profile.country}
                  onChange={(e) =>
                    setProfile({ ...profile, country: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter your country"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <>
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
            <div className="">
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate("/register/login");
                }}
                className="bg-red-500 hover:bg-red-600 "
              >
                Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Avatar Dialog */}
      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>Change Avatar</DialogTitle>
            <DialogDescription>
              Upload a new profile picture. Recommended size is 400x400 pixels.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.fullname}
                />
                <AvatarFallback>
                  {profile.fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar-upload">Choose Image</Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    avatar: e.target.files?.[0] || null,
                  });
                }}
              />
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAvatarDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleChangeAvatar}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
