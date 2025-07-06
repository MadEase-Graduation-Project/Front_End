import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatients } from "@/store/slices/patientSlice";
import { IoCallOutline, IoLocationOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook, FaWhatsapp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { fetchDiagnosisById } from "@/store/slices/diagnosisSlice";
import { selectAllDiagnosis } from "@/store/selectors";

export const Patients_Main = ({ selectedPatient, patientsList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patients: patientList, loading: patientsLoading, error: patientsError } = useSelector((state) => state.patients);
  const { items: appointments = [] } = useSelector((state) => state.appointments);
  const allDiagnoses = useSelector(selectAllDiagnosis);

  // Fetch all patients and appointments on mount
  useEffect(() => {
    dispatch(fetchAllPatients());
    dispatch(fetchAppointments());
  }, [dispatch]);

  const patient = selectedPatient;
  const patientId = patient?._id;
  // ✅ Always call hooks at the top level
  useEffect(() => {
    if (patientId) {
      dispatch(fetchDiagnosisById(patientId));
    }
  }, [dispatch, patientId]);

  if (patientsLoading) {
    return (
      <main className="flex-1 p-6 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading patient data...</p>
      </main>
    );
  }

  if (patientsError) {
    return (
      <main className="flex-1 p-6 bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">Error loading patient data</p>
      </main>
    );
  }

  if (!selectedPatient) {
    return (
      <main className="flex-1 p-6 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Select a patient to view their details</p>
      </main>
    );
  }

  if (!patient) {
    return (
      <main className="flex-1 p-6 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Patient not found</p>
      </main>
    );
  }

  const { name, email, phone, city, gender } = patient;

const filteredAppointments = selectedPatient?.Appointment


  // Filter diagnoses for the selected patient
  const filteredDiagnoses = allDiagnoses.filter(
    (d) => d.patientId === patientId || d.patient?._id === patientId
  );

  // 🧪 DEBUG LOGS
  console.log("🧪 Selected patient ID:", patientId);
  console.log("📋 All appointments:", appointments);
  console.log("📋 Filtered appointments:", filteredAppointments);
  console.log("📋 All diagnoses:", allDiagnoses);
  console.log("📋 Filtered diagnoses:", filteredDiagnoses);
  console.log("📋 Patients List:", patientsList);
  ;

  return (
    <main className="flex flex-col flex-1 px-6 pt-2 pb-6 bg-gray-100 rounded-lg gap-6 h-[calc(100vh_-_130px)] overflow-y-auto">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">{name || "Unknown Patient"}</h1>
        <Avatar className="w-10 h-10">
          <AvatarImage src="" alt={name || "Patient"} />
          <AvatarFallback>{name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Basic Info */}
        <Card className="p-4 shadow-md rounded-xl col-span-2">
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div className="space-y-3 text-sm">
              <InfoRow icon={<IoPersonOutline />} label="Gender" value={gender} />
              <InfoRow icon={<IoLocationOutline />} label="City" value={city} />
              <InfoRow icon={<IoCallOutline />} label="Phone" value={phone} />
              <InfoRow icon={<IoMailOutline />} label="Email" value={email} />
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
        <Card className="p-6 shadow-sm rounded-xl border col-span-3 border-gray-200">
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

            <div className="space-y-5">
              {filteredDiagnoses.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No diagnosis records found.</p>
              ) : (
                filteredDiagnoses.map((dia) => (
                  <div key={dia._id} className="bg-gray-50 p-4 rounded-md shadow-inner border border-gray-100">
                    <p className="text-base font-semibold text-blue-900 mb-1">{dia.title}</p>
                    <p className="text-sm text-gray-700 mb-2 italic">{dia.description || "No details available"}</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p><span className="font-medium">Symptoms:</span> {dia.symptoms?.join(", ") || "None"}</p>
                      <p><span className="font-medium">Recommendations:</span> {dia.recommendations || "None"}</p>
                      <p><span className="font-medium">Follow-up:</span> {dia.followUp || "None"}</p>
                      <p><span className="font-medium">Date:</span> {new Date(dia.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments */}
      <Card className="p-6 shadow-sm rounded-xl border border-gray-200">
        <CardContent>
          <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">📆 Appointment Schedule</h2>
          <div className="space-y-4 text-sm text-gray-700">
            {filteredAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No appointments found.</p>
            ) : (
              filteredAppointments.map((appt) => {
                const priority = (appt.priority || "normal").toLowerCase();
                const priorityStyles = {
                  normal: "bg-green-100 text-green-800 border-green-200",
                  low: "bg-yellow-100 text-yellow-800 border-yellow-200",
                  moderate: "bg-orange-100 text-orange-800 border-orange-200",
                  critical: "bg-red-100 text-red-800 border-red-200",
                };

                return (
                  <div key={appt._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-100 shadow-inner">
                    <span className="text-blue-800 font-medium">
                      {new Date(appt.appointmentDate).toLocaleDateString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize tracking-wide border ${priorityStyles[priority] || priorityStyles.normal}`}>
                      {priority}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-700">{label}</span>
    </div>
    <span className="font-medium">{value || "Not available"}</span>
  </div>
);
