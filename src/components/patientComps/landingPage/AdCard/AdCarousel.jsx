// src/components/landingPage/Ads/AdsCarousel.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdCard from "./AdCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAds } from "@/store/slices/adsSlice";
import { selectAllAds } from "@/store/selectors/adsSelectors";
import { isEmpty } from "@/utils/objectUtils";

export default function AdCarousel({ interval = 7000 }) {
  const dispatch = useDispatch();
  const ads = useSelector(selectAllAds);
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  // Fetch ads on mount
  useEffect(() => {
    if (isEmpty(ads)) {
      dispatch(fetchAllAds());
    }
  }, [ads, dispatch]);

  // Auto-rotate
  useEffect(() => {
    if (!ads.length || ads.length <= 1) return;
    if (idx >= ads.length) setIdx(0); // reset if idx is out of bounds

    timer.current = setTimeout(() => {
      setIdx((prev) => (prev + 1) % ads.length);
    }, interval);

    return () => clearTimeout(timer.current);
  }, [idx, ads.length, interval]);

  console.log("ads:", ads);
  console.log("current idx:", idx);
  // Guard
  if (!ads.length) return null;
  const ad = ads[idx];

  return (
    <section className="relative w-full px-4 sm:px-6 py-6">
      {/* Navy lines */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-menavy" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-menavy" />

      {/* Carousel grid */}
      <div
        className="mx-auto grid lg:grid-cols-[minmax(0,520px)_minmax(0,420px)]
                  justify-center items-start gap-y-0 lg:gap-y-8 lg:gap-x-24"
      >
        {/* Card column */}
        <div className="flex w-full justify-center">
          {ad && ad._id && (
            <AnimatePresence mode="wait">
              <motion.div
                key={ad._id}
                className="w-full"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className="flex justify-center w-full">
                  <AdCard {...ad} />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Text column */}
        <div
          className="flex flex-col justify-center gap-4 text-center lg:text-left
                     w-auto h-auto pt-10 lg:pt-0 lg:max-w-[420px] lg:h-[440px]"
        >
          <h4 className="text-xl sm:text-2xl font-bold text-menavy">
            Promote your health brand here
          </h4>
          <p className="text-gray-600 text-sm sm:text-base">
            Reach thousands of MedEase users every day. Showcase your service,
            medicine, or clinic in this slot.
          </p>
          <button
            className="bg-mepale text-center w-1/2 text-white text-sm sm:text-base px-5 py-2 rounded-md
                       hover:bg-menavy/90 transition-colors mx-auto lg:mx-0"
          >
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}
