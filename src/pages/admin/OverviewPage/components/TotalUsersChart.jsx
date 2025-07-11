import { PieChart } from "@mui/x-charts/PieChart";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserInjured,
  FaUserMd,
  FaUserNurse,
  FaUserCog,
  FaHospital,
  FaChartPie,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import {
  selectTotalAdmin,
  selectTotalHospitals,
  selectTotalNurses,
  selectTotalPatients,
  selectTotalUsers,
  selectTotalDoctors,
  selectUsersLoading,
  selectUsersError,
} from "@/store/selectors";

export default function TotalUsersChart() {
  const totalUsers = useSelector(selectTotalUsers);
  const totalPatients = useSelector(selectTotalPatients);
  const totalDoctors = useSelector(selectTotalDoctors);
  const totalNurses = useSelector(selectTotalNurses);
  const totalAdmins = useSelector(selectTotalAdmin);
  const totalHospitals = useSelector(selectTotalHospitals);

  const isLoading = useSelector(selectUsersLoading);
  const hasError = useSelector(selectUsersError);

  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Enhanced gradient color palette
  const colors = {
    Patients: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)", // Green gradient
    Doctors: "linear-gradient(135deg, #2196F3 0%, #1976d2 100%)", // Blue gradient
    Nurses: "linear-gradient(135deg, #FF9800 0%, #f57c00 100%)", // Orange gradient
    Admins: "linear-gradient(135deg, #9C27B0 0%, #7b1fa2 100%)", // Purple gradient
    Hospitals: "linear-gradient(135deg, #00BCD4 0%, #0097a7 100%)", // Cyan gradient
  };

  // Solid colors for chart (MUI charts doesn't support gradients directly)
  const solidColors = {
    Patients: "#4CAF50",
    Doctors: "#2196F3",
    Nurses: "#FF9800",
    Admins: "#9C27B0",
    Hospitals: "#00BCD4",
  };

  const userData = useMemo(
    () => [
      {
        id: "Patients",
        label: "Patients",
        value: totalPatients || 0,
        color: solidColors.Patients,
        gradient: colors.Patients,
        icon: FaUserInjured,
      },
      {
        id: "Doctors",
        label: "Doctors",
        value: totalDoctors || 0,
        color: solidColors.Doctors,
        gradient: colors.Doctors,
        icon: FaUserMd,
      },
      {
        id: "Nurses",
        label: "Nurses",
        value: totalNurses || 0,
        color: solidColors.Nurses,
        gradient: colors.Nurses,
        icon: FaUserNurse,
      },
      {
        id: "Admins",
        label: "Admins",
        value: totalAdmins || 0,
        color: solidColors.Admins,
        gradient: colors.Admins,
        icon: FaUserCog,
      },
      {
        id: "Hospitals",
        label: "Hospitals",
        value: totalHospitals || 0,
        color: solidColors.Hospitals,
        gradient: colors.Hospitals,
        icon: FaHospital,
      },
    ],
    [totalPatients, totalDoctors, totalNurses, totalAdmins, totalHospitals]
  );

  // Find dominant user type
  const dominantUserType = useMemo(() => {
    if (totalUsers === 0) return null;
    return userData.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    );
  }, [userData, totalUsers]);

  // Check if all values are zero
  const isEmpty = totalUsers === 0;

  // Enhanced loading state with animation
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 p-6 h-full"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaChartPie className="text-gray-400 text-lg" />
          <h2 className="text-xl font-bold text-gray-700">User Distribution</h2>
        </div>
        <div className="flex items-center justify-center flex-1 min-h-0 py-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Skeleton className="h-[180px] w-[180px] rounded-full" />
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Skeleton className="h-6 w-full rounded-lg" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Enhanced error state
  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg border border-red-200 p-6 h-full"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaExclamationTriangle className="text-red-500 text-lg" />
          <h2 className="text-xl font-bold text-red-700">User Distribution</h2>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaExclamationTriangle className="text-red-400 text-4xl mb-3" />
          </motion.div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Unable to Load Data
          </h3>
          <p className="text-red-500 text-sm text-center">
            Please check your connection and try again
          </p>
        </div>
      </motion.div>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200 p-6 h-full"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaChartPie className="text-gray-400 text-lg" />
          <h2 className="text-xl font-bold text-gray-600">User Distribution</h2>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FaChartPie className="text-gray-300 text-5xl mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-400 text-sm text-center">
            User data will appear here once available
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
      className="flex flex-col bg-gradient-to-br from-white via-gray-50 to-white rounded-xl shadow-lg border border-gray-100 p-6 h-full hover:shadow-xl transition-shadow duration-300"
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <FaChartPie className="text-blue-500 text-lg" />
        </motion.div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          User Distribution
        </h2>
      </div>

      {/* Dominant User Type Insight */}
      {dominantUserType && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-3"
        >
          <p className="text-xs text-gray-500">
            Majority:{" "}
            <span
              className="font-semibold"
              style={{ color: dominantUserType.color }}
            >
              {dominantUserType.label} (
              {Math.round((dominantUserType.value / totalUsers) * 100)}%)
            </span>
          </p>
        </motion.div>
      )}

      <div className="relative flex items-center justify-center flex-1 min-h-0">
        {/* Enhanced Center Content */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <div className="text-sm font-medium text-gray-500 mb-1">
            Total Users
          </div>
          <motion.div
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ scale: hoveredSegment ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {totalUsers?.toLocaleString()}
          </motion.div>
          <div className="text-xs text-gray-400 mt-1">Active</div>
        </motion.div>

        {/* Enhanced Chart */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <PieChart
            colors={userData?.map((item) => item.color)}
            series={[
              {
                data: userData.filter((item) => item.value > 0),
                innerRadius: 50,
                outerRadius: 85,
                paddingAngle: 3,
                cornerRadius: 6,
                highlightScope: { fade: "global", highlight: "item" },
                arcLabel: (item) =>
                  item.value > 0 && totalUsers > 0
                    ? `${Math.round((item.value / totalUsers) * 100)}%`
                    : "",
                arcLabelStyle: {
                  fontSize: 11,
                  fontWeight: 600,
                  fill: "white",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                },
              },
            ]}
            slotProps={{
              legend: { hidden: true },
              pieArcLabel: {
                style: {
                  fontSize: "11px",
                  fontWeight: "bold",
                  fill: "white",
                },
              },
            }}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            height={200}
            width={200}
          />
        </motion.div>
      </div>

      {/* Enhanced Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-3 mt-4"
      >
        <AnimatePresence>
          {userData
            .filter((item) => item.value > 0)
            .map((item, index) => {
              const Icon = item.icon;
              const percentage =
                totalUsers > 0
                  ? Math.round((item.value / totalUsers) * 100)
                  : 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 2 }}
                  onHoverStart={() => setHoveredSegment(item.id)}
                  onHoverEnd={() => setHoveredSegment(null)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                >
                  <motion.div
                    className="flex items-center justify-center h-8 w-8 rounded-full shadow-sm"
                    style={{ background: item.gradient }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={12} color="white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">
                        {percentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-lg font-bold text-gray-900">
                        {item.value.toLocaleString()}
                      </span>
                      <motion.div
                        className="h-1 bg-gray-200 rounded-full overflow-hidden"
                        style={{ width: "40px" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: item.gradient }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.div>

      {/* Show empty categories if any */}
      {userData.some((item) => item.value === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-3 pt-3 border-t border-gray-100"
        >
          <p className="text-xs text-gray-400 text-center mb-2">No data for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {userData
              .filter((item) => item.value === 0)
              .map((item) => (
                <span
                  key={item.id}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                >
                  {item.label}
                </span>
              ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
