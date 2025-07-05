import { readTime } from "@/utils/stringUtils";
import { Calendar, Clock, Heart, Frown } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDateUtils";

export default function AdviceCard({
  advice,
  selectedCategory,
  link,
  handleLike,
  handleDisLike,
}) {
  return (
    <div
      key={advice._id}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col transition-transform hover:shadow-2xl hover:-translate-y-1 duration-200"
    >
      <img
        className="h-48 w-full object-cover"
        src={advice.ImgUrl}
        alt={advice.title || "Medical article"}
      />
      <div className="py-4 px-7 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          <Link
            to={`${link}`}
            className="block mt-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {advice.title || "Untitled Article"}
          </Link>
          <p
            className="mt-3 text-base text-gray-500 line-clamp-3"
            style={{
              minHeight: "72px",
              maxHeight: "72px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {advice.description || "No description available."}
          </p>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full border-2 border-blue-100"
              src={
                "https://res.cloudinary.com/dweffiohi/image/upload/v1745583748/wn6wqxmsalbweclrngrn.jpg"
              }
              alt={"Doctor"}
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">
              {advice.doctorName || "Unknown Doctor"}
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar size={12} />
              <time dateTime={advice.createdAt}>
                {formatDate(advice.createdAt)}
              </time>
              <span aria-hidden="true">&middot;</span>
              <Clock size={12} />
              <span>
                {advice.description ? readTime(advice.description) : 3} min read
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between gap-5">
            <button
              onClick={() => {
                handleLike(advice._id);
              }}
              className="flex items-center px-2 py-1 rounded-full hover:bg-pink-50 transition group"
            >
              <Heart className="h-5 w-5 mr-1 text-pink-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700">
                {advice.likesCount || 0}
              </span>
            </button>
            <button
              onClick={() => {
                handleDisLike(advice._id);
              }}
              className="flex items-center px-2 py-1 rounded-full hover:bg-yellow-50 transition group"
            >
              <Frown className="h-5 w-5 mr-1 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700">
                {advice.dislikesCount || 0}
              </span>
            </button>
          </div>
          {selectedCategory === "All Categories" && (
            <div className="flex items-center font-semibold text-blue-500">
              #{advice.diseasesCategoryName || "unKnown"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
