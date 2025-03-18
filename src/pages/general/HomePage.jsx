
import { useState, useEffect } from 'react';
import NavBar from '../../components/nosaComps/NavBar';
import about from '../../assets/images/about.png'
import hero from '../../assets/images/hero2.png'

const HomePage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [state, setState] = useState('register');
    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setScrolled(true)
                : setScrolled(false)
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);
    return (
        <div className='flex flex-col relative w-full min-h-screen bg-meoff gap-[20px]'>
            <NavBar
                scrolled={scrolled}
                state={state}
            />
            <div className='flex flex-col w-full border border-red-500 mt-[60px] gap-[80px] items-center'>

                <div className='relative w-full'>
                    <img className='w-full h-auto'
                        src={hero}
                    />
                    <div className='absolute bottom-5 left-5'>
                        <p className='font-gabri font-semibold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white'>Care with ease,
                            <br />
                            Health with peace.
                        </p>
                        <br />
                        <p className='hidden xs:block font-gabri font-light text-xs sm:text-sm md:text-base lg:text-xl leading-[1] sm:leading-[1.2] md:leading-[1.4] text-white'>
                            Where advanced technology meets compassionate care—connect with doctors, access expert advice,
                            {/* <span className="block sm:inline md:block">and get instant support from our self-aid chatbot.</span> */}
                            <br />
                            and get instant support from our self-aid chatbot.
                        </p>
                    </div>
                </div>

                <div className="flex w-4/5 border border-red-800 justify-center items-center gap-10 sm:gap-16 md:gap-24 lg:gap-32"> {/* Just to enable scrolling */}
                    <img className='w-[120px] sm:w-[250px] md:w-[350px] lg:w-[400px] h-auto rounded-[10px]'
                        src={about}
                    />
                    <div className='flex flex-col gap-1 md:gap-4'>
                        <p className='font-jost font-bold text-xs sm:text-base md:text-xl lg:text-3xl text-menavy'>
                            Welcome to MedEase– The Future of Hospital Connectivity
                        </p>
                        <p className='font-jost text-[8px] sm:text-xs md:text-base lg:text-lg text-menavy'>
                            Our team of dedicated doctors provides a supervised healthcare system
                            with continuous consultations and 24/7 access to expert advice.
                            From real-time doctor connections to always-available medical insights,
                            we ensure you and your loved ones get the care you need, anytime.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage