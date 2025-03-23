import Card from "@/components/AdminComps/Card";
import ProgressBar from "@/components/ProgressBar";

export default function TotalCards({
  PatientsData,
  DoctorsData,
  AppointmentsData,
  NursesData,
}) {
  const loading = () => {
    return <ProgressBar />;
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 auto-rows-fr">
        <Card
          title="Total Patients"
          value={
            PatientsData.loading
              ? loading()
              : PatientsData.items && PatientsData.items.length
          }
          pillText="+20"
          trend="up"
          period="to 1/5"
        />
        <Card
          title="Total Doctors"
          value={
            DoctorsData.loading
              ? loading()
              : DoctorsData.items && DoctorsData.items.length
          }
          pillText="+5"
          trend="up"
          period="to 1/5"
        />
        <Card
          title="Total Nurses"
          value={
            NursesData.loading
              ? loading()
              : NursesData.items && NursesData.items.length
          }
          pillText="-10%"
          trend="down"
          period="vs last month"
        />
        <Card
          title="Total Appointments"
          value={
            AppointmentsData.loading
              ? loading()
              : AppointmentsData.items && AppointmentsData.items.length
          }
          pillText="-10%"
          trend="down"
          period="vs last month"
        />
      </div>
    </div>
  );
}
