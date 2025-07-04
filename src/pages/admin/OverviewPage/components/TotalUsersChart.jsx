import { PieChart } from "@mui/x-charts/PieChart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FaUserInjured,
  FaUserMd,
  FaUserNurse,
  FaUserCog,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  selectTotalAdmin,
  selectTotalHospitals,
  selectTotalNurses,
  selectTotalPatients,
  selectTotalUsers,
  selectTotalDoctors,
  selectUsersLoading,
  selectUsersError,
} from "@/store/selectors"; // adjust path if needed

export default function TotalUsersChart() {
  const totalUsers = useSelector(selectTotalUsers);
  const totalPatients = useSelector(selectTotalPatients);
  const totalDoctors = useSelector(selectTotalDoctors);
  const totalNurses = useSelector(selectTotalNurses);
  const totalAdmins = useSelector(selectTotalAdmin);
  const totalHospitals = useSelector(selectTotalHospitals);

  const isLoading = useSelector(selectUsersLoading);
  const hasError = useSelector(selectUsersError);

  // Define colors for each user type
  const colors = {
    Patients: "#4CAF50", // Green
    Doctors: "#2196F3", // Blue
    Nurses: "#FF9800", // Orange
    Admins: "#9C27B0", // Purple
    Hospitals: "#00B8D9", // Cyan
  };

  const userData = [
    {
      id: "Patients",
      label: "Patients",
      value: totalPatients || 0,
      color: colors.Patients,
      icon: FaUserInjured,
    },
    {
      id: "Doctors",
      label: "Doctors",
      value: totalDoctors || 0,
      color: colors.Doctors,
      icon: FaUserMd,
    },
    {
      id: "Nurses",
      label: "Nurses",
      value: totalNurses || 0,
      color: colors.Nurses,
      icon: FaUserNurse,
    },
    {
      id: "Admins",
      label: "Admins",
      value: totalAdmins || 0,
      color: colors.Admins,
      icon: FaUserCog,
    },
    {
      id: "Hospitals",
      label: "Hospitals",
      value: totalHospitals || 0,
      color: colors.Hospitals,
      icon: FaUserCog, // You may want to use a different icon for hospitals
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col bg-white rounded-lg p-4 h-full">
        <h2 className="text-xl font-semibold text-center mb-2">
          User Distribution
        </h2>
        <div className="flex items-center justify-center flex-1 min-h-0 py-2">
          <Skeleton className="h-[160px] w-[160px] rounded-full" />
        </div>
        <div className="w-full grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="flex flex-col bg-white rounded-lg p-4 h-full">
        <h2 className="text-xl font-semibold text-center mb-2">
          User Distribution
        </h2>
        <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-4">
          <h3 className="text-lg font-semibold text-red-500 mb-1">
            Error Loading Data
          </h3>
          <p className="text-gray-500 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm p-4 h-full">
      <h2 className="text-xl font-semibold text-center mb-2">
        User Distribution
      </h2>

      <div className="relative flex items-center justify-center flex-1 min-h-0">
        {/* Center content with proper positioning */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="text-base font-medium text-gray-500">Total</div>
          <div className="text-2xl font-bold">{totalUsers}</div>
        </div>

        {/* Chart - Responsive sizing */}
        <PieChart
          colors={userData.map((item) => item.color)}
          series={[
            {
              data: userData,
              innerRadius: 45,
              outerRadius: 80,
              paddingAngle: 2,
              cornerRadius: 4,
              highlightScope: { fade: "global", highlight: "item" },
              arcLabel: (item) =>
                item.value > 0 && totalUsers > 0
                  ? `${Math.round((item.value / totalUsers) * 100)}%`
                  : "",
            },
          ]}
          slotProps={{
            legend: { hidden: true },
          }}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          height={180}
          width={180}
        />
      </div>

      {/* Legend - More compact for mobile */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-2 text-xs sm:text-sm">
        {userData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-1 sm:gap-2">
              <div
                className="flex items-center justify-center h-5 w-5 rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={10} color="white" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span>{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
