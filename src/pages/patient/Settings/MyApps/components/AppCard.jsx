import { useState, useRef, useEffect } from "react";
import { Phone, MapPin, CalendarClock, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppCard({ appt }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  const format = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const Avatar = () => (
    <img
      src={appt.doctorImg}
      alt={appt.doctorName}
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-meblue3"
    />
  );

  useEffect(() => {
    const out = (e) => {
      if (open && modalRef.current && !modalRef.current.contains(e.target))
        setOpen(false);
    };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", out);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", out);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <>
      {/* compact card */}
      <div
        onClick={() => setOpen(true)}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-md hover:shadow-lg transition px-4 py-5 sm:p-6 cursor-pointer flex flex-wrap items-center gap-4"
      >
        <Avatar />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 truncate">
            Dr. {appt.doctorName}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {appt.doctorSpecialty}
          </p>
          <p className="text-sm text-gray-500 truncate">{appt.doctorCity}</p>
          <p className="text-sm text-gray-500 truncate">
            {format(appt.appointmentDate)}
          </p>
        </div>
        <PriorityBadge level={appt.priority} />
      </div>

      {/* modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={22} />
              </button>

              {/* modal header */}
              <div className="flex items-center gap-4">
                <Avatar />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Appointment
                  </h2>
                  <p className="text-sm text-gray-600">
                    Dr. {appt.doctorName} – {appt.doctorSpecialty}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> {appt.doctorCity}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone size={14} /> {appt.doctorPhone}
                  </p>
                  {appt.doctorEmail && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail size={14} /> {appt.doctorEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* details */}
              <div className="space-y-4 text-sm text-gray-700 mt-2">
                <InfoRow label="Priority">
                  <PriorityBadge level={appt.priority} />
                </InfoRow>
                <InfoRow label="Date & Time">
                  {format(appt.appointmentDate)}
                </InfoRow>
                <InfoRow label="Created">{format(appt.createdAt)}</InfoRow>
                {appt.updatedAt && (
                  <InfoRow label="Last Updated">
                    {format(appt.updatedAt)}
                  </InfoRow>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- sub components ---------- */
const InfoRow = ({ label, children }) => (
  <div className="flex justify-between items-center">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">{children}</span>
  </div>
);

const PriorityBadge = ({ level }) => {
  const palette = {
    low: "bg-green-200 text-green-800",
    moderate: "bg-yellow-200 text-yellow-800",
    important: "bg-orange-200 text-orange-800",
    critical: "bg-red-200 text-red-800",
  };
  const label = level?.charAt(0).toUpperCase() + level?.slice(1);
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
        palette[level] || palette.normal
      }`}
    >
      {label || "Normal"}
    </span>
  );
};
