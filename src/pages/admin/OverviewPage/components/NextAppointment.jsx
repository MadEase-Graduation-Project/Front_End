import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaUserAlt,
  FaExclamationTriangle,
  FaCalendarCheck,
  FaStethoscope,
  FaExclamationCircle,
  FaCheckCircle,
  FaHourglassHalf,
  FaFire,
  FaFlag,
  FaRegClock,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectAllAppointments } from "@/store/selectors";

const NextAppointments = () => {
  const appointments = useSelector(selectAllAppointments);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const appointmentTime = (date) => {
    return format(date, "h:mm a");
  };

  // Enhanced priority configuration
  const priorityConfig = {
    important: {
      color: "from-red-500 to-red-600",
      bgColor: "bg-gradient-to-r from-red-50 to-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200",
      icon: FaFire,
      label: "Urgent",
    },
    medium: {
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-100",
      textColor: "text-orange-800",
      borderColor: "border-orange-200",
      icon: FaFlag,
      label: "Medium",
    },
    normal: {
      color: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-r from-green-50 to-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      icon: FaCheckCircle,
      label: "Normal",
    },
  };

  // Status configuration
  const statusConfig = {
    confirmed: {
      icon: FaCheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    pending: {
      icon: FaHourglassHalf,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    cancelled: {
      icon: FaExclamationCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      if (!appointments) {
        setTodayAppointments([]);
        setIsLoading(false);
        return;
      }

      const filteredAppointments = appointments.filter((appointment) => {
        try {
          const today = format(new Date(), "yyyy-MM-dd");
          const appointmentDate = format(appointment.createdAt, "yyyy-MM-dd");
          return appointmentDate === today;
        } catch (error) {
          console.log(error);
          return false;
        }
      });

      const sortedAppointments = [...filteredAppointments].sort((a, b) => {
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

  // Enhanced loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FaCalendarAlt className="text-blue-500 text-xl" />
          </motion.div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Today`s Appointments
          </h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Enhanced error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg border border-red-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaExclamationTriangle className="text-red-500 text-xl" />
          <h2 className="text-xl font-bold text-red-700">
            Today`s Appointments
          </h2>
        </div>
        <div className="flex h-full flex-col items-center justify-center p-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaExclamationTriangle className="text-red-400 text-4xl mb-4" />
          </motion.div>
          <p className="text-center text-red-600 font-medium">{error}</p>
          <p className="text-sm mt-2 text-red-500">Please try again later</p>
        </div>
      </motion.div>
    );
  }

  // Enhanced empty state
  if (todayAppointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaCalendarAlt className="text-blue-500 text-xl" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            Today`s Appointments
          </h2>
        </div>
        <div className="flex h-full flex-col items-center justify-center p-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarCheck className="text-blue-500 text-3xl" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
            >
              <FaCheckCircle className="text-white text-sm" />
            </motion.div>
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            All Clear for Today!
          </h3>
          <p className="text-center text-gray-500 mb-2">
            No appointments scheduled for today
          </p>
          <p className="text-center text-sm text-gray-400">
            Enjoy your free time or schedule new appointments
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-gradient-to-br from-white via-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FaCalendarAlt className="text-blue-500 text-xl" />
          </motion.div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Today`s Appointments
          </h2>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-md"
        >
          <FaRegClock className="text-xs" />
          {todayAppointments.length}
        </motion.div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4 max-h-[350px] overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        <AnimatePresence>
          {todayAppointments.map((appointment, index) => {
            const priority = appointment.priority?.toLowerCase() || "normal";
            const status = appointment.status?.toLowerCase() || "pending";
            const priorityInfo =
              priorityConfig[priority] || priorityConfig.normal;
            const statusInfo = statusConfig[status] || statusConfig.pending;
            const PriorityIcon = priorityInfo.icon;
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative group"
              >
                <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-white">
                  {/* Priority Indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b ${priorityInfo.color}`}
                  />

                  {/* Patient Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        {appointment.patientName?.[0] ? (
                          <span className="text-white font-bold text-lg">
                            {appointment.patientName[0].toUpperCase()}
                          </span>
                        ) : (
                          <FaUserAlt className="text-white" size={16} />
                        )}
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${statusInfo.bgColor} flex items-center justify-center border-2 border-white`}
                      >
                        <StatusIcon className={`${statusInfo.color} text-xs`} />
                      </motion.div>
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 truncate">
                          {appointment.patientName || "Unknown Patient"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaStethoscope className="text-blue-400" size={12} />
                        <span className="truncate">
                          {appointment.doctorName || "Unknown Doctor"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Time and Priority */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
                        <FaClock className="text-blue-400" size={12} />
                        <span className="text-sm">
                          {appointmentTime(appointment.createdAt) || "No time"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StatusIcon className={`${statusInfo.color} text-xs`} />
                        <span className="text-xs text-gray-500 capitalize">
                          {appointment.status || "Pending"}
                        </span>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-3 py-2 rounded-xl ${priorityInfo.bgColor} ${priorityInfo.borderColor} border shadow-sm cursor-pointer`}
                    >
                      <div className="flex items-center gap-2">
                        <PriorityIcon
                          className={`${priorityInfo.textColor} text-sm`}
                        />
                        <span
                          className={`text-xs font-bold ${priorityInfo.textColor}`}
                        >
                          {priorityInfo.label}
                        </span>
                      </div>
                      {priority === "important" && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                        />
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4 pt-4 border-t border-gray-100"
      >
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-gray-600">
                {
                  todayAppointments.filter((a) => a.priority === "important")
                    .length
                }{" "}
                Urgent
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-600">
                {
                  todayAppointments.filter((a) => a.status === "confirmed")
                    .length
                }{" "}
                Confirmed
              </span>
            </div>
          </div>
          <span className="text-gray-500 font-medium">
            Total: {todayAppointments.length} appointments
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NextAppointments;
