import Card from "@/components/AdminComps/Card";
import { fetchAllDoctors } from "@/store/Slices/Doctors";
import { fetchAllPatients } from "@/store/Slices/Patients";
import { fetchAppointments } from "@/store/Slices/Appointments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNurses } from "@/store/Slices/Nurses";
import ProgressBar from "@/components/ProgressBar";

export default function TotalCards() {
  const dispatch = useDispatch();
  const {
    items: patients,
    loading: patientsLoading,
    error: patientsError,
  } = useSelector((state) => state.patients);
  const {
    items: doctors,
    loading: doctorsLoading,
    error: doctorsError,
  } = useSelector((state) => state.doctors);
  const {
    items: appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useSelector((state) => state.appointments);
  const {
    items: nurses,
    loading: nursesLoading,
    error: nursesError,
  } = useSelector((state) => state.nurses);

  useEffect(() => {
    dispatch(fetchAllPatients(localStorage.getItem("token")));
    dispatch(fetchAllDoctors(localStorage.getItem("token")));
    dispatch(fetchAppointments(localStorage.getItem("token")));
    dispatch(fetchAllNurses(localStorage.getItem("token")));
  }, [dispatch]);

  const loading = () => {
    return <ProgressBar />;
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 auto-rows-fr">
        <Card
          title="Total Patients"
          value={patientsLoading ? loading() : patients && patients.length}
          pillText="+20"
          trend="up"
          period="to 1/5"
        />
        <Card
          title="Total Doctors"
          value={doctorsLoading ? loading() : doctors && doctors.length}
          pillText="+5"
          trend="up"
          period="to 1/5"
        />
        <Card
          title="Total Nurses"
          value={nursesLoading ? loading() : nurses && nurses.length}
          pillText="-10%"
          trend="down"
          period="vs last month"
        />
        <Card
          title="Total Appointments"
          value={
            appointmentsLoading
              ? loading()
              : appointments && appointments.length
          }
          pillText="-10%"
          trend="down"
          period="vs last month"
        />
      </div>
    </div>
  );
}
