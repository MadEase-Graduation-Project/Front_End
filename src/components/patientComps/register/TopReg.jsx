import TextTitle from "../TextTitle";
import UnderLined from "./UnderLined";
const TopReg = ({ regtitle, regnote, reg, dest }) => (
  <div className="flex flex-col">
    <h1 className="font-jost font-semibold text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl text-menavy mb-2">
      {regtitle}
    </h1>
    <div className="flex items-center gap-[5px] flex-wrap">
      <TextTitle text={regnote} />
      <UnderLined text={reg} link={dest} />
    </div>
  </div>
);

export default TopReg;
