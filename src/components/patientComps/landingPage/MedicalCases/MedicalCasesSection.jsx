import { motion } from "framer-motion";
import lung from "@/assets/images/lung.jpg";
import stomach from "@/assets/images/stomach.jpg";
import brain from "@/assets/images/brain.jpg";
import CtaMedicalCases from "./CtaMedicalCases";
const medicalSections = [
  {
    title: "Lungs",
    image: lung,
    points: ["Asthma", "Bronchitis", "COPD", "Lung Infection"],
  },
  {
    title: "Stomach",
    image: stomach,
    points: ["Gastritis", "Ulcers", "IBS", "Acid Reflux"],
  },
  {
    title: "Brain",
    image: brain,
    points: ["Migraines", "Epilepsy", "Stroke", "Alzheimer's"],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const MedicalCasesSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="text-center mb-12">
        <h2 className="text-menavy text-2xl sm:text-3xl font-jost font-bold">
          Explore Medical Cases
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Common health concerns handled by MedEase
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-auto">
        {medicalSections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-72 h-auto mb-7 object-contain rounded-3xl "
            />
            <h3 className="text-menavy font-semibold text-lg sm:text-xl font-jost mb-2">
              {section.title}
            </h3>
            <ul className="text-gray-600 text-sm sm:text-base font-jost list-disc list-inside text-start">
              {section.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        <CtaMedicalCases />
      </div>
    </section>
  );
};

export default MedicalCasesSection;
