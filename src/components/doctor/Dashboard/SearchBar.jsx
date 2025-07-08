import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Your dashboard items
const dashboardItems = [
  { label: 'Patients', keywords: ['patient', 'record', 'history'], path: '/doctor/patients' },
  { label: 'Appointments', keywords: ['appointment', 'schedule'], path: '/doctor/patients' },
  { label: 'Settings', keywords: ['profile', 'password', 'preferences'], path: '/doctor/settings' },
  { label: 'Advices', keywords: ['advice', 'blog', 'post'], path: '/doctor/advice' },
  { label: 'Diagnosis', keywords: ['diagnosis', 'disease', 'treatment'], path: '/doctor/diagnosis' },
  { label: 'Chat', keywords: ['chat', 'message', 'conversation'], path: '/doctor/chat' },
  { label: 'Home', keywords: ['home', 'dashboard'], path: '/doctor' },
  { label: 'Logout', keywords: ['logout', 'sign out'], path: '/register/login' },
  { label: 'Analytics', keywords: ['analytics', 'report', 'overview', 'chart'], path: '/doctor' },
];

// Highlight matched parts of the label or keywords
const highlightMatch = (text, query) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-blue-200 text-black rounded-sm">{part}</mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const filteredItems = query
    ? dashboardItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleNavigate = (path) => {
    setQuery('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
    navigate(path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 || prev === -1 ? filteredItems.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleNavigate(filteredItems[selectedIndex].path);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  return (
    <div className="relative w-full md:w-64 md:mx-8 text-sm">
      <div className="bg-white rounded-lg flex items-center px-2 border border-gray-200 h-9">
        <FiSearch className="mr-2 text-gray-500" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          className="bg-transparent w-full placeholder:text-gray-500 focus:outline-none"
        />
      </div>

      <AnimatePresence>
        {showSuggestions && query && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-auto"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={item.path + index}
                  onMouseDown={() => handleNavigate(item.path)}
                  className={`px-4 py-2 cursor-pointer ${
                    selectedIndex === index
                      ? 'bg-gray-100 font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm">{highlightMatch(item.label, query)}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {item.keywords
                      .filter((k) => k.toLowerCase().includes(query.toLowerCase()))
                      .map((k, i) => (
                        <span
                          key={i}
                          className="inline-block mr-1 bg-gray-100 px-2 py-0.5 rounded-full"
                        >
                          {highlightMatch(k, query)}
                        </span>
                      ))}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No matches found</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
