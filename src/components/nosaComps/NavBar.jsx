import final_logo from '../../assets/images/final_logo.svg'
import { Link } from "react-router-dom"


const NavBar = ({ scrolled, state }) => (
    <nav className={`w-full h-[45px] md:h-[60px] bg-mewhite p-2 fixed top-0 left-0 z-50
        transition-all duration-200 ${scrolled ? 'shadow-md' : ''}`}>
        <div className='flex items-center h-full w-full'>
            <img
                src={final_logo}
                className='w-[60px] md:w-[80px] h-auto ml-5'
            />
            {state === 'register' ?
                <div className='ml-auto flex items-center mr-1'>
                    <button className='w-[70px] md:w-[100px] h-[25px] md:h-[35px] rounded-[10px] outline outline-[2px] outline-mepale inline-flex justify-center items-center 
                gap-2 mr-5 hover:bg-menavyoff transition-all duration-250'
                        onClick={() => alert("btn clicked")} >
                        <div className='text-center flex flex-col justify-center text-mepale text-[12px] md:text-[18px] font-normal font-jost'>
                            Register
                        </div>
                    </button>
                </div>

                : <div></div>}
        </div>
    </nav >
);

export default NavBar