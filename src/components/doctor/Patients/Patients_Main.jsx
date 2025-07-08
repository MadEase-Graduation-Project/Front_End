import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook, FaWhatsapp } from "react-icons/fa6";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { fetchAllPatients } from "@/store/slices/patientSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { getAllDiagnosis } from "@/services/diagnosisApi";

export const Patients_Main = ({ selectedPatient, patientsList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: patientsLoading, error: patientsError } = useSelector(
    (state) => state.patients
  );
  const { items: appointments = [] } = useSelector(
    (state) => state.appointments
  );

  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState(null);
  const [diagnoses, setDiagnoses] = useState([]);
  const [currentDiagnosisIndex, setCurrentDiagnosisIndex] = useState(0);
  const currentDiagnosis = diagnoses[currentDiagnosisIndex] || {};

  const patient = selectedPatient;
  const patientId = patient?._id;

  // Fetch all patients and appointments on mount
  useEffect(() => {
    dispatch(fetchAllPatients());
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Fetch diagnosis using service directly
  useEffect(() => {
    const fetchDiagnosis = async () => {
      if (!patientId) return;
      setDiagnosisLoading(true);
      setDiagnosisError(null);

      try {
        const data = await getAllDiagnosis(patientId);
        setDiagnoses(data.diagnoses || []);
      } catch (err) {
        setDiagnosisError("Failed to fetch diagnosis");
        console.error(err);
      } finally {
        setDiagnosisLoading(false);
      }
    };

    fetchDiagnosis();
  }, [patientId]);

  const filteredAppointments = selectedPatient?.Appointment || [];

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
        <p className="text-gray-500 text-lg">
          Select a patient to view their details
        </p>
      </main>
    );
  }

  const { name, email, phone, city, gender } = patient;

  return (
    <main className="flex flex-col flex-1 px-6 pt-2 pb-6 bg-gray-100 rounded-lg gap-6 h-[calc(100vh_-_130px)] overflow-y-auto">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {name || "Unknown Patient"}
        </h1>
        <Avatar className="w-10 h-10">
          <AvatarImage src="" alt={name || "Patient"} />
          <AvatarFallback>{name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6 shadow-md rounded-2xl border border-gray-100 bg-white col-span-2">
          <CardContent className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">
              Basic Info
            </h2>

            <div className="space-y-4 text-sm text-gray-700 my-auto">
              <InfoRow
                icon={<IoPersonOutline className="w-5 h-5 text-menavy my-3" />}
                label="Gender"
                value={gender}
              />
              <InfoRow
                icon={<IoLocationOutline className="w-5 h-5 text-menavy my-3" />}
                label="City"
                value={city}
              />
              <InfoRow
                icon={<IoCallOutline className="w-5 h-5 text-menavy my-3" />}
                label="Phone"
                value={phone}
              />
              <InfoRow
                icon={<IoMailOutline className="w-5 h-5 text-menavy my-3" />}
                label="Email"
                value={email}
              />
            </div>

            {/* <div className="pt-4 border-t">
              <span className="text-gray-700 text-sm font-medium">Sources</span>
              <div className="flex space-x-4 mt-3">
                <FcGoogle
                  className="w-6 h-6 hover:scale-105 transition-transform"
                  title="Google"
                />
                <FaWhatsapp
                  className="w-6 h-6 text-[#4fce5d] hover:scale-105 transition-transform"
                  title="WhatsApp"
                />
                <FaSquareFacebook
                  className="w-6 h-6 text-[#1877F2] hover:scale-105 transition-transform"
                  title="Facebook"
                />
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Diagnosis Section */}
        <Card className="p-6 shadow-sm rounded-xl border col-span-3 border-gray-200">
          <CardContent>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-gray-800">
                Past Diagnosis
              </h2>
              <button
                className="px-4 py-2 bg-[#37568d] text-white rounded-md text-sm font-medium hover:bg-[#1e3356] transition"
                onClick={() =>
                  navigate("/doctor/diagnosis", { state: { patient } })
                }
              >
                + Add Diagnosis
              </button>
            </div>

            {diagnosisLoading ? (
              <p className="text-gray-500 text-center py-4">
                Loading diagnoses...
              </p>
            ) : diagnosisError ? (
              <p className="text-red-500 text-center py-4">{diagnosisError}</p>
            ) : diagnoses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No diagnosis records found.
              </p>
            ) : (
              <div className="relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <button
                    onClick={() =>
                      setCurrentDiagnosisIndex((prev) =>
                        prev > 0 ? prev - 1 : diagnoses.length - 1
                      )
                    }
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                    title="Previous"
                  >
                    ←
                  </button>
                </div>

                <div className="mx-10 bg-gray-50 p-4 rounded-md shadow-inner border border-gray-100 text-sm">
                  <p className="text-base font-semibold text-blue-900 mb-1">
                    {currentDiagnosis.title}
                  </p>
                  <p className="text-gray-700 mb-2 italic">
                    {currentDiagnosis.description || "No details available"}
                  </p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Symptoms:</span>{" "}
                      {currentDiagnosis.symptoms?.join(", ") || "None"}
                    </p>
                    <p>
                      <span className="font-medium">Medications:</span>{" "}
                      {currentDiagnosis.medications
                        ?.map((med) => med.name)
                        .join(", ") || "None"}
                    </p>
                    <p>
                      <span className="font-medium">Recommendations:</span>{" "}
                      {currentDiagnosis.recommendations || "None"}
                    </p>
                    <p>
                      <span className="font-medium">Follow-up:</span>{" "}
                      {currentDiagnosis.followUp || "None"}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(
                        currentDiagnosis.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <button
                    onClick={() =>
                      setCurrentDiagnosisIndex(
                        (prev) => (prev + 1) % diagnoses.length
                      )
                    }
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                    title="Next"
                  >
                    →
                  </button>
                </div>

                <div className="mt-2 text-center text-xs text-gray-500">
                  Diagnosis {currentDiagnosisIndex + 1} of {diagnoses.length}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card className="p-6 shadow-sm rounded-xl border border-gray-200 col-span-2">
          <CardContent>
            <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
              Appointment Schedule
            </h2>
            <div className="space-y-4 text-sm text-gray-700">
              {filteredAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No appointments found.
                </p>
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
                    <div
                      key={appt._id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-100 shadow-inner"
                    >
                      <span className="text-blue-800 font-medium">
                        {new Date(appt.appointmentDate).toLocaleDateString()}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold capitalize tracking-wide border ${
                          priorityStyles[priority] || priorityStyles.normal
                        }`}
                      >
                        {priority}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
        {/* Medical History */}
        <Card className="p-6 shadow-sm rounded-xl border border-gray-200 col-span-3">
          <CardContent>
            <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
              Medical History
            </h2>
            {patient?.medicalHistory &&
            (patient.medicalHistory.allergies?.length > 0 ||
              patient.medicalHistory.chronicConditions?.length > 0 ||
              patient.medicalHistory.surgeries?.length > 0) ? (
              <div className="space-y-4 text-sm text-gray-700">
                {patient.medicalHistory.allergies?.length > 0 && (
                  <div>
                    <p className="font-semibold">Allergies:</p>
                    <ul className="list-disc list-inside ml-2 text-gray-600">
                      {patient.medicalHistory.allergies.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {patient.medicalHistory.chronicConditions?.length > 0 && (
                  <div>
                    <p className="font-semibold">Chronic Conditions:</p>
                    <ul className="list-disc list-inside ml-2 text-gray-600">
                      {patient.medicalHistory.chronicConditions.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {patient.medicalHistory.surgeries?.length > 0 && (
                  <div>
                    <p className="font-semibold">Surgeries:</p>
                    <ul className="list-disc list-inside ml-2 text-gray-600">
                      {patient.medicalHistory.surgeries.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No medical history available.</p>
            )}
          </CardContent>
        </Card>
      </div>
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
