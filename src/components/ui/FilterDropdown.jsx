import { useState } from "react";

export default function FilterDropdown({ options = [], label = "Filter by", onChange }) {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={selected}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All</option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
}
