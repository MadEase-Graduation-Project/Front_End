import ChartBar from "@/pages/admin/OverviewPage/components/ChartBar";
import TotalCards from "@/pages/admin/OverviewPage/components/TotalCards";
import TotalUsersChart from "@/pages/admin/OverviewPage/components/TotalUsersChart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllDiseases } from "@/store/slices/diseaseSlice";
import { fetchAllAdvices } from "@/store/slices/adviceSlice";
import NextAppointments from "@/pages/admin/OverviewPage/components/NextAppointment";
import LastDiseases from "@/pages/admin/OverviewPage/components/LastDiseases";
import LastAdvices from "@/pages/admin/OverviewPage/components/LastAdvices";
import SearchBox from "@/components/ui/SearchBox";
import { fetchAllUsers } from "@/store/slices/userSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";

export default function OverviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAppointments());
    dispatch(fetchAllDiseases());
    dispatch(fetchAllAdvices());
  }, [dispatch]);

  return (
    <div className=" flex flex-col gap-3 p-4">
      <div className="flex justify-between items-center gap-4 mb-1">
        <h1 className="text-2xl font-bold">Overview</h1>
        <SearchBox />
      </div>

      <div className="users">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            <TotalCards />
          </div>

          <div className="md:col-span-1 lg:col-span-1 h-auto md:h-full shadow-sm">
            <TotalUsersChart />
          </div>
        </div>
      </div>
      <div className="appointments grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 ">
          <ChartBar />
        </div>
        <div className="md:col-span-1">
          <NextAppointments />
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
