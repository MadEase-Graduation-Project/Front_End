import final_logo from '../../assets/images/final_logo.svg'
import { Link } from "react-router-dom"
import hambmenu from '../../assets/images/hambmenu.svg'
import vector from '../../assets/images/Vector.svg'


const NavBar = ({ scrolled, state }) => (

    <nav className={`w-full h-[45px] md:h-[60px] bg-mewhite p-2 fixed top-0 left-0 z-50
        transition-all duration-200 shadow-md ${scrolled ? 'shadow-2xl' : ''}`}>
        <div className='flex items-center h-full w-full gap-[300px]'>
            <img
                src={final_logo}
                className='w-[60px] md:w-[80px] h-auto ml-5'
            />

            {state === 'register' ?
                <div className='ml-auto flex items-center mr-1'>
                    <Link to='/register'
                        className='w-[70px] md:w-[100px] h-[25px] md:h-[35px] rounded-[10px] inline-flex justify-center items-center 
                      gap-2 mr-5 bg-menavy hover:bg-menavy/90 hover:brightness-110 transition-all duration-250'
                    >
                        <div className='text-center flex flex-col justify-center text-white text-[12px] md:text-[18px] font-normal font-jost'>
                            Register
                        </div>
                    </Link>
                </div>
                :
                <div className='flex gap-[150px] items-center'>
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