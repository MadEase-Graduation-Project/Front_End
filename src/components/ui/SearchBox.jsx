import { useState, useRef, useEffect } from "react";
import { GoSearch, GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGlobalSearchResults } from "@/store/selectors";

export default function SearchBox() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Use the memoized selector for search results
  const filteredResults = useSelector((state) =>
    selectGlobalSearchResults(state, searchTerm)
  );

  // Handle keyboard shortcut (Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Close results on Escape key
      if (e.key === "Escape" && showResults) {
        setShowResults(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResults]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.trim().length > 0);
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);

      // Close the results dropdown
      setShowResults(false);

      // If there's a result with a path, navigate to it
      if (filteredResults.length > 0 && filteredResults[0].path) {
        navigate(filteredResults[0].path);
      }
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
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
          value={searchTerm}
          type="text"
          placeholder="Search... (Ctrl+K)"
          className="focus:outline-none w-full sm:w-60 md:w-72 lg:w-80 text-sm py-2"
          onChange={handleSearchChange}
          onFocus={() => {
            setIsFocused(true);
            if (searchTerm.trim()) setShowResults(true);
          }}
          onBlur={() => setIsFocused(false)}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex items-center justify-center w-6 h-6 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <GoX size={16} />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && filteredResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto"
        >
          <ul className="py-1">
            {filteredResults.map((result, index) => {
              // Determine which fields to display
              const primaryText =
                result.name ||
                result.Name ||
                result.title ||
                result.Title ||
                "Untitled";
              const secondaryText =
                result.description ||
                result.Description ||
                result.email ||
                result.Email ||
                result.doctorName ||
                result.patientName ||
                "";

              // Determine result type for styling
              const getTypeColor = () => {
                const type = (result.type || "").toLowerCase();
                if (type === "patient") return "bg-green-500";
                if (type === "doctor") return "bg-blue-500";
                if (type === "appointment") return "bg-yellow-500";
                if (type === "disease") return "bg-red-500";
                if (type === "advice") return "bg-purple-500";
                return "bg-gray-500";
              };

              return (
                <li
                  key={result.id || result._id || index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    console.log("Selected result:", result);
                    if (result.path) {
                      navigate(result.path);
                    }
                    setShowResults(false);
                    setSearchTerm("");
                  }}
                >
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${getTypeColor()}`}
                    ></span>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">
                        {primaryText}
                      </p>
                      {secondaryText && (
                        <p className="text-xs text-gray-500 truncate">
                          {secondaryText}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* View all results button */}
          <div className="p-2 border-t border-gray-200">
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-700 w-full text-center"
              onClick={handleSubmit}
            >
              View all results for &ldquo;{searchTerm}&rdquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
