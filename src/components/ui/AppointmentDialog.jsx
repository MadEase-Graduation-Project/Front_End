import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  updateAppointment,
  createAppointment,
} from "@/store/Slices/Appointments";
import { useDispatch } from "react-redux";

/**
 * A reusable dialog component for creating or editing appointments
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @param {Object} props.appointment - The appointment to edit (null for create mode)
 * @param {boolean} props.isCreateMode - Whether this is create mode (true) or edit mode (false)
 */
export default function AppointmentDialog({
  isOpen,
  onClose,
  appointment,
  isCreateMode = false,
}) {
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    priority: "",
  });

  // Priority options
  const priorityOptions = ["Low", "Medium", "High", "Urgent"];

  // Initialize form data when appointment changes
  useEffect(() => {
    if (appointment) {
      // Format date for input field (YYYY-MM-DD)
      let formattedDate = "";
      if (appointment.appointmentDate) {
        const date = new Date(appointment.appointmentDate);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split("T")[0];
        }
      }

      setFormData({
        patientName: appointment.patientName || "",
        doctorName: appointment.doctorName || "",
        appointmentDate: formattedDate,
        priority: appointment.priority || "Medium",
      });
    } else if (isCreateMode) {
      // Reset form for create mode
      setFormData({
        patientName: "",
        doctorName: "",
        appointmentDate: "",
        priority: "Medium",
      });
    }
  }, [appointment, isCreateMode]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create appointment data object
    const appointmentData = {
      ...formData,
      // Convert date string to ISO format if needed
      appointmentDate: formData.appointmentDate
        ? new Date(formData.appointmentDate).toISOString()
        : null,
    };

    if (isCreateMode) {
      // Dispatch create action
      dispatch(createAppointment(appointmentData));
    } else {
      // Make sure we have an ID for editing
      if (!appointment?._id) return;

      // Dispatch update action
      dispatch(
        updateAppointment({
          id: appointment._id,
          appointmentData,
        })
      );
    }

    // Close the dialog
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isCreateMode ? "Create Appointment" : "Edit Appointment"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Patient Name */}
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Doctor Name */}
            <div>
              <label
                htmlFor="doctorName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Doctor Name
              </label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Appointment Date */}
            <div>
              <label
                htmlFor="appointmentDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Appointment Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {isCreateMode ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
