// DiagnosisCard.jsx — design tweaked: avatar as subtle doctor stamp, clearer diagnosis focus
import { useState, useRef, useEffect } from "react";
import {
  ClipboardList,
  Stethoscope,
  Pill,
  HeartPulse,
  CalendarCheck,
  StickyNote,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DiagnosisCard({ diagnosis }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  /* ----------------- interaction helpers ----------------- */
  useEffect(() => {
    const outside = (e) => {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [open]);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  /* avatar helper */
  const Avatar = ({ size = 10 }) => (
    <img
      src={diagnosis.doctorImg}
      alt={diagnosis.doctorName}
      className={`w-${size} h-${size} rounded-full object-cover border-2 border-meblue3`}
    />
  );

  return (
    <>
      {/* ─── Compact Card ─── */}
      <div
        onClick={() => setOpen(true)}
        className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md hover:shadow-lg transition px-4 py-6 sm:p-8 cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <ClipboardList
            size={28}
            className="text-meblue3 flex-shrink-0 mt-1"
          />

          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
              {diagnosis.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {diagnosis.description}
            </p>
          </div>

          {/* subtle doctor stamp */}
          <div
            className="flex-shrink-0 ml-2 sm:ml-4"
            title={`Dr. ${diagnosis.doctorName}`}
          >
            <Avatar size={9} />
          </div>
        </div>
      </div>

      {/* ─── Modal ─── */}
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
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4">
                <Avatar size={14} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {diagnosis.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Issued by Dr. {diagnosis.doctorName}
                  </p>
                  <p className="text-gray-500 mt-2 leading-relaxed">
                    {diagnosis.description}
                  </p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  icon={Stethoscope}
                  label="Symptoms"
                  value={
                    <ul className="list-disc list-inside space-y-1">
                      {diagnosis.symptoms.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  }
                />
                <Field
                  icon={Pill}
                  label="Medications"
                  value={
                    <ul className="list-disc list-inside space-y-1">
                      {diagnosis.medications.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  }
                />
                <Field
                  icon={HeartPulse}
                  label="Recommendations"
                  value={diagnosis.recommendations}
                />
                <Field
                  icon={CalendarCheck}
                  label="Follow‑up"
                  value={diagnosis.followUp}
                />
                <Field
                  icon={StickyNote}
                  label="Notes"
                  value={diagnosis.notes}
                  className="sm:col-span-2"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ icon: Icon, label, value, className = "" }) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <Icon size={20} className="text-meblue3 flex-shrink-0 mt-1" />
      <div>
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <div className="mt-1 text-gray-800 text-sm leading-relaxed">
          {value}
        </div>
      </div>
    </div>
  );
}
