import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { LocateIcon, Mail, Phone, PhoneCall, User } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../../../store/Slices/Users'
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook, FaWhatsapp } from 'react-icons/fa6'
import { IoCallOutline, IoLocationOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";

export const Patients_Main = ({ selectedPatientId }) => {
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");


  useEffect(() => {
    if (selectedPatientId) {
      dispatch(
        fetchUserById({
          id: selectedPatientId,
          token: localStorage.getItem("doctorToken"),
        })
      );
    }
  }, [dispatch, selectedPatientId]);

  useEffect(() => {
    if (details[0]) {
      setName(details[0].name || "");
      setEmail(details[0].email || "");
      setPhone(details[0].phone || "");
      setCity(details[0].city || "");
      setGender(details[0].gender || "");
    }
  }, [details[0]]);

  console.log(details);

  if (!selectedPatientId) {
    return (
      <main className="flex-1 p-6 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-lg">Select a patient to view their details</p>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 pt-2 pb-6 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <Avatar className="w-10 h-10" />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Basic Info */}
          <Card className="p-4 w-full max-w-sm shadow-md rounded-xl">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Basic Information</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <IoPersonOutline className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Gender</span>
            <span className="ml-auto font-medium">{gender}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <IoLocationOutline className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">City</span>
            <span className="ml-auto font-medium">{city}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <IoCallOutline className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Phone Number</span>
            <span className="ml-auto font-medium">{phone}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <IoMailOutline className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Email</span>
            <span className="ml-auto font-medium">{email}</span>
          </div>
        </div>

        <div>
          <span className="text-gray-700 text-sm">Sources</span>
          <div className="flex space-x-2 mt-2">
            <FcGoogle className="w-5 h-5" />
            <FaWhatsapp className="w-5 h-5 text-[#4fce5d]" />
            <FaSquareFacebook className="w-5 h-5 text-[#1877F2]" />
          </div>
        </div>
      </CardContent>
    </Card>

          {/* Appointments */}
          <Card className="p-4 col-span-2">
            <CardContent>
              <h2 className="font-semibold mb-2">Appointment Schedule</h2>
              
            </CardContent>
          </Card>
        </div>
      </main>
  )
}
