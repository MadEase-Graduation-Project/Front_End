import { useState } from "react";

const appointmentsData = [
  {
    id: "a001",
    patientName: "Ahmed Mohamed",
    patientId: "p001",
    date: "2025-06-25",
    time: "09:30 AM",
    department: "Cardiology",
    doctor: "Dr. Hossam Ali",
    status: "Confirmed",
    notes: "Patient requires ECG before appointment.",
  },
  {
    id: "a002",
    patientName: "Mona Ali",
    patientId: "p002",
    date: "2025-07-01",
    time: "11:00 AM",
    department: "Neurology",
    doctor: "Dr. Sara Khaled",
    status: "Completed",
    notes: "Follow-up after MRI scan.",
  },
  {
    id: "a003",
    patientName: "Youssef Nabil",
    patientId: "p003",
    date: "2025-07-02",
    time: "02:00 PM",
    department: "Cardiology",
    doctor: "Dr. Hossam Ali",
    status: "Cancelled",
    notes: "Patient cancelled due to personal reasons.",
  },
  {
    id: "a004",
    patientName: "Fatma Hassan",
    patientId: "p004",
    date: "2025-07-03",
    time: "10:00 AM",
    department: "Nephrology",
    doctor: "Dr. Omar Farouk",
    status: "Confirmed",
    notes: "Dialysis scheduling.",
  },
  {
    id: "a005",
    patientName: "Mohamed Said",
    patientId: "p005",
    date: "2025-07-04",
    time: "01:30 PM",
    department: "Pulmonology",
    doctor: "Dr. Mona Youssef",
    status: "Completed",
    notes: "Asthma follow-up check.",
  },
  {
    id: "a006",
    patientName: "Sara Khaled",
    patientId: "p006",
    date: "202-07-05",
    time: "03:00 PM",
    department: "Hematology",
    doctor: "Dr. Fatma Hassan",
    status: "Completed",
    notes: "Review blood test results.",
  },
];

const statusColors = {
  Confirmed: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function NurseAppointments() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-[#142139]">Appointments</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#007eb1]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-white uppercase"
              >
                Patient Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-white uppercase"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-white uppercase"
              >
                Doctor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-white uppercase"
              >
                Date & Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-white uppercase"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-sm font-semibold text-white uppercase"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointmentsData.map((appt) => (
              <tr key={appt.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {appt.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {appt.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {appt.doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {appt.date} | {appt.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${statusColors[appt.status]}`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => setSelectedAppointment(appt)}
                    className="text-[#007eb1] hover:underline font-semibold"
                    aria-label={`View details for appointment with ${appt.patientName}`}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نافذة تفاصيل الموعد */}
      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </section>
  );
}

function AppointmentDetailsModal({ appointment, onClose }) {
  if (!appointment) return null;

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
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2
          id="modal-title"
          className="text-2xl font-bold text-[#142139] mb-4"
        >
          Appointment Details
        </h2>

        <div
          id="modal-description"
          className="space-y-3 text-gray-800 text-sm"
        >
          <p>
            <strong>Patient:</strong> {appointment.patientName} (ID:{" "}
            {appointment.patientId})
          </p>
          <p>
            <strong>Department:</strong> {appointment.department}
          </p>
          <p>
            <strong>Doctor:</strong> {appointment.doctor}
          </p>
          <p>
            <strong>Date & Time:</strong> {appointment.date} at {appointment.time}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full font-semibold ${
                {
                  Confirmed: "bg-blue-100 text-blue-800",
                  Completed: "bg-green-100 text-green-800",
                  Cancelled: "bg-red-100 text-red-800",
                }[appointment.status]
              }`}
            >
              {appointment.status}
            </span>
          </p>
          <p>
            <strong>Notes:</strong> {appointment.notes}
          </p>
        </div>
      </div>
    </div>
  );
}
