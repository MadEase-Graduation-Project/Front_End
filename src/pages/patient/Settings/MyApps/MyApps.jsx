import { useState, useMemo, useEffect } from "react";
import AppCard from "./components/AppCard";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import {
  selectAllAppointments,
  selectAppointmentsLoading,
} from "@/store/selectors/appointmentSelectors";
import { selectPublicDoctors, selectDoctorsLoading } from "@/store/selectors";
import { fetchPublicDoctors } from "@/store/slices/doctorSlice"; // Assumes you have this action
import { isEmpty } from "@/utils/objectUtils";

export default function MyApps() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortNewest, setSortNewest] = useState(true);
  const [selectOpen, setSelectOpen] = useState(false);

  const dispatch = useDispatch();

  const appointments = useSelector(selectAllAppointments);
  const loading = useSelector(selectAppointmentsLoading);

  const allDoctors = useSelector(selectPublicDoctors);
  const doctorsLoading = useSelector(selectDoctorsLoading);

  // Fetch appointments
  useEffect(() => {
    if (isEmpty(appointments)) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, appointments]);

  // Fetch doctors
  useEffect(() => {
    if (isEmpty(allDoctors)) {
      dispatch(fetchPublicDoctors()); // must fetch all to map correctly
    }
  }, [dispatch, allDoctors]);

  // Filter & Sort Appointments
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((a) => {
        const s = searchTerm.toLowerCase();
        const matches =
          a.doctorName.toLowerCase().includes(s) ||
          a.doctorSpecialty?.toLowerCase().includes(s);

        return (
          matches && (priorityFilter === "all" || a.priority === priorityFilter)
        );
      })
      .sort((a, b) =>
        sortNewest
          ? new Date(b.appointmentDate) - new Date(a.appointmentDate)
          : new Date(a.appointmentDate) - new Date(b.appointmentDate)
      );
  }, [appointments, searchTerm, priorityFilter, sortNewest]);

  return (
    <div className="w-full max-w-4xl px-4 py-8 mx-auto flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between gap-3">
        <input
          type="text"
          placeholder="Search by doctor name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-2xl px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base border rounded-lg shadow-sm outline-none"
        />

        <div className="flex flex-wrap sm:flex-nowrap gap-1 items-center">
          <div className="relative w-fit">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              onClick={() => setSelectOpen(!selectOpen)}
              className="appearance-none pl-3 pr-10 py-2 text-sm sm:text-base border rounded-lg shadow-sm leading-tight focus:ring-2 focus:ring-meblue3 transition-all"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="important">Important</option>
              <option value="critical">Critical</option>
            </select>

            <motion.div
              animate={{ rotate: selectOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
            >
              <ChevronDown size={18} className="text-gray-500" />
            </motion.div>
          </div>

          <button
            onClick={() => setSortNewest(!sortNewest)}
            className="px-2 sm:px-4 py-2 text-sm sm:text-base border rounded-lg shadow-sm hover:bg-gray-100 transition whitespace-nowrap leading-tight"
          >
            Sort: {sortNewest ? "Newest First" : "Oldest First"}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-5">
        {(loading || doctorsLoading) && (
          <p className="text-center text-gray-400 text-sm mt-10">
            Loading appointments...
          </p>
        )}

        {!loading && !doctorsLoading && filteredAppointments.length > 0
          ? filteredAppointments.map((app) => {
              const matchingDoctor = allDoctors.find(
                (doc) => doc.name.toLowerCase() === app.doctorName.toLowerCase()
              );
              // hna bn compare 3shan ngeb nafs l doc to its corressponding appointment
              return (
                <AppCard
                  key={app._id}
                  appt={app}
                  doc={matchingDoctor || { ImgUrl: "" }}
                />
              );
            })
          : !loading &&
            !doctorsLoading && (
              <p className="text-center text-gray-400 text-sm mt-10">
                No appointments found.
              </p>
            )}
      </div>
    </div>
  );
}
