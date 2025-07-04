import { useState, useMemo } from "react";
import AppCard from "./components/AppCard";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function MyApps() {
  const appointments = [
    {
      doctorName: "Nanosa",
      doctorImg: "https://randomuser.me/api/portraits/women/44.jpg",
      doctorSpecialty: "Neurologist",
      doctorCity: "Cairo",
      doctorPhone: "+20 100 123 4567",
      doctorEmail: "nanosa@example.com",
      priority: "important",
      appointmentDate: "2025-07-12T00:00:00.000Z",
      createdAt: "2025-07-01T12:07:30.014Z",
      updatedAt: "",
    },
    {
      doctorName: "Ahmed Mostafa",
      doctorImg: "https://randomuser.me/api/portraits/men/44.jpg",
      doctorSpecialty: "Cardiologist",
      doctorCity: "Alexandria",
      doctorPhone: "+20 100 765 4321",
      doctorEmail: "nanosa@example.com",
      priority: "critical",
      appointmentDate: "2025-07-20T14:30:00.000Z",
      createdAt: "2025-07-01T10:00:00.000Z",
      updatedAt: "2025-07-02T10:15:00.000Z",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortNewest, setSortNewest] = useState(true);
  const [selectOpen, setSelectOpen] = useState(false);

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((a) => {
        const s = searchTerm.toLowerCase();
        const matches =
          a.doctorName.toLowerCase().includes(s) ||
          a.doctorSpecialty.toLowerCase().includes(s);

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
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by doctor name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-2xl px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base border rounded-lg shadow-sm outline-none"
        />

        {/* Priority + Sort */}
        <div className="flex flex-wrap sm:flex-nowrap gap-1 items-center">
          {/* --- SELECT --- */}
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

            {/* Animated Dropdown Icon */}
            <motion.div
              animate={{ rotate: selectOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
            >
              <ChevronDown size={18} className="text-gray-500" />
            </motion.div>
          </div>

          {/* --- BUTTON (MATCHING) --- */}
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
        {filteredAppointments.length ? (
          filteredAppointments.map((app, i) => <AppCard key={i} appt={app} />)
        ) : (
          <p className="text-center text-gray-400 text-sm mt-10">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
}
