import TextTitle from "../TextTitle";
import UnderLined from "./UnderLined";
const TopReg = ({ state , setState }) => (
    <div className='flex flex-col gap'>
        <h1 className='font-jost font-semibold text-4xl text-menavy'>{state==="Sign Up"?"Create an account":"Welcome Back!!"}</h1>
        <div className="flex items-center gap-[5px]">
            <TextTitle text={state==="Sign Up"?"already have one?":"don't have an account?"}/>
            <UnderLined text={state==="Sign Up"?"Log in":"Sign up"} onClick={()=>setState(state==="Sign Up"?"Log In":"Sign Up")}/>
        </div>
    </div>

);

export default TopReg