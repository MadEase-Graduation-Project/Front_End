import { Link } from "react-router-dom";

export default function Card({ title, value, period, children, to }) {
  return (
    <div className="h-full flex flex-col justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-300  hover:shadow-md hover:translate-y-[-1px] ">
      <Link to={to} className="flex items-center px-2 gap-4 w-fit group ">
        <div className="flex items-center gap-3">
          {children}
          <h3 className="text-gray-500 group-hover:text-gray-950">{title}</h3>
        </div>
        <span className="text-gray-500 group-hover:text-gray-950">{">"}</span>
      </Link>
      <hr className="border-gray-200" />
      <div className="flex justify-between items-center px-2">
        <div className="text-3xl font-semibold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500">{period}</p>
      </div>
    </div>
  );
}
