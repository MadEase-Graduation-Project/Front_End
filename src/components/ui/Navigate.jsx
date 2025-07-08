import { useState } from "react";
import "./index.css"; // keep your .active / .disActive rules

export default function Navigate({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab strip */}
      <div className="flex items-center justify-start gap-6 overflow-x-auto border-b-2 border-gray-200 my-4 px-1 ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`whitespace-nowrap px-2 py-3 cursor-pointer transition-colors 
              ${activeTab === index ? "active" : "disActive"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div className="p-4 bg-transparent  ">{tabs[activeTab].content}</div>
    </div>
  );
}
