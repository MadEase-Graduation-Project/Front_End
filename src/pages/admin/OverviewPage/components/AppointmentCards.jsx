import Card from "@/components/shared/Card";
import { RiCalendarScheduleFill } from "react-icons/ri";
import {
  selectAppointmentsLoading,
  selectAppointmentsError,
  selectAppointmentsCount,
  selectTotalDoctors,
  selectUsersLoading,
} from "@/store/selectors";
import { useSelector } from "react-redux";
import { FaUserDoctor } from "react-icons/fa6";

export default function AppointmentCards() {
  const loading = () => {
    return (
      <div className="flex items-center justify-center h-9">
        <div className="animate-pulse bg-gray-300 rounded h-2 w-20"></div>
      </div>
    );
  };

  const totalDoctors = useSelector(selectTotalDoctors);
  const loadingData = useSelector(selectUsersLoading);

  const totalAppointments = useSelector(selectAppointmentsCount);
  const loadingAppointments = useSelector(selectAppointmentsLoading);
  const errorAppointments = useSelector(selectAppointmentsError);

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 auto-rows-fr">
        <Card
          to={"/admin/appointments"}
          title="Total Appointments"
          value={loadingAppointments ? loading() : totalAppointments || 0}
          period="Schedules"
        >
          <RiCalendarScheduleFill className="text-xl text-yellow-500" />
        </Card>
        <Card
          to={"/admin/doctors"}
          title="Available Doctors"
          value={4}
          period="Users"
        >
          <FaUserDoctor className="text-xl text-green-500" />
        </Card>
      </div>
    </div>
  );
}
