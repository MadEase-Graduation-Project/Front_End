import reg from '../../assets/images/reg.png';
import final_logo from '../../assets/images/final_logo.svg'
import logo_M from '../../assets/images/logoMin.svg'
import TopReg from '../../components/patientComps/register/TopReg';
import Body from '../../components/patientComps/register/Body';
import BottomBtns from '../../components/patientComps/register/BottomBtns';
import DividerText from '../../components/patientComps/register/DividerText';
import TextTitle from '../../components/patientComps/TextTitle';
import Input from '../../components/patientComps/register/Input';
import HalfBodySign from '../../components/patientComps/register/HalfBodyLogin';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const SignUpPage = () => {
    return (
        <div className="w-full min-h-screen relative flex items-center justify-center md:justify-end">
            <img
                src={reg}
                className='absolute top-0 left-0 w-full h-[100vh] object-cover'
            />
            <div className='hidden md:block absolute bottom-[110px] left-[20px] md:left-[50px] text-left '>
                <p className='font-jost font-semibold text-4xl lg:text-5xl text-white'>Care with ease,
                    <br />
                    Health with peace.
                </p>
            </div>
            <div className="absolute  w-[90%] sm:w-3/4 md:w-1/2 h-auto md:h-full flex justify-center items-center p-5">
                <div className='w-full h-full bg-white/60 rounded-[40px] flex flex-col justify-center items-center gap-[15px] 
                shadow-[6px_6px_12px_6px_rgba(0,0,0,0.25)] p-5'
                >
                    <img
                        src={final_logo}
                        className='hidden sm:block sm:w-[140px] md:w-[150px] lg:w-[180px] h-auto'
                    />
                    <img
                        src={logo_M}
                        className='block sm:hidden w-[50px] h-auto'
                    />
                    <div className='w-3/4 h-auto flex flex-col justify-start gap-[5px]'>
                        <TopReg
                            regtitle={"Create an account"}
                            regnote={"already have one?"}
                            reg={"Log in"}
                            dest={"/login"}
                        />
                        <div className='flex gap-[12px] '>
                            <div className='flex flex-col w-1/2 gap-[5px]'>
                                <TextTitle text="First name" />
                                <Input />
                            </div>
                            <div className='flex flex-col w-1/2 gap-[5px]'>
                                <TextTitle text="Second name" />
                                <Input />
                            </div>
                        </div>
                        <Body />
                        <HalfBodySign />
                        <DividerText reg={"or login with"} />
                        <BottomBtns />

                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignUpPage
//justify>>with the axis of the flex
//items>>with the normal to the flex