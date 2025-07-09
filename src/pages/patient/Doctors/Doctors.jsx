import DoctorCard from "@/components/DoctorCard";
import AppointmentModal from "./AppointmentModal";
import {
  selectDoctorsError,
  selectDoctorsLoading,
  selectMyDetails,
  selectPublicDoctors,
} from "@/store/selectors";
import { fetchPublicDoctors } from "@/store/slices/doctorSlice";
import { createAppointment } from "@/store/slices/appointmentSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMYData } from "@/store/slices/userSlice";

export default function Doctors() {
  const dispatch = useDispatch();
  const doctors = useSelector(selectPublicDoctors);
  const loading = useSelector(selectDoctorsLoading);
  const error = useSelector(selectDoctorsError);
  const user = useSelector(selectMyDetails);
  const patientId = user?._id;

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [isBooking, setIsBooking] = useState(false);


  useEffect(() => {
    dispatch(fetchMYData());
  }, [dispatch]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await dispatch(fetchPublicDoctors({ page })).unwrap();
        const fetchedItems = res.items || res.data || res || [];
        
        // Check if we have fewer items than expected (indicating last page)
        if (fetchedItems.length < 10) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setHasMore(false);
      }
    };

    fetchDoctors();
  }, [dispatch, page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const openBookingModal = (doctor) => {
    if (!patientId) {
      alert("Please log in to book an appointment.");
      return;
    }
    setSelectedDoctor(doctor);
    setShowModal(true);
    // Clear any previous booking messages
    setBookingMessage(null);
  };

  const confirmBooking = async (appointmentData) => {
    if (isBooking) return; // Prevent double-booking
    
    setIsBooking(true);
    try {
      await dispatch(
        createAppointment({
          doctorId: selectedDoctor._id,
          appointmentData: {
            ...appointmentData,
            patientId,
          },
        })
      ).unwrap();

      setBookingMessage(`Successfully booked with ${selectedDoctor.name}`);
      setShowModal(false);
      setSelectedDoctor(null);
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setBookingMessage(null), 5000);
    } catch (err) {
      console.error("Booking failed:", err);
      setBookingMessage("Booking failed. Please try again.");
      
      // Auto-clear error message after 5 seconds
      setTimeout(() => setBookingMessage(null), 5000);
    } finally {
      setIsBooking(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  if (loading && doctors.length === 0) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
  <div className="px-6 md:px-12 lg:px-48 py-16 bg-gray-50 min-h-screen">
    {bookingMessage && (
      <div
        className={`fixed top-0 left-0 w-full z-50 py-3 text-center text-sm font-medium shadow-md ${
          bookingMessage.includes("Successfully")
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {bookingMessage}
      </div>
    )}

    <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
      Meet Our Doctors
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="animate-fadeInUp duration-500 delay-100"
        >
          <DoctorCard doctor={doctor} onBook={openBookingModal} />
        </div>
      ))}
    </div>

    {hasMore && (
      <div className="flex justify-center mt-14">
        <button
          onClick={handleLoadMore}
          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold tracking-wide text-white bg-cyan-600 rounded-xl hover:bg-cyan-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 mr-2 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            "Load More Doctors"
          )}
        </button>
      </div>
    )}

    {/* Modal */}
    {showModal && selectedDoctor && (
      <AppointmentModal
        isOpen={showModal}
        onClose={closeModal}
        doctor={selectedDoctor}
        onConfirm={confirmBooking}
        isLoading={isBooking}
      />
    )}
  </div>
);

}