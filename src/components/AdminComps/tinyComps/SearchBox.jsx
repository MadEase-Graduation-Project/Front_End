import { useState, useRef, useEffect } from "react";
import { GoSearch, GoX } from "react-icons/go";

export default function SearchBox(allData) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Handle keyboard shortcut (Ctrl+K) to focus search+
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      // Implement search functionality here
      console.log("Searching for:", search);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`searchbox flex gap-1 items-center border rounded-3xl bg-white transition-all duration-200 ${
        isFocused ? "ring-2 ring-blue-200 border-blue-300" : "border-gray-300"
      } truncate`}
    >
      <button
        type="submit"
        className="flex items-center justify-center w-8 h-8 text-gray-500"
        aria-label="Search"
      >
        <GoSearch size={18} />
      </button>

      <input
        ref={inputRef}
        value={search}
        type="text"
        placeholder="Search... (Ctrl+K)"
        className="focus:outline-none w-full sm:w-60 md:w-72 lg:w-80 text-sm"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {search && (
        <button
          type="button"
          onClick={clearSearch}
          className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <GoX size={16} />
        </button>
      )}
    </form>
  );
}
