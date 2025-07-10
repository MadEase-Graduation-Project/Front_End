import { useState } from "react";

const patientsData = [
  {
    id: "p001",
    name: "Ahmed Mohamed",
    age: 33,
    gender: "Male",
    phone: "+201273182200",
    email: "ahmed.m@gmail.com.com",
    address: "Cairo, Egypt",
    admissionDate: "2025-07-02",
    diagnosis: "Diabetes Type 2",
    severity: "Moderate",
    medicalHistory: [
      "Diagnosed with Diabetes in 2022",
      "Regular insulin therapy",
      "No previous hospitalizations related to diabetes"
    ],
    notes: "Requires daily insulin shots.",
  },
  {
    id: "p002",
    name: "Mona Ali",
    age: 31,
    gender: "Female",
    phone: "+20101832078",
    email: "mona.ali@gmail.com",
    address: "Alexandria, Egypt",
    admissionDate: "2025-06-15",
    diagnosis: "Hypertension",
    severity: "Mild",
    medicalHistory: [
      "High blood pressure diagnosed in 2020",
      "Controlled with medication",
      "No complications reported"
    ],
    notes: "Under regular monitoring.",
  },
  {
    id: "p003",
    name: "Youssef Nabil",
    age: 42,
    gender: "Male",
    phone: "+20123338676",
    email: "youssef.nabil@gmail.com",
    address: "Giza, Egypt",
    admissionDate: "2025-05-20",
    diagnosis: "Coronary Artery Disease",
    severity: "High",
    medicalHistory: [
      "History of heart attacks",
      "Underwent angioplasty in 2021",
      "On blood thinners medication"
    ],
    notes: "Requires close cardiac monitoring.",
  },
  {
    id: "p004",
    name: "Fatma Hassan",
    age: 50,
    gender: "Female",
    phone: "+20114566662",
    email: "fatma.hassan@gmail.com",
    address: "Shubra El-Kheima, Egypt",
    admissionDate: "2025-06-15",
    diagnosis: "Chronic Kidney Disease",
    severity: "Moderate",
    medicalHistory: [
      "Stage 3 CKD diagnosed in 2022",
      "On dialysis twice weekly",
      "Monitoring kidney function regularly"
    ],
    notes: "Needs dialysis support.",
  },
  {
    id: "p005",
    name: "Mohamed Said",
    age: 38,
    gender: "Male",
    phone: "+201018323339",
    email: "mohamed.said@gmail.com",
    address: "Mansoura, Egypt",
    admissionDate: "2025-05-25",
    diagnosis: "Asthma",
    severity: "Mild",
    medicalHistory: [
      "Diagnosed with asthma since childhood",
      "Uses inhalers as needed",
      "No recent hospital admissions"
    ],
    notes: "Requires periodic monitoring.",
  },
  {
    id: "p006",
    name: "Sara Khaled",
    age: 27,
    gender: "Female",
    phone: "+201289766636",
    email: "sara.khaled@gmail.com",
    address: "Tanta, Egypt",
    admissionDate: "2025-06-12",
    diagnosis: "Anemia",
    severity: "Low",
    medicalHistory: [
      "Iron deficiency anemia diagnosed recently",
      "Prescribed iron supplements",
      "Regular blood tests scheduled"
    ],
    notes: "Monitor hemoglobin levels.",
  },
  {
    id: "p007",
    name: "Omar Farouk",
    age: 60,
    gender: "Male",
    phone: "+201289766631",
    email: "omar.farouk@gmail.com",
    address: "Ismailia, Egypt",
    admissionDate: "2025-05-26",
    diagnosis: "Stroke Recovery",
    severity: "High",
    medicalHistory: [
      "Suffered stroke in 2023",
      "Rehabilitation therapy ongoing",
      "On blood pressure and cholesterol meds"
    ],
    notes: "Needs physical therapy support.",
  },
  {
    id: "p008",
    name: "Nadia Youssef",
    age: 45,
    gender: "Female",
    phone: "+201087633365",
    email: "nadia.youssef@gmail.com",
    address: "Fayoum, Egypt",
    admissionDate: "2025-04-30",
    diagnosis: "Breast Cancer",
    severity: "High",
    medicalHistory: [
      "Diagnosed stage 2 breast cancer",
      "Completed chemotherapy",
      "Scheduled for surgery next month"
    ],
    notes: "Requires close oncology follow-up.",
  },
];


function PatientDetailsModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full w-24 h-24 flex items-center justify-center bg-[#007eb1] text-white font-bold text-3xl shadow-md">
            {patient.id.toUpperCase()}
          </div>
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            {patient.name}
          </h2>
          <p className="text-gray-600 italic">{patient.diagnosis}</p>
          <p
            className={`font-semibold mt-1 ${
              patient.severity === "High"
                ? "text-red-600"
                : patient.severity === "Moderate"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            Severity: {patient.severity}
          </p>
        </div>

        <div
          id="modal-description"
          className="mt-6 space-y-3 text-gray-700 text-sm"
        >
          <p>
            <strong>Age:</strong> {patient.age} years
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Phone:</strong> {patient.phone}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Address:</strong> {patient.address}
          </p>
          <p>
            <strong>Admission Date:</strong> {patient.admissionDate}
          </p>
          <p>
            <strong>Notes:</strong> {patient.notes}
          </p>
          <div>
            <strong>Medical History:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              {patient.medicalHistory.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NursePatients() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-[#142139]">Patients</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {patientsData.map((patient, index) => (
          <div
            key={patient.id}
            onClick={() => setSelectedPatient(patient)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedPatient(patient);
            }}
            className="cursor-pointer bg-white rounded-lg shadow-md p-5 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
            aria-label={`Open details for ${patient.name}`}
          >
            <div className="rounded-full w-20 h-20 flex items-center justify-center bg-[#007eb1] text-white font-bold text-3xl shadow-sm">
              P{index + 1}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
            <p className="text-sm text-gray-500">{patient.diagnosis}</p>
            <p
              className={`font-semibold ${
                patient.severity === "High"
                  ? "text-red-600"
                  : patient.severity === "Moderate"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {patient.severity} Severity
            </p>
          </div>
        ))}
      </div>

      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </section>
  );
}
