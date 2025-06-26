import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, ThumbsUp, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "@/utils/objectUtils";
import { fetchAllAdvices } from "@/store/slices/adviceSlice";
import { readTime } from "@/utils/stringUtils";
import {
  selectAdviceCategories,
  selectFilteredAdvices,
  selectAdvicesLoading,
  selectAllAdvices,
} from "@/store/selectors/adviceSelectors";
import { useNavigate } from "react-router-dom";

export default function Community() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const navigate = useNavigate();
  const handleAdviceClick = (adviceId) => {
    navigate(`/community/${adviceId}`);
  };

  // Use selectors to get data from Redux store
  const advices = useSelector(selectAllAdvices);
  const loading = useSelector(selectAdvicesLoading);
  const categories = useSelector(selectAdviceCategories);
  const filteredAdvices = useSelector((state) =>
    selectFilteredAdvices(state, searchQuery, selectedCategory)
  );

  // Fetch data only once when component mounts
  useEffect(() => {
    if (isEmpty(advices)) {
      dispatch(fetchAllAdvices());
    }
  }, [dispatch, advices]);

  // Format date
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

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
                placeholder="Search for health topics, articles, or doctors..."
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Latest Articles
          </h2>
          {loading ? (
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
          ) : filteredAdvices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria. Try adjusting your
                search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredAdvices.map((advice) => (
                <button onClick={() => handleAdviceClick(advice._id)}>
                  <div
                  key={advice._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    className="h-48 w-full object-cover"
                    src={"../../assets/doctor-F.png"}
                    alt={advice.title || "Medical article"}
                  />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-600">
                        {advice.diseasesCategoryName || "Health"}
                      </p>
                      <Link
                        to={`/community`}
                        className="block mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {advice.title || "Untitled Article"}
                      </Link>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">
                        {advice.description || "No description available."}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={"../../assets/doctor-F.png"}
                          alt={advice.doctorName || "Doctor"}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {advice.doctorName || "Unknown Doctor"}
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar size={12} />
                          <time dateTime={advice.createdAt}>
                            {formatDate(advice.createdAt)}
                          </time>
                          <span aria-hidden="true">&middot;</span>
                          <Clock size={12} />
                          <span>
                            {advice.description
                              ? readTime(advice.description)
                              : 3}{" "}
                            min read
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mt-4 flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{advice.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{advice.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>{advice.shares}</span>
                      </div>
                    </div> */}
                  </div>
                </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
