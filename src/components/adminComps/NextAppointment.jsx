import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCalendarAlt, FaClock, FaUserAlt, FaUserMd } from "react-icons/fa";

const NextAppointments = ({ appointments }) => {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const appointmentTime = (date) => {
    return format(date, "h:mm a");
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if appointments is available
      if (!appointments) {
        setTodayAppointments([]);
        setIsLoading(false);
        return;
      }

      // Filter appointments for today
      // First try to use appointmentDate, fall back to createdAt if needed
      const filteredAppointments = appointments.filter((appointment) => {
        try {
          // Fall back to createdAt
          const today = format(new Date(), "yyyy-MM-dd");
          const appointmentDate = format(appointment.createdAt, "yyyy-MM-dd");
          return appointmentDate === today;
        } catch (error) {
          // If date parsing fails, exclude this appointment
          console.log(error);
          return false;
        }
      });

      // Sort appointments by time if available
      const sortedAppointments = [...filteredAppointments].sort((a, b) => {
        // If time property exists, sort by it
        if (a.time && b.time) {
          return a.time.localeCompare(b.time);
        }
        return 0;
      });

      setTodayAppointments(sortedAppointments);
    } catch (err) {
      setError("Failed to process appointments");
      console.error("Error processing appointments:", err);
    } finally {
      setIsLoading(false);
    }
  }, [appointments]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          Today{"'"}s Appointments
        </h2>
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          Today{"'"}s Appointments
        </h2>
        <div className="flex h-full flex-col items-center justify-center p-8 text-red-500">
          <p className="text-center">{error}</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (todayAppointments.length === 0) {
    return (
      <div className="h-full bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          Today{"'"}s Appointments
        </h2>
        <div className="flex h-full flex-col items-center justify-center p-8">
          <div className="text-gray-500 text-lg mb-2">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-blue-400 text-2xl" />
            </div>
            <p className="text-center">No appointments scheduled for today</p>
            <p className="text-center text-sm mt-2 text-gray-400">
              Check back later or schedule a new appointment
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        Today{"'"}s Appointments ({todayAppointments.length})
      </h2>

      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
        {todayAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {appointment.patientName?.[0] || <FaUserAlt size={16} />}
                </span>
              </div>
              <div>
                <div className="flex items-center">
                  <p className="font-medium text-gray-900">
                    {appointment.patientName || "Unknown Patient"}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaUserMd className="mr-1" size={12} />
                  {appointment.doctorName || "Unknown Doctor"}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-left">
                <div className="flex items-center justify-end font-medium text-gray-900">
                  <FaClock className="mr-1 text-gray-400" size={12} />
                  {appointmentTime(appointment.createdAt) ||
                    "No time specified"}
                </div>
                <p className="text-sm text-gray-500">
                  {appointment.status || "Pending"}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.priority === "important"
                    ? "bg-red-100 text-red-800"
                    : appointment.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {appointment.priority || "Normal"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextAppointments;
