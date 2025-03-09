import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export default function Card({ title, value, pillText, trend, period }) {
  return (
    <div className="h-full flex flex-col justify-between gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 mb-2 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-full ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
          {pillText}
        </span>
      </div>
      <p className="text-xs text-gray-500">{period}</p>
    </div>
  );
}
