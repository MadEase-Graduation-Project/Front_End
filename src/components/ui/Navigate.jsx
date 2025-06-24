import { useState } from "react";
import "./index.css";

export default function Navigate({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="">
      <div className="flex items-center justify-start  p-1 border-b-2 border-gray-200 my-4">
        {tabs.map((tab, index) => (
          <div key={index} className=" relative text-nowrap w-28  p-3 ">
            <span
              className={`item ${
                activeTab === index ? "active" : "disActive "
              }`}
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
