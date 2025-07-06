import { useState } from "react";

const emergenciesData = [
  {
    id: "emg001",
    patientName: "Ahmed Mohamed",
    patientId: "p001",
    age: 45,
    condition: "Acute Myocardial Infarction",
    severity: "Critical",
    admittedAt: "2024-07-05 14:30",
    symptoms: [
      "Chest pain",
      "Shortness of breath",
      "Sweating",
      "Nausea",
    ],
    treatmentPlan: "Administer aspirin, oxygen therapy, prepare for PCI.",
    assignedNurse: "Nurse Sara Khaled",
    room: "ICU - Bed 3",
    status: "Under treatment",
  },
  {
    id: "emg002",
    patientName: "Mona Ali",
    patientId: "p002",
    age: 33,
    condition: "Severe Asthma Attack",
    severity: "High",
    admittedAt: "2024-07-05 15:10",
    symptoms: [
      "Wheezing",
      "Rapid breathing",
      "Coughing",
      "Use of accessory muscles",
    ],
    treatmentPlan: "Administer bronchodilators, corticosteroids, monitor oxygen saturation.",
    assignedNurse: "Nurse Omar Farouk",
    room: "Emergency Ward - Bed 7",
    status: "Monitoring",
  },
  {
    id: "emg003",
    patientName: "Fatma Hassan",
    patientId: "p004",
    age: 27,
    condition: "Severe Allergic Reaction (Anaphylaxis)",
    severity: "Critical",
    admittedAt: "2024-07-05 16:00",
    symptoms: [
      "Swelling of face and lips",
      "Difficulty breathing",
      "Rapid heartbeat",
      "Low blood pressure",
    ],
    treatmentPlan: "Administer epinephrine, antihistamines, IV fluids, prepare for airway management.",
    assignedNurse: "Nurse Hossam Ali",
    room: "ICU - Bed 1",
    status: "Emergency intervention",
  },
  {
    id: "emg004",
    patientName: "Youssef Nabil",
    patientId: "p003",
    age: 60,
    condition: "Stroke (Cerebrovascular Accident)",
    severity: "Critical",
    admittedAt: "2024-07-05 13:45",
    symptoms: [
      "Sudden weakness on right side",
      "Slurred speech",
      "Facial droop",
      "Loss of coordination",
    ],
    treatmentPlan: "CT scan, thrombolytic therapy, monitor vital signs closely.",
    assignedNurse: "Nurse Mona Youssef",
    room: "Stroke Unit - Bed 5",
    status: "Under observation",
  },
  {
    id: "emg005",
    patientName: "Mohamed Said",
    patientId: "p005",
    age: 52,
    condition: "Severe Trauma from Car Accident",
    severity: "High",
    admittedAt: "2024-07-05 12:20",
    symptoms: [
      "Multiple fractures",
      "Severe bleeding",
      "Shock symptoms",
    ],
    treatmentPlan: "Control bleeding, stabilize fractures, prepare for surgery.",
    assignedNurse: "Nurse Ahmed Hassan",
    room: "Trauma Center - Bed 2",
    status: "Critical care",
  },
];

export default function NurseEmergencies() {
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-[#b91c1c]">Emergency Cases</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {emergenciesData.map((emg) => (
          <div
            key={emg.id}
            onClick={() => setSelectedEmergency(emg)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedEmergency(emg);
            }}
            className={`cursor-pointer rounded-xl shadow-lg p-6 transition-transform transform hover:scale-[1.03] ${
              emg.severity === "Critical"
                ? "bg-red-50 border-4 border-red-600"
                : emg.severity === "High"
                ? "bg-yellow-50 border-4 border-yellow-400"
                : "bg-green-50 border-4 border-green-400"
            }`}
            aria-label={`View details of emergency case for ${emg.patientName}`}
          >
            <h2 className="text-2xl font-bold mb-2 text-[#b91c1c]">{emg.condition}</h2>
            <p className="font-semibold text-gray-800">{emg.patientName} (Age: {emg.age})</p>
            <p className="italic text-sm text-gray-600 mb-4">{emg.admittedAt}</p>
            <p className="font-semibold mb-2">
              Severity:{" "}
              <span
                className={`${
                  emg.severity === "Critical"
                    ? "text-red-700"
                    : emg.severity === "High"
                    ? "text-yellow-700"
                    : "text-green-700"
                }`}
              >
                {emg.severity}
              </span>
            </p>
            <p className="line-clamp-3 text-gray-700 mb-2">
              <strong>Assigned Nurse:</strong> {emg.assignedNurse}
            </p>
            <p className="text-gray-700 font-semibold">
              Status: <span className="capitalize">{emg.status}</span>
            </p>
          </div>
        ))}
      </div>

      {selectedEmergency && (
        <EmergencyDetailsModal
          emergency={selectedEmergency}
          onClose={() => setSelectedEmergency(null)}
        />
      )}
    </section>
  );
}

function EmergencyDetailsModal({ emergency, onClose }) {
  if (!emergency) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 text-3xl font-bold"
          aria-label="Close emergency details"
        >
          ×
        </button>

        <h2 id="modal-title" className="text-4xl font-extrabold text-[#b91c1c] mb-6">
          Emergency Case Details
        </h2>

        <p className="text-xl font-semibold mb-2">
          Patient: {emergency.patientName} (ID: {emergency.patientId}, Age: {emergency.age})
        </p>
        <p className="text-gray-600 italic mb-4">Admitted at: {emergency.admittedAt}</p>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-1 text-[#b91c1c]">Condition</h3>
          <p className="text-gray-800">{emergency.condition}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-1 text-[#b91c1c]">Severity Level</h3>
          <p
            className={`font-semibold ${
              emergency.severity === "Critical"
                ? "text-red-700"
                : emergency.severity === "High"
                ? "text-yellow-700"
                : "text-green-700"
            }`}
          >
            {emergency.severity}
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-1 text-[#b91c1c]">Symptoms</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {emergency.symptoms.map((symptom, idx) => (
              <li key={idx}>{symptom}</li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-1 text-[#b91c1c]">Treatment Plan</h3>
          <p className="text-gray-800">{emergency.treatmentPlan}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-1 text-[#b91c1c]">Assigned Nurse</h3>
          <p className="text-gray-800">{emergency.assignedNurse}</p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-1 text-[#b91c1c]">Room</h3>
          <p className="text-gray-800">{emergency.room}</p>
        </section>
      </div>
    </div>
  );
}
