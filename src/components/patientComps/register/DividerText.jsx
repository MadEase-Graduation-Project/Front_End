import Divider from "./divider";
import TextTitle from "../TextTitle";

const DividerText = ({reg}) => (
    <div className="hidden md:flex gap-[8px]">
        <Divider />
        <TextTitle text={reg}/>
        <Divider />
    </div>
);
export default DividerText