import TextTitle from "../TextTitle";
import UnderLined from "./UnderLined";
const TopReg = ({ regtitle, regnote, reg , dest }) => (
    <div className='flex flex-col gap'>
        <h1 className='font-jost font-semibold text-2xl sm:text-3xl md:text-4xl text-menavy'>
            {regtitle}
        </h1>
        <div className="flex items-center gap-0 flex-wrap">
            <TextTitle text={regnote} />
            <UnderLined text={reg} link={dest} />
        </div>
    </div>

);

export default TopReg