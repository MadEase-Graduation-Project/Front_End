import { motion, useAnimationControls } from "framer-motion";
import { Bot } from "lucide-react";
import { useEffect } from "react";

const CtaMedicalCases = () => {
  const iconControls = useAnimationControls();
  const buttonControls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      iconControls.start({
        rotate: [0, -10, 10, -5, 5, 0],
        color: ["#ffffff", "#90cdf4", "#ffffff"],
        transition: { duration: 0.8 },
      });

      buttonControls.start({
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 0 0px rgba(144, 205, 244, 0.0)",
          "0 0 10px rgba(144, 205, 244, 0.6)",
          "0 0 0px rgba(144, 205, 244, 0.0)",
        ],
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [iconControls, buttonControls]);

  return (
    <div className="mt-12 text-center">
      <motion.button
        className="bg-mepale font-jost font-normal text-white text-[10px] md:text-base lg:text-lg w-full min-h-[44px] py-2 md:py-3 px-4 rounded-[5px] 
                  hover:bg-menavy/90 hover:brightness-110 transition-all duration-250 
                  flex items-center justify-center gap-2"
        animate={buttonControls}
        whileHover={{ scale: 1.03 }}
      >
        <motion.span animate={iconControls}>
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.span>
        Ask MedBot Now
      </motion.button>
    </div>
  );
};

export default CtaMedicalCases;
