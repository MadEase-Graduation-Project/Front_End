import UnderLined from "./UnderLined";
const HalfBodyLogin = () => (
    <div className="flex flex-col gap-[5px]">
        <UnderLined
            text={"Forgotten password?"}
            link={"/resetpass"}
        />
        <button
            className="bg-menavy font-jost font-light text-white text-sm sm:text-base md:text-lg lg:text-xl w-full h-[25px] lg:h-[40px] rounded-[5px]
            hover:bg-menavy/90 hover:brightness-110 duration-250"
            onClick={() => alert("btn clicked")}
        >
            Login
        </button>

    </div>
);
export default HalfBodyLogin
//hover:brightness-110