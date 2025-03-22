import AppointmentChart from "@/components/AdminComps/AppointmentChart";
import ChartBar from "@/components/AdminComps/ChartBar";
import TotalCards from "@/components/AdminComps/TotalCards";
import TotalUsersChart from "@/components/AdminComps/TotalUsersChart";
import { fetchAppointments } from "@/store/Slices/Appointments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "@/store/Slices/Doctors";
import { fetchAllPatients } from "@/store/Slices/Patients";
import { fetchAllNurses } from "@/store/Slices/Nurses";

export default function Overview() {
  const dispatch = useDispatch();

  const PatientsData = useSelector((state) => state.patients);
  const DoctorsData = useSelector((state) => state.doctors);
  const AppointmentsData = useSelector((state) => state.appointments);
  const NursesData = useSelector((state) => state.nurses);

  useEffect(() => {
    dispatch(fetchAllPatients(localStorage.getItem("token")));
    dispatch(fetchAllDoctors(localStorage.getItem("token")));
    dispatch(fetchAppointments(localStorage.getItem("token")));
    dispatch(fetchAllNurses(localStorage.getItem("token")));
  }, [dispatch]);

  return (
    <div className=" flex flex-col gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-fr">
        <div className="lg:col-span-2">
          <TotalCards
            PatientsData={PatientsData}
            DoctorsData={DoctorsData}
            AppointmentsData={AppointmentsData}
            NursesData={NursesData}
          />
        </div>
        <div className="lg:col-span-1">
          <TotalUsersChart />
        </div>
      </div>
      <div className="">
        <AppointmentChart />
      </div>

      <ChartBar appointments={AppointmentsData.items} />
    </div>
  );
}
