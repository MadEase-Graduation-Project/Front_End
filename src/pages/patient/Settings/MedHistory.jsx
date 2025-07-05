import { useState } from "react";
import {
  X,
  Pencil,
  Check,
  Plus,
  Ban,
  TimerReset,
  Scissors,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MedHistory() {
  const [editing, setEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const initialState = {
    allergies: ["Dust", "Pollen"],
    chronicConditions: ["Asthma"],
    surgeries: [],
  };

  const allOptions = {
    allergies: ["Dust", "Pollen", "Peanuts", "Seafood", "Eggs"],
    chronicConditions: ["Asthma", "Diabetes", "Hypertension", "Thyroid"],
    surgeries: ["Appendectomy", "Gallbladder", "Cataract", "Knee Replacement"],
  };

  const [selected, setSelected] = useState(initialState);

  const toggleItem = (category, item) => {
    setSelected((prev) => {
      const already = prev[category].includes(item);
      return {
        ...prev,
        [category]: already
          ? prev[category].filter((i) => i !== item)
          : [...prev[category], item],
      };
    });
  };

  const iconMap = {
    allergies: (
      <span className="p-1.5 rounded-full bg-red-100">
        <Ban size={16} className="text-red-600" />
      </span>
    ),
    chronicConditions: (
      <span className="p-1.5 rounded-full bg-yellow-100">
        <TimerReset size={16} className="text-yellow-600" />
      </span>
    ),
    surgeries: (
      <span className="p-1.5 rounded-full bg-blue-100">
        <Scissors size={16} className="text-blue-600" />
      </span>
    ),
  };

  const handleToggleEdit = () => {
    if (editing) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
    setEditing((e) => !e);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-6 sm:px-8 sm:py-8 flex flex-col gap-6 transition-all relative overflow-hidden">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-3 inset-x-0 mx-auto w-fit bg-green-100 text-green-700 px-4 py-2 rounded-full shadow-md text-sm font-medium z-50"
            >
              Updated successfully
            </motion.div>
          )}
        </AnimatePresence>

        {Object.keys(allOptions).map((category, idx) => {
          const label = category.replace(/([A-Z])/g, " $1");
          const current = selected[category];
          const remaining = allOptions[category].filter(
            (o) => !current.includes(o)
          );

          return (
            <div
              key={category}
              className={`flex flex-col gap-3 ${
                idx < Object.keys(allOptions).length - 1
                  ? "border-b border-gray-200 pb-5"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 flex items-center justify-center bg-meblue3/10 rounded-full">
                  {iconMap[category]}
                </div>
                <h2 className="text-lg font-semibold capitalize text-menavy tracking-tight">
                  {label}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {current.length > 0 ? (
                  current.map((item) => (
                    <motion.span
                      key={item}
                      layout
                      className="flex items-center gap-1 px-3 py-1 bg-meblue3 text-white text-sm rounded-full shadow-sm hover:shadow-md transition"
                    >
                      {item}
                      {editing && (
                        <button
                          onClick={() => toggleItem(category, item)}
                          className="text-white hover:text-gray-200 transition"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    No entries yet
                  </span>
                )}
              </div>

              {editing && remaining.length > 0 && (
                <motion.div
                  layout
                  className="flex flex-wrap gap-2 mt-1 pt-3 border-t border-dashed border-gray-300"
                >
                  {remaining.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleItem(category, item)}
                      className="px-3 py-1 border text-sm rounded-full text-gray-700 bg-white hover:bg-gray-50 transition flex items-center gap-1 shadow-sm"
                    >
                      <Plus size={14} />
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          );
        })}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleToggleEdit}
            className="flex items-center gap-1 text-sm text-meblue3 hover:underline transition"
          >
            {editing ? <Check size={16} /> : <Pencil size={16} />}
            {editing ? "Done" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
