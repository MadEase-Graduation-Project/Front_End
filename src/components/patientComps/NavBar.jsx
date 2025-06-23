import final_logo from '../../assets/images/final_logo.svg'
import { Link } from "react-router-dom"
import hambmenu from '../../assets/images/hambmenu.svg'
import vector from '../../assets/images/Vector.svg'


const NavBar = ({ scrolled, state }) => (

    <nav className={` w-full max-w-[100vw] h-[45px] md:h-[60px] bg-mewhite px-8 py-2 fixed top-0 left-0 z-50 
        transition-all duration-200 shadow-md overflow-hidden ${scrolled ? 'shadow-2xl' : ''}`}>
        <div className={`grid grid-cols-12 h-full w-full overflow-hidden ${state === 'login' ? 'gap-[300px]' : ''}`}>
            <img
                src={final_logo}
                className='col-start-1 col-span-4 xs:col-span-2 h-full'
            />

            {state === 'register' ?

                <Link to='/signup'
                    className='self-center col-span-2 xs:col-span-1 col-start-11 xs:col-start-12 w-full h-3/4 rounded-[10px] inline-flex justify-center items-center 
                       bg-menavy hover:bg-menavy/90 hover:brightness-110 transition-all duration-250'
                >
                    <p className=' text-white text-[8px] sm:text-[10px] md:text-[16px] lg:text-[18px] font-light font-jost'>
                        Register
                    </p>
                </Link>

                :
                <div className='flex justify-between items-center'>
                    <p className='font-jost text-base text-mepale font-normal'>Home</p>
                    <p className='font-jost text-base text-menavy font-light'>Location</p>
                    <div className='flex gap-[5px] items-center'>
                        <p className='font-jost text-base text-menavy font-light'>Services</p>
                        <img
                            src={vector}
                        />
                    </div>
                    <p className='font-jost text-base text-menavy font-light'>Inbox</p>
                    <p className='font-jost text-base text-menavy font-light'>Profile</p>
                </div>
            }

        </div>
    </nav >
);

export default NavBar