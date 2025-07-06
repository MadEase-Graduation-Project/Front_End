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
    <div className="px-6 md:px-12 lg:px-48 py-16">
      {bookingMessage && (
        <div className={`text-center mb-6 text-sm font-medium ${
          bookingMessage.includes('Successfully') 
            ? 'text-green-600' 
            : 'text-red-600'
        }`}>
          {bookingMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onBook={openBookingModal}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
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