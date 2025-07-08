import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Card({ title, value, period, children, to }) {
  return (
    <div className="h-full flex flex-col justify-between gap-3 p-5 bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] hover:border-gray-300 group">
      <Link
        to={to}
        className="flex items-center justify-between w-full group-hover:scale-[1.02] transition-transform duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
            {children}
          </div>
          <h3 className="text-gray-600 group-hover:text-gray-900 font-medium transition-colors duration-200">
            {title}
          </h3>
        </div>
        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
      </Link>

      <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

      <div className="flex justify-between items-end">
        <div className="text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </div>
        <p className="text-sm text-gray-500 font-medium">{period}</p>
      </div>
    </div>
  );
}
