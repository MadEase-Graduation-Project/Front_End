import ChartBar from "@/pages/admin/OverviewPage/components/ChartBar";
import TotalCards from "@/pages/admin/OverviewPage/components/TotalCards";
import TotalUsersChart from "@/pages/admin/OverviewPage/components/TotalUsersChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDiseases } from "@/store/slices/diseaseSlice";
import { fetchAllAdvices } from "@/store/slices/adviceSlice";
import NextAppointments from "@/pages/admin/OverviewPage/components/NextAppointment";
import LastDiseases from "@/pages/admin/OverviewPage/components/LastDiseases";
import LastAdvices from "@/pages/admin/OverviewPage/components/LastAdvices";
import { fetchAllUsers } from "@/store/slices/userSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { BarChart3, Calendar, Users, Activity, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AppointmentCards from "./components/AppointmentCards";
import LastCards from "./components/LastCards";
import { fetchAllAds } from "@/store/slices/adsSlice";
import { fetchHospitals } from "@/store/slices/hospitalSlice";

export default function OverviewPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAppointments());
    dispatch(fetchAllDiseases());
    dispatch(fetchAllAdvices());
    dispatch(fetchHospitals());
    dispatch(fetchAllAds());
  }, [dispatch]);

  return (
    <div className=" bg-gray-50/30 overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Enhanced Header Section */}
        <div className="space-y-4">
          {/* Title and Stats Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Overview Management
              </h1>
              <p className="text-sm text-gray-600">
                Comprehensive dashboard for monitoring users and services
                performance
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm">
                <BarChart3 className="h-4 w-4 text-green-600" />
                <div className="text-sm">
                  <span className="font-bold text-green-900">11</span>
                  <span className="text-green-700 ml-1">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 shadow-sm">
                <Calendar className="h-4 w-4 text-orange-600" />
                <div className="text-sm">
                  <span className="font-bold text-orange-900">0</span>
                  <span className="text-orange-700 ml-1">In Hospital</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />
        </div>

        {/* Main Content Sections */}
        <div className="space-y-8">
          {/* Users Overview Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Users Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
              <div className="md:col-span-1 ">
                <TotalCards />
              </div>
              <div className="md:col-span-1 ">
                <TotalUsersChart />
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Appointments Analytics Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Appointments Analytics
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <AppointmentCards />
              </div>
              <div className="">
                <NextAppointments />
              </div>
              <div>
                <ChartBar />
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Recent Activity Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="">
              <LastCards />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  Latest Diseases
                </h3>

                <div className="">
                  <LastDiseases />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
                  Latest Advices
                </h3>
                <div className="">
                  <LastAdvices />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
