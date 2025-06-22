import TextTitle from "../TextTitle";
const BottomBtn = ({ source, btn }) => (
  <button
    className="bg-whitetransp w-full sm:h-[40px] md:h-[45px] rounded-[5px]
        border border-transparent  
        hover:bg-menavyoff transition-all duration-250"
    onClick={() => alert("btn clicked")}
  >
    <div className="flex items-center justify-center gap-[10px] sm:gap-[5px]">
      <img src={source} className="w-[20px] sm:w-[25px] h-auto" />
      <TextTitle text={btn} className="hidden sm:block md:text-base " />
    </div>
  </button>
);

export default BottomBtn;
