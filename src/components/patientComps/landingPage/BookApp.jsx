import about from "@/assets/images/about.png";
const BookApp = () => {
  return (
    <div className="w-full py-12 px-16 md:px-28 lg:px-20">
      <div className="bg-meblue2 flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-between gap-5 lg:gap-10 rounded-3xl overflow-hidden">
        {/* Text Content (Bottom on small, Left on lg+) */}
        <div className="flex-1 gap-5 max-w-xl w-full px-4 sm:px-8 pb-10 lg:pb-0 lg:pl-16 flex flex-col justify-center items-center lg:items-start">
          <p className="font-jost text-center lg:text-start text-menavy font-normal sm:font-semibold text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
            Our team of dedicated doctors provides a supervised healthcare
            system with continuous consultations and 24/7 access to expert
            advice.
          </p>
          <button className="bg-mepale font-jost font-normal text-white text-xs sm:text-sm md:text-base lg:text-lg w-full lg:w-[50%] h-auto py-2 md:py-3 rounded-[5px] hover:bg-menavy/90 hover:brightness-110 duration-250 text-nowrap">
            Book appointment
          </button>
        </div>

        {/* Image (Top on small, Right on lg+) */}
        <div className="w-[80%] lg:w-[45%] lg:py-8 lg:px-0">
          <img
            src={about}
            alt="About MedEase"
            className="w-full h-auto object-cover rounded-bl-3xl rounded-br-3xl 
                   lg:rounded-tl-3xl lg:rounded-bl-3xl 
                   lg:rounded-tr-none lg:rounded-br-none"
          />
        </div>
      </div>
    </div>
  );
};
export default BookApp;
