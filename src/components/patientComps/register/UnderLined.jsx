import { Link } from "react-router-dom";

const UnderLined = ({ text, link }) => (
  <Link
    to={link}
    className="relative inline-block group text-mepale font-jost font-light text-xs md:text-sm lg:text-base cursor-pointer whitespace-nowrap"
  >
    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-mepale after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
      {text}
    </span>
  </Link>
);

export default UnderLined;
