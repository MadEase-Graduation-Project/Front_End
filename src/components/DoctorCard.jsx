import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DoctorImage from '@/assets/doctor-M.png';
import { Star, StarHalf } from 'lucide-react'; // Optional: Replace with solid stars if preferred

const DoctorCard = ({ doctor, onBook }) => {
  const handleBookAppointment = () => {
  if (onBook) {
    onBook(doctor);
  }
};


  const cardVariants = {
    rest: { scale: 1, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)' },
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 30px rgba(0, 112, 243, 0.15)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const {
    name = 'Dr. Unknown',
    specialization = doctor?.specialization || 'Doctor',
    description = doctor?.description || 'No description available.',
    rating = doctor?.rate || 5,
    imageUrl = doctor?.ImgUrl || DoctorImage,
  } = doctor || {};

  const renderRatingStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" />);
    }

    if (hasHalf) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 text-yellow-400" fill="currentColor" />);
    }

    return stars;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full transition-all duration-300 shadow-sm"
      role="group"
    >
      <div className="relative flex flex-col h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.div variants={imageVariants} className="w-full h-full">
            <img
              className="w-full h-full object-cover transition-transform duration-300"
              src={imageUrl || DoctorImage}
              alt={`Portrait of ${name}`}
              loading="lazy"
              onError={(e) => {
                e.target.src = DoctorImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent opacity-90 pointer-events-none" />
          </motion.div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600 mb-2 bg-cyan-50 px-2 py-1 rounded-full w-fit">
            {specialization}
          </span>

          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-cyan-700 transition-colors duration-300 truncate">
            {name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Rating</span>
              <div className="flex items-center gap-1">{renderRatingStars()}</div>
            </div>

            <Button
              onClick={handleBookAppointment}
              className="w-full bg-cyan-600 text-white hover:bg-cyan-700 transition-transform duration-300 py-2.5 rounded-xl font-medium text-sm group-hover:scale-105 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              aria-label={`Book appointment with ${name}`}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
