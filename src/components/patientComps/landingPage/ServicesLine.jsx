import { TbClock24 } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { PiBookmarkBold } from "react-icons/pi";

const ServicesLine = () => {
    return (
        <div className='flex w-full max-w-[100vw] h-20 sm:h-28 md:h-40 lg:h-52 bg-menavy
                        items-center justify-between px-5 xs:px-12 sm:px-20 md:px-32 lg:px-40 xl:px-52'>
            <div className='flex flex-col  md:gap-5 items-center justify-center'>
                <TbClock24 className='text-white text-md md:text-3xl lg:text-5xl xl:text-6xl' />
                <p className='text-white font-jost font-normal text-[8px] sm:text-xs md:text-lg lg:text-xl xl:text-2xl'>
                    24'hrs Service
                </p>
            </div>
            <div className='flex flex-col md:gap-5 items-center justify-center'>
                <BsRobot className='text-white text-md md:text-3xl lg:text-5xl xl:text-6xl' />
                <p className='text-white font-jost md:font-normal text-[8px] sm:text-xs md:text-lg lg:text-xl xl:text-2xl'>
                    AI-Powered
                </p>
            </div>
            <div className='flex flex-col md:gap-5 items-center justify-center'>
                <PiBookmarkBold className='text-white text-md md:text-3xl lg:text-5xl xl:text-6xl' />
                <p className='text-white font-jost font-normal text-[8px] sm:text-xs md:text-lg lg:text-xl xl:text-2xl'>
                    Book in a Tap
                </p>
            </div>
        </div>

    );
}


export default ServicesLine