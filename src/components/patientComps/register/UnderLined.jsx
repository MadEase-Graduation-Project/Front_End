import { Link } from "react-router-dom";

const UnderLined = ({ text,link }) => (
    <Link to={link}
        className='text-mepale font-jost font-light text-xs md:text-sm lg:text-base decoration-auto cursor-pointer 
        hover:underline hover:decoration-[1px] hover:underline-offset-4 whitespace-nowrap'
    >
        {text}
    </Link>
);
export default UnderLined