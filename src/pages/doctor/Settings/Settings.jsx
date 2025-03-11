import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useEffect, useState } from "react";
import profile from "../../../assets/doctor-F.png";
import PasswordStrengthBar from "react-password-strength-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "@/store/Slices/Users";

// Settings

export const Settings = () => {
    const [brandColor, setBrandColor] = useState('#37568d');
    const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.users);
  console.log(selectedUser);
  useEffect(() => {
    dispatch(
      fetchUserById({
        id: "67ca34e0f2d6e1f39d3e1759",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmMDI1YTMyNWIzYWFhYzlkZDYzZDMiLCJuYW1lIjoia2FoIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc0MTY0OTkyNCwiZXhwIjoxNzQxNjY0MzI0fQ.nyMbDcYdIrdlM8gFioplJF7vb0sFbmmTSI4yD5UPbjI",
      })
    );
  }, [dispatch]);

  console.log(selectedUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name || "");
      setEmail(selectedUser.email || "");
      setPhone(selectedUser.phone || "");
    }
  }, [selectedUser]);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Call API to update password here
    console.log("Password changed successfully!");
    setShowModal(false);
  };

  const handleNamechange = (e) => {
    setName(e.target.value);
  };

  const handlePhonechange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailchange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="px-4">
      <div className="border-b mb-2 pb-4 border-gray-200 col-span-12">
        <h1 className="font-semibold block text-3xl">Settings</h1>
      </div>
      <Tabs defaultValue="profile" className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Profile Section */}
        <TabsContent value="profile">
          <div className="w-full px-2">
            <Card className="mb-3">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile} alt="Profile" />
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">
                        Dr. Tasneem Fahmi
                      </h2>
                      <p className="text-sm text-gray-500">
                        Cardiologist - Egyptian Hospital
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#37568d] text-white px-4 py-2 rounded-lg mr-2">
                      Change Picture
                    </button>
                    <button className="bg-inherit border-2 border-[#37568d] text-gray-900 px-4 py-2 rounded-lg">
                      Delete Picture
                    </button>
                  </div>{" "}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      onChange={handleNamechange}
                      defaultValue={selectedUser.name}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      onChange={handleNamechange}
                      defaultValue={name}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label>Username</Label>
                    <Input
                      defaultValue="@tasneemfahmi"
                      className="h-10"
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      onChange={handlePhonechange}
                      defaultValue={phone}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <select className="w-full p-2 border rounded-md h-10 text-sm shadow-sm">
                      <option>On duty</option>
                      <option>Busy</option>
                      <option>Offline</option>
                    </select>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <select
                      className="w-full p-2 border rounded-md h-10 text-sm shadow-sm"
                      defaultValue={"Cardiologist"}
                      disabled
                    >
                      <option>Internist</option>
                      <option>Pediatrician</option>
                      <option>Geriatrician</option>
                      <option>Cardiologist</option>
                      <option>Neurologist</option>
                      <option>Neurosurgeon</option>
                      <option>Psychiatrist</option>
                      <option>Pulmonologist</option>
                      <option>Gastroenterologist</option>
                      <option>Hepatologist</option>
                      <option>Endocrinologist</option>
                      <option>Nephrologist</option>
                      <option>Urologist</option>
                      <option>Obstetrician</option>
                      <option>Gynecologist</option>
                      <option>Rheumatologist</option>
                      <option>Dermatologist</option>
                      <option>Ophthalmologist</option>
                      <option>Optometrist</option>
                      <option>Otolaryngologist</option>
                      <option>Audiologist</option>
                      <option>Oncologist</option>
                      <option>Hematologist</option>
                      <option>Immunologist</option>
                      <option>Anesthesiologist</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 flex justify-end space-x-2 px-2">
            <button className="bg-inherit border-2 border-[#37568d] text-gray-900 px-4 py-2 rounded-lg">
              Cancel
            </button>
            <button className="bg-[#37568d] text-white px-4 py-2 rounded-lg mr-2">
              Save Changes
            </button>
          </div>
        </TabsContent>

        {/* Account Section */}
        <TabsContent value="account">
          <div className="space-y-4 px-2">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded bg-gray-200"
                value="tasneemfahmimadkour@gmail.com"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <div className="grid grid-cols-10 gap-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-[#37568d] text-white px-4 py-2 rounded-lg mr-2 col-span-2"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          {/* Save and Cancel Buttons */}
          <div className="mt-6 flex justify-end space-x-2 px-2">
            <button className="bg-inherit border-2 border-red-700 text-gray-900 px-4 py-2 rounded-lg">
              Delete Account
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-lg mr-2">
              Disable Account
            </button>
          </div>
        </TabsContent>

        {/* Cookies Section */}
        <TabsContent value="cookies">
          <Card>
            <CardContent className="p-6">
              <Label>Cookie Banner</Label>
              <ToggleGroup type="single" defaultValue="default">
                <ToggleGroupItem value="default">Default</ToggleGroupItem>
                <ToggleGroupItem value="simplified">Simplified</ToggleGroupItem>
                <ToggleGroupItem value="none">None</ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Section */}
        <TabsContent value="appearance">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label>Brand Color</Label>
                <Input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                />
              </div>
              <div>
                <Label>Dashboard Charts</Label>
                <ToggleGroup type="single" defaultValue="default">
                  <ToggleGroupItem value="default">Default</ToggleGroupItem>
                  <ToggleGroupItem value="simplified">
                    Simplified
                  </ToggleGroupItem>
                  <ToggleGroupItem value="custom">Custom CSS</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-2 border rounded mb-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded mb-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-2 border rounded mb-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordStrengthBar password={newPassword} />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#37568d] text-white rounded-lg"
                onClick={handleChangePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
