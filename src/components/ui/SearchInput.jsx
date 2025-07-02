import { FaSearch } from "react-icons/fa";

export default function SearchInput({ placeholder = "Search...", onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
