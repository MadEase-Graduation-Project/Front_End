import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DoctorImage from '@/assets/doctor-M.png';
// import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const handleBookAppointment = () => {
    console.log(`Booking appointment with ${doctor?.name || 'the doctor'}...`);
  };

  const cardVariants = {
    rest: {
      scale: 1,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
    },
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
    name = 'Dr. Tasneem',
    specialty = 'Cardiologist',
    description = 'Expert in heart health and patient care with years of experience.',
    rating = 5,
    imageUrl,
  } = doctor || {};

  const renderRatingStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalf ? '½' : ''}
      </>
    );
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full transition-all duration-300"
    >
      <div className="relative flex flex-col h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.div variants={imageVariants} className="w-full h-full">
            <img
              className="w-full h-full object-cover transition-transform duration-300"
              src={imageUrl || DoctorImage}
              alt={name}
              onError={(e) => {
                e.target.src = DoctorImage;
              }}
            />
          </motion.div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600 mb-2 bg-cyan-50 px-2 py-1 rounded-full w-fit">
            {specialty}
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
              <span className="text-yellow-400 text-lg">{renderRatingStars()}</span>
            </div>

            <Button
              onClick={handleBookAppointment}
              className="w-full bg-cyan-600 text-white hover:bg-cyan-700 transition-transform duration-300 py-2.5 rounded-xl font-medium text-sm group-hover:scale-105"
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
