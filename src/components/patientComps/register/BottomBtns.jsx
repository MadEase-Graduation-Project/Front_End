import BottomBtn from "./BottomBtn";
import google from "../../../assets/images/google.svg";
import apple from "../../../assets/images/apple.svg";
const BottomBtns = () => (
    <div className="flex gap-[12px]">
        <BottomBtn source={google} btn={"Google"}/>
        <BottomBtn source={apple} btn={"Apple"}/>
    </div>
);
export default BottomBtns