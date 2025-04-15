import Card from "@/components/AdminComps/Card";
import ProgressBar from "@/components/ProgressBar";
import { FaUsers, FaUserNurse, FaVirus, FaLightbulb } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";

export default function TotalCards({
  PatientsData,
  DoctorsData,
  AppointmentsData,
  NursesData,
  DiseasesData,
  AdvicesData,
}) {
  const loading = () => {
    return <ProgressBar />;
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 auto-rows-fr">
        <Card
          to={"/admin/patients"}
          title="Total Patients"
          value={PatientsData.loading ? loading() : PatientsData.items.length}
          period="Users"
        >
          <FaUsers className="text-xl text-green-500" />
        </Card>
        <Card
          to={"/admin/doctors"}
          title="Total Doctors"
          value={DoctorsData.loading ? loading() : DoctorsData.items.length}
          period="Users"
        >
          <FaUserDoctor className="text-xl text-blue-500" />
        </Card>
        <Card
          to={"/admin/nurses"}
          title="Total Nurses"
          value={NursesData.loading ? loading() : NursesData.items.length}
          period="Users"
        >
          <FaUserNurse className="text-xl text-red-500" />
        </Card>
        <Card
          to={"/admin/appointments"}
          title="Total Appointments"
          value={
            AppointmentsData.loading ? loading() : AppointmentsData.items.length
          }
          period="Schedules"
        >
          <RiCalendarScheduleFill className="text-xl text-yellow-500" />
        </Card>
        <Card
          to={"/admin/diseases"}
          title="Total Diseases"
          value={
            DiseasesData?.loading ? loading() : DiseasesData?.items?.length || 0
          }
          period="Medical Data"
        >
          <FaVirus className="text-xl text-orange-500" />
        </Card>
        <Card
          to={"/admin/advices"}
          title="Total Advices"
          value={
            AdvicesData?.loading ? loading() : AdvicesData?.items?.length || 0
          }
          period="Medical Data"
        >
          <FaLightbulb className="text-xl text-purple-500" />
        </Card>
      </div>
    </div>
  );
}
