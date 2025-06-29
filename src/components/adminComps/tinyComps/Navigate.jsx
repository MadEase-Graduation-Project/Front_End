import { useState } from "react";

export default function Navigate({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="">
      <div className="flex items-start gap-6 p-1 border-b-2 border-gray-200 my-4">
        {tabs.map((tab, index) => (
          <div key={index} className="">
            <span
              className={`cursor-pointer p-1  ${
                activeTab === index
                  ? "text-black font-semibold border-b-[3px] border-blue-500"
                  : "text-gray-500"
              } hover:text-gray-800 transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white rounded-md shadow-md">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
