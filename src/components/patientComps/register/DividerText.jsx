import Divider from "./Divider";
import TextTitle from "../TextTitle";

const DividerText = ({ reg }) => (
  <div className="hidden md:flex gap-[8px]">
    <Divider />
    <TextTitle text={reg} className="whitespace-nowrap" />
    <Divider />
  </div>
);
export default DividerText;
