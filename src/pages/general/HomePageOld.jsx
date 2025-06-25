import { useState, useEffect } from "react";
import NavBar from "../../components/patientComps/NavBar";
import about from "../../assets/images/about.png";
import hero from "../../assets/images/hero2.png";
import docgannat from "../../assets/images/amira.png";
import docgeorge from "../../assets/images/george.png";
import docsameh from "../../assets/images/sameh.png";
import mom from "../../assets/images/mom.png";
import advices from "../../assets/images/advices.png";
import aid from "../../assets/images/aid.png";
import ai from "../../assets/images/ai.png";
import DocCard from "../../components/patientComps/landingPage/DocCard";
import ServicesLine from "../../components/patientComps/landingPage/ServicesLine";
import ServicesCard from "../../components/patientComps/landingPage/ServicesCard";

const HomePageOld = () => {
  const [scrolled, setScrolled] = useState(false);
  const [state, setState] = useState("register");
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(state);

  return (
    <div className="flex flex-col relative w-full max-w-[100vw] min-h-screen bg-meoff gap-[20px]">
      <NavBar scrolled={scrolled} state={state} />
      <div className="relative flex flex-col w-full mt-[45px] md:mt-[60px] gap-10 md:gap-14 lg:gap-16 xl:gap-24 items-center">
        <div className="relative w-full">
          <img className="w-full h-auto" src={hero} />
          <div className="absolute flex flex-col bottom-2 left-2 sm:bottom-5 sm:left-5">
            <p className="font-jost font-semibold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
              Care with ease,
              <br />
              Health with peace.
            </p>
            <br />
            <p
              className="w-3/4 hidden sm:block font-jost font-light 
                         sm:text-sm md:text-base lg:text-xl sm:leading-[1.2] md:leading-[1.4] text-white break-words mt-2"
            >
              Where advanced technology meets compassionate care—connect with
              doctors, access expert advice, and get instant support from our
              self-aid chatbot.
            </p>
          </div>
        </div>

        <div className="flex w-4/5 justify-center items-center gap-5 md:gap-16 lg:gap-24 xl:gap-32">
          <img
            className="w-[120px] sm:w-[250px] md:w-[350px] lg:w-[400px] h-auto rounded-[10px]"
            src={about}
          />
          <div className="flex flex-col gap-1 md:gap-4">
            <p className="font-jost font-bold text-[8px] xs:text-xs md:text-base lg:text-xl xl:text-3xl text-menavy">
              Welcome to MedEase– The Future of Hospital Connectivity
            </p>
            <p className="font-jost hidden xs:block xs:text-[8px] md:text-xs lg:text-base xl:text-lg text-menavy break-words">
              Our team of dedicated doctors provides a supervised healthcare
              system with continuous consultations and 24/7 access to expert
              advice. From real-time doctor connections to always-available
              medical insights, we ensure you and your loved ones get the care
              you need, anytime.
            </p>
          </div>
        </div>

        <ServicesLine />

        <div className="flex flex-col w-full max-w-[100vw] items-center gap-4 xs:gap-8 xl:gap-10">
          <p className="text-menavy font-jost font-bold text-xs sm:text-base md:text-xl lg:text-3xl">
            Our Specialists
          </p>
          <div className="w-full grid grid-cols-12 gap-2 xs:gap-5 mx-10 px-4 xs:px-10">
            <DocCard
              pic={docgeorge}
              name_={"Dr.George Samuel"}
              prof_={"Cardiothoracic Surgeon"}
              desc_={`With 10+ years in heart and lung surgery, Dr.George has led groundbreaking procedures in lung transplants.`}
            />
            <DocCard
              pic={docgannat}
              name_={"Dr.Gannat Fahmy"}
              prof_={"Dermatologist"}
              desc_={`She has spent 10 years helping patients with skin disorders,
                                specializing in laser treatments and advanced acne therapies.`}
            />
            <DocCard
              pic={docsameh}
              name_={"Dr.Sameh AHmed"}
              prof_={"General surgeon"}
              desc_={`Performed over 1,500 surgeries, 
                                    including complex abdominal and trauma procedures. 
                                    He is known for his precision in minimally invasive surgery.`}
            />
          </div>
        </div>
        <div className="flex flex-col w-[98%] bg-white gap-4  xl:p-10 rounded-[10px] items-center">
          <ServicesCard
            pic={mom}
            title={"New Born Advices"}
            desc={`Guiding parents through the first precious months with expert tips on baby care,
                    nutrition, sleep routines, and developmental milestones.`}
          />
          <ServicesCard
            pic={advices}
            title={"Expert Medical Advicess"}
            desc={`A comprehensive resource with medically reviewed articles, covering everything from disease prevention to healthy lifestyle habits,
                             all written by healthcare professionals.`}
            className="flex-row-reverse"
          />
          <ServicesCard
            pic={aid}
            title={"First Aid"}
            desc={`Quick and reliable first aid instructions for emergencies, from minor cuts to critical situations,
                             ensuring the right response when it matters most.`}
          />
          <ServicesCard
            pic={ai}
            title={"AI-Powered Chatbot"}
            desc={`Instant medical guidance at your fingertips—our chatbot provides symptom checks, self-care tips,
                             and directs you to expert help when needed.`}
            className="flex-row-reverse"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageOld;
