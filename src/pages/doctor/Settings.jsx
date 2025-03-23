import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useEffect, useState } from "react";
import profile from "../../../src/assets/doctor-F.png";
import PasswordStrengthBar from "react-password-strength-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "@/store/Slices/Users";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";

// Settings

export const Settings = () => {
  const [brandColor, setBrandColor] = useState("#37568d");
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.users);
  console.log(details);
  useEffect(() => {
    dispatch(
      fetchUserById({
        id: "67ca34e0f2d6e1f39d3e1759",
        token:
        localStorage.getItem("doctorToken"),
      })
    );
  }, [dispatch]);

  console.log(details);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");


  useEffect(() => {
    if (details[0]) {
      setName(details[0].name || "");
      setEmail(details[0].email || "");
      setPhone(details[0].phone || "");
      setDateOfBirth(details[0].dateOfBirth || "")
    }
  }, [details[0]]);

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

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value)
  }

  return (
    <div className="px-2 sm:px-4">
      <Tabs defaultValue="profile" className="w-full mt-4">
        <TabsList className="flex flex-wrap mx-2 bg-inherit">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Profile Section */}
        <TabsContent value="profile">
          <div className="w-full px-0 sm:px-2 grid grid-cols-12 gap-3">
            <Card className="col-span-12">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="w-full sm:w-auto bg-[#37568d] text-white px-4 py-2 rounded-lg">
                      Change Picture
                    </button>
                    <button className="w-full sm:w-auto bg-inherit border-2 border-[#37568d] text-gray-900 px-4 py-2 rounded-lg">
                      Delete Picture
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-12">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      onChange={handleNamechange}
                      defaultValue={name}
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
                    <Label>Date Of Birth</Label>
                    <input 
                      type="date" 
                      name="dateOfBirth" 
                      value={dateOfBirth} 
                      onChange={handleDateOfBirthChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div>
                  <Label>Gender</Label>
                    <select className="w-full p-2 border rounded-md h-10 text-sm shadow-sm">
                      <option>Female</option>
                      <option>Male</option>
                    </select>
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
            <div className="col-span-12 sm:col-span-4">
            <Label>Consultation Type</Label>
            <Card >
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="inperson" 
                        value="inperson" 
                        className="accent-[#37568d] w-4 h-4"
                      />
                      <label
                        htmlFor="inperson"
                        className="text-sm text-gray-700"
                      >
                        In person
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="online" 
                        value="online" 
                        className="accent-[#37568d] w-4 h-4"
                      />
                      <label
                        htmlFor="online"
                        className="text-sm text-gray-700"
                      >
                        Online
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="emergency" 
                        value="emergency" 
                        className="accent-[#37568d] w-4 h-4"
                      />
                      <label
                        htmlFor="emergency"
                        className="text-sm text-gray-700"
                      >
                        Emergency
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 px-2">
            <button className="w-full sm:w-auto bg-[#37568d] text-white px-4 py-2 rounded-lg">
              Save Changes
            </button>
            <button className="w-full sm:w-auto bg-inherit border-2 border-[#37568d] text-gray-900 px-4 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </TabsContent>

        {/* Account Section */}
        <TabsContent value="account">
          <div className="space-y-4 px-0 sm:px-2">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded bg-gray-200"
                value={email}
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-10 gap-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto bg-[#37568d] text-white px-4 py-2 rounded-lg col-span-1 sm:col-span-2"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          {/* Save and Cancel Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 px-2">
            <button className="w-full sm:w-auto bg-inherit border-2 border-red-700 text-gray-900 px-4 py-2 rounded-lg">
              Delete Account
            </button>
            <button className="w-full sm:w-auto bg-red-700 text-white px-4 py-2 rounded-lg">
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

        {/* Appearance Section
        <TabsContent value="appearance">
          <Card>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div>
                <Label>Brand Color</Label>
                <Input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
              <div>
                <Label>Dashboard Charts</Label>
                <ToggleGroup
                  type="single"
                  defaultValue="default"
                  className="flex flex-wrap gap-2"
                >
                  <ToggleGroupItem value="default" className="flex-1">
                    Default
                  </ToggleGroupItem>
                  <ToggleGroupItem value="simplified" className="flex-1">
                    Simplified
                  </ToggleGroupItem>
                  <ToggleGroupItem value="custom" className="flex-1">
                    Custom CSS
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-[24rem]">
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
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2">
              <button
                className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="w-full sm:w-auto px-4 py-2 bg-[#37568d] text-white rounded-lg"
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
