import { Calendar, Clock, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAdvices } from "@/store/selectors/adviceSelectors";
import { makeSelectFilteredAdvices } from "@/store/selectors/adviceSelectors";
import { fetchAllAdvices } from "@/store/slices/adviceSlice";
import { fetchPublicDoctors } from "@/store/slices/doctorSlice";
import { createAppointment } from "@/store/slices/appointmentSlice";
import { readTime } from "@/utils/stringUtils";
import { isEmpty } from "@/utils/objectUtils";
import {
  selectDoctorsLoading,
  selectPublicDoctors,
  selectDoctorsError,
} from "@/store/selectors";

import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const AdviceBlogPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [doctorQuery, setDoctorQuery] = useState("");
  const [bookingDoctorId, setBookingDoctorId] = useState(null);

  const selectedCategory = location.state?.selectedCategory || "All Categories";

  const allAdvices = useSelector(selectAllAdvices);
  const post = allAdvices.find((p) => p._id === id);

  const filteredAdvices = useSelector(
    useMemo(
      () => makeSelectFilteredAdvices(searchQuery, selectedCategory),
      [searchQuery, selectedCategory]
    )
  );

  const doctors = useSelector(selectPublicDoctors);
  const doctorsLoading = useSelector(selectDoctorsLoading);
  const doctorsError = useSelector(selectDoctorsError);

  // Updated doctor filtering logic with useMemo - only show results when searching
  const filteredDoctors = useMemo(() => {
    if (!doctors || !Array.isArray(doctors)) {
      return [];
    }

    if (!doctorQuery.trim()) {
      return []; // Hide doctors when no search query
    }

    return doctors.filter((doc) => {
      const name = doc.name || "";
      const specialty = doc.specialty || "";
      const query = doctorQuery.toLowerCase().trim();

      return (
        name.toLowerCase().includes(query) ||
        specialty.toLowerCase().includes(query)
      );
    });
  }, [doctors, doctorQuery]);

  useEffect(() => {
    if (isEmpty(allAdvices)) dispatch(fetchAllAdvices());
  }, [dispatch, allAdvices]);

  // Updated useEffect for fetching doctors with proper error handling
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await dispatch(fetchPublicDoctors({ page: 1 })).unwrap();
        const fetchedItems = res.items || res.data || res || [];
        console.log("Fetched doctors:", fetchedItems);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Updated appointment booking function to match the Doctors component
  const bookAppointment = async (doctor) => {
    if (bookingDoctorId) return; // Prevent double-booking

    setBookingDoctorId(doctor._id);
    try {
      await dispatch(
        createAppointment({
          doctorId: doctor._id,
          appointmentData: {
            patientName: "John Doe", // Replace with real user data
            date: new Date().toISOString(),
            reason: "General Checkup",
            patientId: "user_id_here", // Add actual user ID
          },
        })
      ).unwrap();

      alert(`Successfully booked with ${doctor.name}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setBookingDoctorId(null);
    }
  };

  // Function to handle navigation to blog post
  const navigateToPost = (postId) => {
    navigate(`/community/${postId}`, {
      state: { selectedCategory },
    });
  };

  // Debug logging
  console.log("Doctors:", doctors);
  console.log("Doctor query:", doctorQuery);
  console.log("Filtered doctors:", filteredDoctors);

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl font-semibold mb-2">Post Not Found</p>
        <button
          onClick={() => navigate("/community")}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Community
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-12 gap-8 md:flex-row flex-col">
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <button
            onClick={() =>
              navigate("/community", {
                state: { selectedCategory },
              })
            }
            className="text-blue-600 hover:underline text-sm mb-4"
          >
            ← Back to {selectedCategory}
          </button>

          <div className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded mb-2">
            #{post.diseasesCategoryName || "Uncategorized"}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-500 text-sm space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{readTime(post.description)} min read</span>
            </div>
          </div>

          <img
            src={post.ImgUrl}
            alt={post.title}
            className="w-full h-auto object-cover rounded-xl shadow mb-8"
          />

          <p className="text-lg text-gray-800 leading-relaxed mb-12">
            {post.description}
          </p>

          <div className="p-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-700">Written by</p>
              <p className="text-base font-medium text-gray-900">
                {post.doctorName}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Related Posts
              </h2>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {filteredAdvices.length > 0 ? (
                  filteredAdvices.map((item) => (
                    <li key={item._id}>
                      <button
                        className="text-left w-full text-blue-600 hover:underline text-sm"
                        onClick={() => navigateToPost(item._id)}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm">No matches found.</li>
                )}
              </ul>
            </div>
          )}

          {/* Doctor Search */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">
              Search Doctors
            </h2>

            <input
              type="text"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Search by doctor name or specialty..."
              value={doctorQuery}
              onChange={(e) => setDoctorQuery(e.target.value)}
            />

            {doctorsLoading && doctorQuery.trim() ? (
              <p className="text-gray-500 text-sm">Searching doctors...</p>
            ) : doctorsError && doctorQuery.trim() ? (
              <p className="text-red-500 text-sm">
                Error searching doctors: {doctorsError}
              </p>
            ) : !doctorQuery.trim() ? (
              <p className="text-gray-400 text-sm">
                Start typing to search for doctors...
              </p>
            ) : filteredDoctors.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No doctors found matching "{doctorQuery}".
              </p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {filteredDoctors.map((doc) => (
                  <li
                    key={doc._id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {doc.name || "Unknown Doctor"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.specialty || "General"}
                      </p>
                    </div>
                    <button
                      onClick={() => bookAppointment(doc)}
                      disabled={bookingDoctorId === doc._id}
                      className={`text-xs px-2 py-1 rounded ${
                        bookingDoctorId === doc._id
                          ? "bg-gray-400 text-white"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {bookingDoctorId === doc._id ? "Booking..." : "Book"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Ads Placeholder */}
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xs uppercase font-bold text-gray-500 mb-3 tracking-wide">
              Sponsored
            </h2>

            <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center px-4">
                <p className="font-medium">Ad space</p>
                <p className="text-xs text-gray-500 mt-1">Coming soon</p>
              </div>

              {/* Future placeholder for ad image */}
              {/* <img src="/path-to-ad.jpg" alt="Sponsored Ad" className="absolute inset-0 w-full h-full object-cover rounded-xl" /> */}
            </div>

            {/* Optional CTA or link */}
            <div className="mt-4 text-center">
              <button
                disabled
                className="text-xs text-white bg-gray-400 px-3 py-1.5 rounded-full cursor-not-allowed"
              >
                Reserve this spot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceBlogPost;