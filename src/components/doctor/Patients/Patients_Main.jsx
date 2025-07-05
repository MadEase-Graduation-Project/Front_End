import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useSelector } from "react-redux";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook, FaWhatsapp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


// Fallback patient data
const fallbackPatient = {
  name: "Unknown Patient",
  gender: "Not specified",
  dateOfBirth: "1990-01-01",
  email: "not.available@example.com",
  phone: "+201000000000",
  city: "Unknown City",
  country: "Unknown Country",
  emergencyContact: {
    name: "Emergency Contact",
    relationship: "Not specified",
    phone: "+201000000000",
  },
};

// Fallback diagnosis data
const fallbackDiagnoses = [
  {
    _id: "fallback-diagnosis-1",
    patientId: "fallback-patient",
    doctorId: "fallback-doctor",
    title: "Common Cold",
    description: "A mild viral infection of the nose, throat, and upper respiratory tract.",
    symptoms: ["sneezing", "runny nose", "fatigue"],
    medications: [],
    recommendations: "Stay hydrated and get plenty of rest.",
    followUp: "in 1 week",
    notes: "Monitor symptoms for fever.",
    createdAt: new Date().toISOString(),
  },
];

// Fallback appointments data
const fallbackAppointments = [
  {
    _id: "fallback-appt-1",
    patientId: "fallback-patient",
    patientName: "Unknown Patient",
    doctorName: "Fallback Doctor",
    doctorId: "fallback-doctor",
    priority: "normal",
    appointmentDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const Patients_Main = ({ selectedPatient }) => {
  const { items: appointments = [] } = useSelector((state) => state.appointments);
  const { diagnosis: allDiagnoses = [] } = useSelector((state) => state.diagnosis || { diagnosis: [] });
  const navigate = useNavigate();


  if (!selectedPatient) {
    return (
      <main className="flex-1 p-6 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Select a patient to view their details
        </p>
      </main>
    );
  }

  const patient = { ...fallbackPatient, ...selectedPatient };
  const { _id: patientId, name, email, phone, city, gender } = patient;

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.patientId === patientId
  );
  const filteredDiagnoses = allDiagnoses.filter(
    (d) => d.patientId === patientId
  );

  const finalAppointments = filteredAppointments.length > 0 ? filteredAppointments : fallbackAppointments;
  const finalDiagnoses = filteredDiagnoses.length > 0 ? filteredDiagnoses : fallbackDiagnoses;

  return (
    <main className="flex flex-col flex-1 px-6 pt-2 pb-6 bg-gray-100 rounded-lg gap-6">
  <div className="flex flex-wrap justify-between items-center gap-4">
    <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
    <Avatar className="w-10 h-10">
      <AvatarImage src="" alt={name} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  </div>

  {/* Responsive Grid */}
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
    {/* Basic Info */}
    <Card className="p-4 w-full shadow-md rounded-xl col-span-2">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Basic Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IoPersonOutline className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Gender</span>
            </div>
            <span className="font-medium">{gender}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IoLocationOutline className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">City</span>
            </div>
            <span className="font-medium">{city}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IoCallOutline className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Phone</span>
            </div>
            <span className="font-medium">{phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IoMailOutline className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Email</span>
            </div>
            <span className="font-medium">{email}</span>
          </div>
        </div>

        <div>
          <span className="text-gray-700 text-sm font-medium">Sources</span>
          <div className="flex space-x-3 mt-2">
            <FcGoogle className="w-5 h-5" />
            <FaWhatsapp className="w-5 h-5 text-[#4fce5d]" />
            <FaSquareFacebook className="w-5 h-5 text-[#1877F2]" />
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Diagnosis */}
    <Card className="p-6 bg-white shadow-sm rounded-xl border col-span-3 border-gray-200">
  <CardContent>
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <h2 className="text-lg font-bold text-gray-800">Past Diagnosis</h2>
      <button
  className="px-4 py-2 bg-[#37568d] text-white rounded-md text-sm font-medium hover:bg-[#1e3356] transition"
  onClick={() => navigate("/doctor/diagnosis", { state: { patient } })}
>
  + Add Diagnosis
</button>

    </div>

    <ul className="space-y-5">
      {finalDiagnoses.map((dia) => (
        <li key={dia._id} className="bg-gray-50 p-4 rounded-md shadow-inner border border-gray-100">
          <p className="text-base font-semibold text-blue-900 mb-1">{dia.title}</p>
          <p className="text-sm text-gray-700 mb-2 italic">
            {dia.description || "No details available"}
          </p>
          <div className="text-xs text-gray-600 leading-relaxed space-y-1">
            <p><span className="font-medium">Symptoms:</span> {dia.symptoms?.join(", ") || "None"}</p>
            <p><span className="font-medium">Recommendations:</span> {dia.recommendations || "None"}</p>
            <p><span className="font-medium">Follow-up:</span> {dia.followUp || "None"}</p>
            <p><span className="font-medium">Date:</span> {new Date(dia.createdAt).toLocaleDateString()}</p>
          </div>
        </li>
      ))}
    </ul>
  </CardContent>
</Card>

  </div>

  {/* Appointments */}
  <Card className="p-6 bg-white shadow-sm rounded-xl border border-gray-200">
    <CardContent>
      <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">📆 Appointment Schedule</h2>
      <ul className="space-y-4 text-sm text-gray-700">
        {finalAppointments.map((appt) => {
          const priority = (appt.priority || "normal").toLowerCase();
          const priorityStyles = {
            normal: "bg-green-100 text-green-800 border-green-200",
            low: "bg-yellow-100 text-yellow-800 border-yellow-200",
            moderate: "bg-orange-100 text-orange-800 border-orange-200",
            critical: "bg-red-100 text-red-800 border-red-200",
          };

          return (
            <li
              key={appt._id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-100 shadow-inner"
            >
              <span className="text-blue-800 font-medium">
                {new Date(appt.appointmentDate).toLocaleDateString()}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold capitalize tracking-wide border 
                ${priorityStyles[priority] || priorityStyles.normal}`}
              >
                {priority}
              </span>
            </li>
          );
        })}
      </ul>
    </CardContent>
  </Card>
</main>

  );
};
