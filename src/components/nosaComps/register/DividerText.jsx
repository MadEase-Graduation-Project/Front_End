import Divider from "./divider";
import TextTitle from "../TextTitle";

const DividerText = ({state}) => (
    <div className="hidden md:flex gap-[8px]">
        <Divider />
        <TextTitle text={state === "Sign Up"?"or register with":"or sign up with"}/>
        <Divider />
    </div>
);
export default DividerText