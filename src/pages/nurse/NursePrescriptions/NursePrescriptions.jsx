import { useState } from "react";

const prescriptionsData = [
  {
    id: "presc001",
    patientName: "Ahmed Mohamed",
    patientId: "p001",
    date: "2024-07-01",
    doctor: "Dr. Hossam Ali",
    medications: [
      {
        name: "Paracetamol",
        dose: "500 mg",
        frequency: "3 times a day",
        duration: "5 days",
        notes: "Take after meals",
      },
      {
        name: "Amoxicillin",
        dose: "250 mg",
        frequency: "2 times a day",
        duration: "7 days",
        notes: "Complete the full course",
      },
    ],
  },
  {
    id: "presc002",
    patientName: "Mona Ali",
    patientId: "p002",
    date: "2024-07-03",
    doctor: "Dr. Sara Khaled",
    medications: [
      {
        name: "Ibuprofen",
        dose: "400 mg",
        frequency: "3 times a day",
        duration: "3 days",
        notes: "Avoid on empty stomach",
      },
    ],
  },
  {
    id: "presc003",
    patientName: "Youssef Nabil",
    patientId: "p003",
    date: "2024-06-28",
    doctor: "Dr. Omar Farouk",
    medications: [
      {
        name: "Metformin",
        dose: "500 mg",
        frequency: "2 times a day",
        duration: "30 days",
        notes: "Monitor blood sugar regularly",
      },
      {
        name: "Lisinopril",
        dose: "10 mg",
        frequency: "Once daily",
        duration: "30 days",
        notes: "Check blood pressure regularly",
      },
    ],
  },
  {
    id: "presc004",
    patientName: "Fatma Hassan",
    patientId: "p004",
    date: "2024-07-05",
    doctor: "Dr. Mona Youssef",
    medications: [
      {
        name: "Albuterol Inhaler",
        dose: "2 puffs",
        frequency: "As needed",
        duration: "Use as needed",
        notes: "For asthma relief",
      },
    ],
  },
  {
    id: "presc005",
    patientName: "Mohamed Said",
    patientId: "p005",
    date: "2024-07-02",
    doctor: "Dr. Fatma Hassan",
    medications: [
      {
        name: "Atorvastatin",
        dose: "20 mg",
        frequency: "Once daily",
        duration: "30 days",
        notes: "Take in the evening",
      },
    ],
  },
];

export default function NursePrescriptions() {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-[#142139]">Prescriptions</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#007eb1]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">
                Doctor
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-white uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prescriptionsData.map((presc) => (
              <tr
                key={presc.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedPrescription(presc)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {presc.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {presc.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {presc.doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-[#007eb1] font-semibold underline">
                  View Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPrescription && (
        <PrescriptionDetailsModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />
      )}
    </section>
  );
}

function PrescriptionDetailsModal({ prescription, onClose }) {
  if (!prescription) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close prescription details"
        >
          ×
        </button>

        <h2 id="modal-title" className="text-3xl font-bold text-[#142139] mb-4">
          Prescription Details
        </h2>

        <p className="text-gray-700 font-semibold mb-2">
          Patient: {prescription.patientName} (ID: {prescription.patientId})
        </p>
        <p className="text-gray-500 mb-6">Date: {prescription.date}</p>
        <p className="text-gray-700 font-semibold mb-2">Prescribed by: {prescription.doctor}</p>

        <div id="modal-description" className="text-gray-800 space-y-4">
          {prescription.medications.map((med, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <p>
                <strong>Medication:</strong> {med.name}
              </p>
              <p>
                <strong>Dose:</strong> {med.dose}
              </p>
              <p>
                <strong>Frequency:</strong> {med.frequency}
              </p>
              <p>
                <strong>Duration:</strong> {med.duration}
              </p>
              <p>
                <strong>Notes:</strong> {med.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
