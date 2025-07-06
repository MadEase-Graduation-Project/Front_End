import { useState, useEffect, useRef } from "react";
import { Search, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "@/utils/objectUtils";
import {
  fetchAllAdvices,
  likeAdvice,
  dislikeAdvice,
} from "@/store/slices/adviceSlice";
import AdviceCard from "@/components/shared/AdviceCard";
import {
  selectAdviceCategories,
  selectPaginatedAdvices,
  selectAdvicesLoading,
  sortedAdvices,
  selectFilteredAdvices,
} from "@/store/selectors/index";
import Popup from "./components/Popup";
import { useLocation } from "react-router-dom";

export default function Community() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
const location = useLocation();
const [selectedCategory, setSelectedCategory] = useState(
  location.state?.selectedCategory || "All Categories"
);

useEffect(() => {
  if (location.state?.selectedCategory) {
    setSelectedCategory(location.state.selectedCategory);
  }
}, [location.state?.selectedCategory]);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const loaderRef = useRef(null);

  // Use selectors to get data from Redux store
  const advices = useSelector(sortedAdvices);
  const loading = useSelector(selectAdvicesLoading);
  const categories = useSelector(selectAdviceCategories);
  const paginatedAdvices = useSelector((state) =>
    selectPaginatedAdvices(state, searchQuery, selectedCategory, page)
  );
 

  // Calculate if there is more data to load
  const hasMore =
    paginatedAdvices.length <
    useSelector((state) =>
      selectFilteredAdvices(state, searchQuery, selectedCategory)
    ).length;

  // Fetch data only once when component mounts
  useEffect(() => {
    if (isEmpty(advices)) {
      dispatch(fetchAllAdvices());
    }
  }, [dispatch]);

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory]);

  // Infinite scroll: load more when loaderRef is visible
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setShowLoader(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setShowLoader(false);
          }, 300); // refresh delay
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, paginatedAdvices.length, hasMore]);

  function handleLike(id) {
    setShowPopup(true);
    // dispatch(likeAdvice(id));
  }

  function handleDisLike(id) {
    setShowPopup(true);
    // dispatch(dislikeAdvice(id));
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Medical Advice Community
            </h1>
            <p className="mt-4 text-xl">
              Expert health insights and advice from our medical professionals
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                placeholder="Search for health topics, or doctors..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex space-x-2 min-w-full pb-2">
            {loading ? (
              <div className="flex space-x-2">
                <div className="px-4 py-2 bg-gray-200 rounded-full animate-pulse w-24"></div>
                <div className="px-4 py-2 bg-gray-200 rounded-full animate-pulse w-32"></div>
                <div className="px-4 py-2 bg-gray-200 rounded-full animate-pulse w-28"></div>
              </div>
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-12">
          {loading && page === 1 ? (
            // Loading skeleton
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="w-1/3 h-4 bg-gray-200 animate-pulse mb-4"></div>
                    <div className="w-full h-6 bg-gray-200 animate-pulse mb-3"></div>
                    <div className="w-full h-4 bg-gray-200 animate-pulse mb-2"></div>
                    <div className="w-2/3 h-4 bg-gray-200 animate-pulse mb-6"></div>
                    <div className="flex items-center mt-6">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="ml-3">
                        <div className="w-24 h-4 bg-gray-200 animate-pulse"></div>
                        <div className="w-32 h-3 bg-gray-200 animate-pulse mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedAdvices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria. Try adjusting your
                search or category filter.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedAdvices.map((advice) => (
                  <div key={advice._id}>
<AdviceCard
  advice={advice}
  selectedCategory={selectedCategory}
  link="/community"
  handleLike={handleLike}
  handleDisLike={handleDisLike}
  state={{ selectedCategory }}
/>

                  </div>
                ))}
              </div>
              {/* Loader/Refresh icon for infinite scroll */}
              <div ref={loaderRef} className="flex justify-center py-8">
                {showLoader && hasMore ? (
                  <RefreshCw className="animate-spin h-4 w-4 text-blue-600" />
                ) : null}
              </div>
            </>
          )}
        </div>

        {/* Popup Component */}
        <Popup open={showPopup} onClose={() => setShowPopup(false)} />
      </div>
    </div>
  );
}
