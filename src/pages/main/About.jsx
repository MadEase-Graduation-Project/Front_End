import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Package } from "lucide-react";
import us from "@/assets/us.png";
import { FaDatabase, FaLaptopCode, FaMobile, FaRobot } from "react-icons/fa";
import tasneem from "@/assets/TasneemPic.jpg";
import nancy from "@/assets/NancyPic.jpg";
// import abdelrahman from "@/assets/AbdelrahmanPic.jpg";
// import mohammedNashaat from "@/assets/MohammedNashaatPic.jpg";
// import khaled from "@/assets/KhaledPic.jpg";
// import heba from "@/assets/HebaPic.jpg";
// import mohammedHisham from "@/assets/MohammedHishamPic.jpg";
// import mohammedAbdelhameed from "@/assets/MohammedAbdelhameedPic.jpg";
// import ahmedEmad from "@/assets/AhmedEmadPic.jpg";
// import yousefZakaria from "@/assets/YousefZakariaPic.jpg";
// import mostafaYousef from "@/assets/MostafaYousefPic.jpg";
import samaa from "@/assets/Samaa.jpg";
import eman from "@/assets/EmanPic.jpg";
import hagar from "@/assets/HagarPic.jpg";

const TeamCard = ({ name, img = us, role, bio, linkedIn }) => (
  <div className="relative group flex flex-col items-center text-center">
    <motion.a
      href={linkedIn}
      target="_blank"
      rel="noopener noreferrer"
      className="w-32 h-32 mb-4 rounded-full overflow-hidden shadow-xl border-4 border-pastel-medium cursor-pointer block"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
      viewport={{ once: true }}
    >
      <img
        className="w-full h-full object-cover"
        alt={`Portrait of ${name}`}
        src={img}
      />
    </motion.a>

    <h2 className="text-lg font-semibold text-black">{name}</h2>

    {/* Hover Tooltip */}
    {role && bio && (
      <div className="absolute top-full mt-2 w-56 bg-white text-black rounded-lg shadow-lg px-4 py-3 z-10 hidden group-hover:block transition-all duration-200 text-left">
        <p className="text-sm font-semibold mb-1">{role}</p>
        <p className="text-xs text-gray-600">{bio}</p>
      </div>
    )}
  </div>
);

const TechBadge = ({ name, description }) => {
  return (
    <div className="relative group inline-block">
      <span className="bg-black text-white text-sm font-medium px-3 py-1 rounded-full cursor-default">
        {name}
      </span>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-white/50 text-black text-xs px-2 py-1 rounded shadow-lg z-10 w-48 text-center">
        {description}
      </div>
    </div>
  );
};

const About = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 animate-fade-in"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-pastel-accent text-center mb-12"
      >
        Our Story:
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-pastel-accent text-center mb-12"
      >
        Care with Ease, Health with Peace
      </motion.h1>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16 text-center items-center"
      >
        <div className="prose prose-lg max-w-none text-black/90">
          <p className="lead text-2xl mx-24">
            At MedEase, we're redefining the way people access and experience
            medical care. Our mission is simple: to make healthcare easier,
            smarter, and more accessible for everyone. Whether you're a patient
            booking your next appointment, a doctor managing schedules and
            records, or someone seeking trusted health insights—MedEase provides
            a seamless digital experience tailored just for you. Built with
            care, innovation, and collaboration, MedEase is more than just a
            platform—it's a product of passion and teamwork.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 bg-meblue2 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Meet the Team Behind MedEase
        </h2>
        <p className="text-xl text-black/90 mb-4 text-center">
          We’re a diverse and dedicated group of computer engineering students,
          each bringing our unique skills and energy to build something
          meaningful:
        </p>
        <div className="grid md:grid-cols-4 gap-8 text-center px-8">
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaLaptopCode size={48} className="mx-auto mb-4 text-pastel-dark" />
            <h3 className="text-2xl font-semibold text-black mb-2">
              Frontend Developers
            </h3>
            <p className="text-black/80">
              We bring the user interface to life—crafting responsive,
              intuitive, and beautiful designs that make navigation smooth and
              user-friendly.
            </p>
          </motion.div>
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FaDatabase size={48} className="mx-auto mb-4 text-pastel-dark" />
            <h3 className="text-2xl font-semibold text-pastel-accent mb-2">
              Backend Developers
            </h3>
            <p className="text-black/80">
              We handle the core logic and database systems, ensuring that every
              piece of data flows securely and efficiently behind the scenes.
            </p>
          </motion.div>
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaMobile size={48} className="mx-auto mb-4 text-pastel-dark" />
            <h3 className="text-2xl font-semibold text-black mb-2">
              Mobile App Developers
            </h3>
            <p className="text-black/80">
              We make healthcare portable, designing the MedEase app so users
              can get medical support wherever they are, anytime.
            </p>
          </motion.div>
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaRobot size={48} className="mx-auto mb-4 text-pastel-dark" />
            <h3 className="text-2xl font-semibold text-black mb-2">
              AI Engineers
            </h3>
            <p className="text-black/80">
              We're integrating intelligence into healthcare—enhancing patient
              experiences and powering features like smart recommendations and
              predictive tools.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-16 text-center"
      >
        <h2 className="text-4xl font-bold text-pastel-accent mb-6">
          Meet the Team
        </h2>
        <h3 className="text-2xl font-bold text-black my-4"> Front-End Team </h3>
        <div className="flex gap-3 flex-wrap justify-center mb-4">
          <TechBadge
            name="React"
            description="A JavaScript library for building UIs"
          />
          <TechBadge
            name="Tailwind CSS"
            description="A utility-first CSS framework"
          />
          <TechBadge
            name="Framer Motion"
            description="Animation library for React"
          />
          <TechBadge name="Redux" description="State management library" />
          <TechBadge
            name="Axios"
            description="Promise-based HTTP client for the browser and node.js"
          />
        </div>
        <div className=" grid md:grid-cols-4 max-w-5xl mx-auto my-8">
          <TeamCard name="Tasneem Fahmi" img={tasneem} role="Frontend Developer"
  bio="Passionate about building intuitive UIs and shaping the user experience." linkedIn="https://www.linkedin.com/in/tasneem-fahmi-madkour/" />
          <TeamCard name="Nancy Mosaad" img={nancy} />
          <TeamCard name="Abdelrahman Awad" img={us} />
          <TeamCard name="Mohammed Nashaat" img={us} />
        </div>

        <h3 className="text-2xl font-bold text-black my-6"> Back-End Team </h3>
        <div className=" grid md:grid-cols-4 max-w-5xl mx-auto">
          <TeamCard name="Khaled Mahmoud" img={us} />
          <TeamCard name="Heba Ragheb" img={us} />
          <TeamCard name="Mohammed Hisham" img={us} />
          <TeamCard name="Mohammed Abdelhameed" img={us} />
        </div>
        <h3 className="text-2xl font-bold text-black my-6">
          {" "}
          Mobile App Development Team{" "}
        </h3>
        <div className=" grid md:grid-cols-3 max-w-5xl mx-auto">
          <TeamCard name="Ahmed Emad" img={us} />
          <TeamCard name="Yousef Zakaria" img={us} />
          <TeamCard name="Mostafa Yousef" img={us} />
        </div>
        <h3 className="text-2xl font-bold text-black my-6"> AI Team </h3>
        <div className=" grid md:grid-cols-3 max-w-5xl mx-auto">
          <TeamCard name="Samaa Eltohamy" img={samaa} />
          <TeamCard name="Eman Mohey" img={eman} />
          <TeamCard name="Hagar Sobhy" img={hagar} />
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;
