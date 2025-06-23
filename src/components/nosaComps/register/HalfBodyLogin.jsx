import UnderLined from "./UnderLined";
const HalfBodyLogin = () => (
    <div className="flex flex-col gap-[5px]">
        <UnderLined
            text={"Forgotten password?"}
            onClick={() => alert("you clicked me!")}
        />
        <button
            className="bg-menavy font-jost font-normal text-white text-xl w-full sm:h-[40px] md:h-[45px] rounded-[5px]
            hover:bg-menavy/90 hover:brightness-110 duration-250"
            onClick={() => alert("btn clicked")}
        >
            Login
        </button>

    </div>
);
export default HalfBodyLogin
//hover:brightness-110