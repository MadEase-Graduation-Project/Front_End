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

  const Avatar = ({ size = 10 }) => (
    <img
      src={diagnosis.doctor?.ImgUrl || "https://randomuser.me/api/portraits"}
      alt={diagnosis.doctor?.name || "Doctor"}
      className={`w-${size} h-${size} rounded-full object-cover border-2 border-meblue3`}
    />
  );

  return (
    <>
      {/* ─── Compact Card ─── */}
      <div
        onClick={() => setOpen(true)}
        className="relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md hover:shadow-lg px-4 py-6 sm:p-6 cursor-pointer transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <ClipboardList size={28} className="text-meblue3 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
              {diagnosis.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {diagnosis.description}
            </p>
          </div>
          <div
            className="flex-shrink-0"
            title={`Dr. ${diagnosis.doctor?.name}`}
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
            <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl relative bg-white">
              <motion.div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar"
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
                <div className="flex flex-col sm:flex-row sm:items-center mb-10 gap-4">
                  <Avatar size={14} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {diagnosis.title}
                    </h2>
                    <p className="text-sm text-gray-400">
                      Issued by Dr. {diagnosis.doctor?.name}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      {diagnosis.description}
                    </p>
                  </div>
                </div>

                {/* Fields */}
                {/* Grid Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                  />
                </div>

                {/* Medications Section */}
                <div className="">
                  <div className="flex items-center gap-2 mb-4">
                    <Pill size={20} className="text-meblue3" />
                    <h3 className="text-xl font-bold text-meblue3">
                      Medications
                    </h3>
                  </div>

                  {diagnosis.medications?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {diagnosis.medications.map((med) => (
                        <div
                          key={med._id}
                          className="col-span-1 h-full rounded-2xl bg-gradient-to-br from-sky-50 via-white to-gray-50 p-5 shadow-md border border-meblue3/10 transition-transform duration-200 hover:scale-[1.015]"
                        >
                          {/* Medication Header */}
                          <div className="mb-3 border-b border-gray-200 pb-2">
                            <h4 className="text-lg font-semibold text-meblue3">
                              {med.name}
                            </h4>
                            <p className="text-sm text-gray-500 italic">
                              {med.description}
                            </p>
                          </div>

                          {/* Medication Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700 gap-x-5">
                            <MedField label="Dosage" value={med.dosage} />
                            <MedField label="Quantity" value={med.quantity} />
                            <MedField
                              label="Instructions"
                              value={med.instructions}
                              className="sm:col-span-1"
                            />
                            <MedField label="Refills" value={med.refills} />
                            <MedField
                              label="Notes"
                              value={med.notes || "None"}
                              className="sm:col-span-2"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No medications listed.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
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
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-menavy">{label}</p>
        <div className="text-gray-600 text-sm leading-relaxed">{value}</div>
      </div>
    </div>
  );
}
function MedField({ label, value, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-semibold text-menavy">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}
