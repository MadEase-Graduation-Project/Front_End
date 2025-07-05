import BookApp from "@/components/patientComps/landingPage/BookApp";
import ServicesLine from "@/components/patientComps/landingPage/ServicesLine";
import Hero from "@/components/patientComps/landingPage/Hero";
import MedicalCasesSection from "@/components/patientComps/landingPage/MedicalCases/MedicalCasesSection";
import FaqQuestion from "@/components/patientComps/landingPage/FaqQuestions";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center">
      <Hero />
      <ServicesLine />
      <BookApp />
      <MedicalCasesSection />
      <p className="font-bold text-menavy">ana mobile</p>
      <p className="font-bold text-menavy">ana advices</p>
      <FaqQuestion />
    </div>
  );
};
export default Home;
