import Card from "@/components/shared/Card";
import { FaUsers, FaUserNurse, FaVirus, FaLightbulb } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import {
  selectTotalNurses,
  selectTotalPatients,
  selectTotalDoctors,
  selectUsersLoading,
  selectUsersError,
  selectAppointmentsLoading,
  selectAppointmentsError,
  selectAdviceCount,
  selectAdvicesLoading,
  selectAdvicesError,
  selectAppointmentsCount,
  selectTotalDiseases,
  selectDiseasesLoading,
  selectDiseasesError,
} from "@/store/selectors";
import { useSelector } from "react-redux";

export default function TotalCards() {
  const loading = () => {
    return (
      <div className="flex items-center justify-center h-9">
        <div className="animate-pulse bg-gray-300 rounded h-2 w-20"></div>
      </div>
    );
  };

  const totalPatients = useSelector(selectTotalPatients);
  const totalDoctors = useSelector(selectTotalDoctors);
  const totalNurses = useSelector(selectTotalNurses);
  const loadingData = useSelector(selectUsersLoading);
  const errorData = useSelector(selectUsersError);

  const totalAppointments = useSelector(selectAppointmentsCount);
  const loadingAppointments = useSelector(selectAppointmentsLoading);
  const errorAppointments = useSelector(selectAppointmentsError);

  const totalDiseases = useSelector(selectTotalDiseases);
  const loadingDiseases = useSelector(selectDiseasesLoading);
  const errorDiseases = useSelector(selectDiseasesError);

  const totalAdvices = useSelector(selectAdviceCount);
  const loadingAdvices = useSelector(selectAdvicesLoading);
  const errorAdvices = useSelector(selectAdvicesError);

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 auto-rows-fr">
        <Card
          to={"/admin/patients"}
          title="Total Patients"
          value={loadingData ? loading() : totalPatients || 0}
          period="Users"
        >
          <FaUsers className="text-xl text-green-500" />
        </Card>
        <Card
          to={"/admin/doctors"}
          title="Total Doctors"
          value={loadingData ? loading() : totalDoctors || 0}
          period="Users"
        >
          <FaUserDoctor className="text-xl text-blue-500" />
        </Card>
        <Card
          to={"/admin/nurses"}
          title="Total Nurses"
          value={loadingData ? loading() : totalNurses || 0}
          period="Users"
        >
          <FaUserNurse className="text-xl text-red-500" />
        </Card>
        <Card
          to={"/admin/appointments"}
          title="Total Appointments"
          value={loadingAppointments ? loading() : totalAppointments || 0}
          period="Schedules"
        >
          <RiCalendarScheduleFill className="text-xl text-yellow-500" />
        </Card>
        <Card
          to={"/admin/diseases"}
          title="Total Diseases"
          value={loadingDiseases ? loading() : totalDiseases || 0}
          period="Medical Data"
        >
          <FaVirus className="text-xl text-orange-500" />
        </Card>
        <Card
          to={"/admin/advices"}
          title="Total Advices"
          value={loadingAdvices ? loading() : totalAdvices || 0}
          period="Medical Data"
        >
          <FaLightbulb className="text-xl text-purple-500" />
        </Card>
      </div>
    </div>
  );
}
