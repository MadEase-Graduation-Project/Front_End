import Card from "@/components/AdminComps/Card";
import { fetchAllDoctors } from "@/store/Slices/Doctors";
import { fetchAllPatients } from "@/store/Slices/Patients";
import { fetchAppointments } from "@/store/Slices/Appointments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmMDI1YTMyNWIzYWFhYzlkZDYzZDMiLCJuYW1lIjoia2FoIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc0MTUyOTQ4NCwiZXhwIjoxNzQxNTQzODg0fQ.QpHJO0bp04wuT3-qnFW8xC-r2f6UFgYxidRyUxK0vzQ";

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

  useEffect(() => {
    dispatch(fetchAllPatients(token));
    dispatch(fetchAllDoctors(token));
    dispatch(fetchAppointments(token));
  }, [dispatch]);

  if (patientsLoading || doctorsLoading || appointmentsLoading) {
    return <div>Loading...</div>;
  }

  if (patientsError || doctorsError || appointmentsError) {
    return <div>Error...</div>;
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 auto-rows-fr">
        <Card
          title="Total Patients"
          value={patients && patients.length}
          pillText="+20"
          trend="up"
          period="to 1/5"
        />
        <Card
          title="Total Doctors"
          value={doctors && doctors.length}
          pillText="+5"
          trend="up"
          period="to 1/5"
        />
        <Card
          title="Total Appointments"
          value={appointments && appointments.length}
          pillText="-10%"
          trend="down"
          period="vs last month"
        />
      </div>
    </div>
  );
}
