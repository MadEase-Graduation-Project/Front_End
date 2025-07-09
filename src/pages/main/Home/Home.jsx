import BookApp from "@/components/patientComps/landingPage/BookApp";
import ServicesLine from "@/components/patientComps/landingPage/ServicesLine";
import Hero from "@/components/patientComps/landingPage/Hero";
import MedicalCasesSection from "@/components/patientComps/landingPage/MedicalCases/MedicalCasesSection";
import FaqQuestion from "@/components/patientComps/landingPage/FaqQuestions";
// import AdCarousel from "@/components/patientComps/landingPage/AdCard/AdCarousel";

// const adsData = [
//   {
//     _id: "6861cce9",
//     title: "Premier Diabetes Care at Lifeline Medical Center",
//     description:
//       "Manage your diabetes effectively with personalized treatment plans from our expert endocrinologists, backed by the latest technology and compassionate care.",
//     ImgUrl: "https://picsum.photos/id/237/300/200",
//     link: "/diabetes-care",
//     createdAt: "2025-06-29T23:31:53.534Z",
//     updatedAt: "2025-07-03T10:15:27.891Z",
//   },
//   {
//     _id: "abd1245",
//     title: "Advanced Cardiac Care at Pulse Heart Clinic",
//     description:
//       "Our cardiologists offer cutting-edge treatments and personalized plans to keep your heart strong and healthy.",
//     ImgUrl: "https://picsum.photos/id/237/200/300",
//     link: "/cardiac-care",
//     createdAt: "2025-06-28T15:10:00.000Z",
//     updatedAt: "2025-07-02T09:45:00.000Z",
//   },
//   {
//     _id: "derm567",
//     title: "Skincare Solutions by DermaGlow Clinic",
//     description:
//       "Achieve glowing skin with our custom dermatology treatments, laser therapy, and expert advice.",
//     ImgUrl: "https://picsum.photos/id/235/200/300",
//     link: "/skincare",
//     createdAt: "2025-06-27T20:00:00.000Z",
//     updatedAt: "2025-07-01T18:10:00.000Z",
//   },
// ];

const Home = () => {
  return (
    <div className="relative flex flex-col items-center gap-10 sm:gap-20">
      <div className=" flex flex-col items-center w-full">
        <Hero />
        <ServicesLine />
      </div>
      <BookApp />
      <MedicalCasesSection />
      <section className="w-full px-4 sm:px-16">{/* <AdCarousel /> */}</section>
      <p className="font-bold text-menavy">ana mobile</p>
      <p className="font-bold text-menavy">ana advices</p>
      <FaqQuestion />
    </div>
  );
};
export default Home;
