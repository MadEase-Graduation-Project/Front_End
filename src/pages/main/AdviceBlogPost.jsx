import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllAdvices,
  selectFilteredAdvices,
} from "@/store/selectors/adviceSelectors";
import { fetchAllAdvices } from "@/store/slices/adviceSlice";
import { fetchAllDoctors } from "@/store/slices/doctorSlice";
import { createAppointment } from "@/store/slices/appointmentSlice";
import { readTime } from "@/utils/stringUtils";
import { isEmpty } from "@/utils/objectUtils";

const AdviceBlogPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [doctorQuery, setDoctorQuery] = useState("");
  const [bookingDoctorId, setBookingDoctorId] = useState(null);

  // Advice Selectors
  const allAdvices = useSelector(selectAllAdvices);
  const filteredAdvices = useSelector((state) =>
    selectFilteredAdvices(state, searchQuery, "All Categories")
  );
  const post = allAdvices.find((p) => p._id === id);

  // Doctor Selectors
  const doctors = useSelector((state) => state.doctors.items);
  const doctorsLoading = useSelector((state) => state.doctors.loading);
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(doctorQuery.toLowerCase())
  );

  // Fetch Advices if not loaded
  useEffect(() => {
    if (isEmpty(allAdvices)) {
      dispatch(fetchAllAdvices());
    }
  }, [dispatch, allAdvices]);

  // Fetch Doctors on mount
  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const bookAppointment = async (doctor) => {
    const appointmentData = {
      doctorId: doctor.id,
      patientName: "John Doe", // Replace with real user info
      date: new Date().toISOString(),
      reason: "General Checkup",
    };

    setBookingDoctorId(doctor.id);

    try {
      await dispatch(createAppointment(appointmentData)).unwrap();
      alert(`Appointment booked with Dr. ${doctor.name}`);
    } catch (error) {
      alert("Failed to book appointment: " + error.message);
    } finally {
      setBookingDoctorId(null);
    }
  };

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-500">Post not found</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-12 gap-8 md:flex-row flex-col">
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline text-sm mb-4"
          >
            ← Back to Community
          </button>

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
            <span>•</span>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() =>
                navigate("/community", {
                  state: { selectedCategory: post.diseasesCategoryName },
                })
              }
            >
              {post.diseasesCategoryName}
            </button>
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
            <p className="text-sm text-gray-700">Written by</p>
            <p className="text-base font-medium text-gray-900">
              {post.doctorName}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="top-16">
            {/* Search Articles */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Search for health topics, articles, or doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Related Posts */}
            {searchQuery && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow">
                <h2 className="text-sm font-semibold text-gray-600 mb-2">
                  Related Posts
                </h2>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredAdvices.length > 0 ? (
                    filteredAdvices.map((item) => (
                      <li key={item._id}>
                        <button
                          className="text-left w-full text-blue-600 hover:underline text-sm"
                          onClick={() => navigate(`/community/${item._id}`)}
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

            {/* Doctor Search & Booking */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Search Doctors
              </h2>

              <div className="relative mb-4">
                <input
                  type="text"
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by doctor name..."
                  value={doctorQuery}
                  onChange={(e) => setDoctorQuery(e.target.value)}
                />
              </div>

              {doctorsLoading ? (
                <p className="text-gray-500 text-sm">Loading doctors...</p>
              ) : filteredDoctors.length === 0 ? (
                <p className="text-gray-400 text-sm">No doctors found.</p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredDoctors.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.specialty || "General"}
                        </p>
                      </div>
                      <button
                        onClick={() => bookAppointment(doc)}
                        disabled={bookingDoctorId === doc.id}
                        className={`text-xs px-2 py-1 rounded ${
                          bookingDoctorId === doc.id
                            ? "bg-gray-400 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {bookingDoctorId === doc.id ? "Booking..." : "Book"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Future Ads Section */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Sponsored
              </h2>
              <div className="h-72 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm border border-gray-300">
                Ad space – coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceBlogPost;
