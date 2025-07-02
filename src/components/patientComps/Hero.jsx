import { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const slides = [
  {
    id: 1,
    background: "bg-gradient-to-r from-menavy via-mepale to-[#5C7DC5]",
    content: "Welcome to MedEase — smart, seamless, secure healthcare.",
  },
  {
    id: 2,
    background: "bg-gradient-to-r from-[#284a80] via-menavy to-[#1e375f]",
    content: "Consult top doctors online or book in-person appointments.",
  },
  {
    id: 3,
    background: "bg-gradient-to-r from-[#2e4170] via-mepale to-[#1c2e53]",
    content: "Your health, our priority — powered by technology.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => resetTimeout();
  }, [currentIndex]);

  const handleDotClick = (idx) => {
    if (idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % slides.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      className="relative h-[15vh] sm:h-[20vh] md:h-[30vh] lg:h-[40vh] xl:h-[50vh] w-full overflow-hidden z-20"
      {...swipeHandlers}
    >
      {/* Sparkles ABOVE background, BELOW content */}
      {/* Crossfade Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out flex items-center justify-center text-center px-4 sm:px-12 text-white font-jost text-sm xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold ${
              slide.background
            } ${
              index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <div className="max-w-3xl drop-shadow-xl">{slide.content}</div>
          </div>
        ))}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              number: { value: 30 },
              size: { value: 2 },
              color: { value: "#ffffff" },
              opacity: { value: 0.6 },
              move: { enable: true, speed: 0.5 },
              links: { enable: false },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-20 pointer-events-none"
        />
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-[6px] h-[6px] md:w-3 md:h-3 rounded-full transition-all duration-500 ${
              idx === currentIndex
                ? "bg-menavy scale-125"
                : "bg-gray-300 opacity-50"
            }`}
            aria-label={`Slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
