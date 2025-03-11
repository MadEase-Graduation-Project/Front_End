import { ChartBar } from "@/components/AdminComps/ChartBar";
import TotalCards from "@/components/AdminComps/TotalCards";
import { TotalUsersChart } from "@/components/AdminComps/TotalUsersChart";
import { fetchAppointments } from "@/store/Slices/Appointments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Overview() {
  const dispatch = useDispatch();
  const {
    items: appointments,
    loading,
    error,
  } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments(localStorage.getItem("token")));
  }, [dispatch]);

  return (
    <div className=" flex flex-col gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-2 auto-rows-fr">
        <TotalCards />
        <TotalUsersChart />
      </div>
      <ChartBar appointments={appointments} />
    </div>
  );
}
