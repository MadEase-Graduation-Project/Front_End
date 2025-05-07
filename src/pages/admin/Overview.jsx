import ChartBar from "@/components/AdminComps/ChartBar";
import TotalCards from "@/components/AdminComps/TotalCards";
import TotalUsersChart from "@/components/AdminComps/TotalUsersChart";
import { fetchAppointments } from "@/store/Slices/Appointments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "@/store/Slices/Doctors";
import { fetchAllPatients } from "@/store/Slices/Patients";
import { fetchAllNurses } from "@/store/Slices/Nurses";
import { fetchAllAdmins } from "@/store/Slices/Admins";
import { fetchAllDiseases } from "@/store/Slices/Diseases";
import { fetchAllAdvices } from "@/store/Slices/Advices";
import NextAppointments from "@/components/AdminComps/NextAppointment";
import LastDiseases from "@/components/AdminComps/LastDiseases";
import LastAdvices from "@/components/AdminComps/LastAdvices";
import SearchBox from "@/components/AdminComps/tinyComps/SearchBox";

export default function Overview() {
  const dispatch = useDispatch();

  const PatientsData = useSelector((state) => state.patients);
  const DoctorsData = useSelector((state) => state.doctors);
  const AppointmentsData = useSelector((state) => state.appointments);
  const NursesData = useSelector((state) => state.nurses);
  const AdminsData = useSelector((state) => state.admins);
  const DiseasesData = useSelector((state) => state.diseases);
  const AdvicesData = useSelector((state) => state.advices);

  // todo: add all data in one object to use it at search box.
  const allData = [
    PatientsData.items.map((item) => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      type: "Patient",
    })),
    DoctorsData.items.map((item) => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      type: "Doctor",
    })),
    NursesData.items.map((item) => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      type: "Nurse",
    })),
    AdminsData.items.map((item) => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      type: "Admin",
    })),
    // DiseasesData.items.map((item) => ({ Name: item.name , Description: item.description, type: "Disease" })),
    // AdvicesData.items.map((item) => ({ Name: item.name , Description: item.description, type: "Advice" })),
  ];

  useEffect(() => {
    dispatch(fetchAllPatients());
    dispatch(fetchAllDoctors());
    dispatch(fetchAppointments());
    dispatch(fetchAllNurses());
    dispatch(fetchAllAdmins());
    dispatch(fetchAllDiseases());
    dispatch(fetchAllAdvices());
  }, [dispatch]);

  return (
    <div className=" flex flex-col gap-3 p-4">
      <div className="flex justify-between items-center gap-4 mb-1">
        <h1 className="text-2xl font-bold">Overview</h1>
        <SearchBox allData={allData} />
      </div>

      <div className="users">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            <TotalCards
              PatientsData={PatientsData}
              DoctorsData={DoctorsData}
              AppointmentsData={AppointmentsData}
              NursesData={NursesData}
              DiseasesData={DiseasesData}
              AdvicesData={AdvicesData}
            />
          </div>

          <div className="md:col-span-1 lg:col-span-1 h-auto md:h-full shadow-sm">
            <TotalUsersChart
              PatientsData={PatientsData}
              DoctorsData={DoctorsData}
              NursesData={NursesData}
              AdminsData={AdminsData}
            />
          </div>
        </div>
      </div>
      <div className="appointments grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 ">
          <ChartBar appointments={AppointmentsData.items} />
        </div>
        <div className="md:col-span-1">
          <NextAppointments appointments={AppointmentsData.items} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="">
          <LastDiseases />
        </div>
        <div className="">
          <LastAdvices />
        </div>
      </div>
    </div>
  );
}
