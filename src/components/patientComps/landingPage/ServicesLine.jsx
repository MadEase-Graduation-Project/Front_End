import { TbClock24 } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { PiBookmarkBold } from "react-icons/pi";
import { motion } from "framer-motion";

const services = [
  {
    icon: TbClock24,
    label: "24/7 Service",
    description: "Always available when you need us most.",
  },
  {
    icon: BsRobot,
    label: "AI-Powered",
    description: "Get smart medical help instantly.",
  },
  {
    icon: PiBookmarkBold,
    label: "Book in a Tap",
    description: "Easily schedule appointments in seconds.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ServicesLine = () => {
  return (
    <section className="w-full bg-meblue py-14 px-6 sm:px-12">
      <div className="text-center mb-12">
        <h2 className="text-menavy text-2xl sm:text-3xl font-jost font-bold">
          Why Choose MedEase?
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Trusted healthcare, driven by technology.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={idx}
              className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center text-center w-full max-w-[260px] mx-auto"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
            >
              <Icon className="text-menavy text-4xl md:text-5xl mb-4" />
              <h3 className="text-lg font-semibold text-menavy mb-1 font-jost">
                {service.label}
              </h3>
              <p className="text-gray-600 text-sm font-jost">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesLine;
