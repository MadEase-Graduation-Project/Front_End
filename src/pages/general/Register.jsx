import reg from '../../assets/images/reg.png';
import final_logo from '../../assets/images/final_logo.svg'
import TopReg from '../../components/nosaComps/register/TopReg';
import Body from '../../components/nosaComps/register/Body';
import React, { useState } from 'react';
import BottomBtns from '../../components/nosaComps/register/BottomBtns';
import DividerText from '../../components/nosaComps/register/DividerText';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Register = () => {
    const [action, setAction] = useState("Log In");
    return (
        <div className="w-full min-h-screen relative flex items-center justify-center md:justify-end">
            <img
                src={reg}
                className='absolute top-0 left-0 w-full h-[100vh] object-cover'
            />
            <div className='hidden md:block absolute bottom-[110px] left-[20px] md:left-[50px] text-left '>
                <p className='font-gabri font-semibold text-4xl lg:text-5xl text-white'>Care with ease,
                    <br />
                    Health with peace.
                </p>
            </div>
            <div className="absolute  w-[90%] sm:w-3/4 md:w-1/2 h-auto md:h-full flex justify-center items-center p-5">
                <div className='w-full h-full bg-white/60 rounded-[40px] flex flex-col justify-start items-center gap-[15px] 
                shadow-[6px_6px_12px_6px_rgba(0,0,0,0.25)] p-5'
                >
                    <img
                        src={final_logo}
                        className='w-[160px] md:w-[186px] h-auto'
                    />
                    <div className='w-3/4 h-auto flex flex-col justify-start gap-[5px]'>
                        <TopReg
                            state={action}
                            setState={setAction}
                        />
                        <Body state={action} />
                        <DividerText state={action} />
                        <BottomBtns />

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register
//justify>>with the axis of the flex
//items>>with the normal to the flex