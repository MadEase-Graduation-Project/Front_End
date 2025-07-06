import { useState, useEffect } from "react";

export default function AppointmentModal({ doctor, isOpen, onClose, onConfirm, isLoading }) {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [priority, setPriority] = useState("Normal");

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (!appointmentDate) {
      alert("Please select a date");
      return;
    }

    onConfirm({ 
      priority: priority.toLowerCase(),
      appointmentDate 
    });
    // Don't call onClose() here - let the parent handle it after successful booking
  };

  const handleClose = () => {
    // Reset form when closing
    setAppointmentDate("");
    setPriority("Normal");
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Book Appointment with {doctor?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill out the form below to confirm your appointment.
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            >
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
              <option value="Important">Important</option>
              <option value="Critical">Critical</option>
            </select>
            <div className="mt-2 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                priority === 'Normal' ? 'bg-green-500' :
                priority === 'Low' ? 'bg-yellow-500' :
                priority === 'Important' ? 'bg-orange-500' :
                'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {priority === 'Normal' ? 'Normal Priority' :
                 priority === 'Low' ? 'Low Priority' :
                 priority === 'Important' ? 'Important Priority' :
                 'Critical Priority'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !appointmentDate}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}