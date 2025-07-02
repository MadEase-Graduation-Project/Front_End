import { readTime } from "@/utils/stringUtils";
import { Calendar, Clock, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDateUtils";

export default function AdviceCard({
  advice,
  selectedCategory,
  link,
  handleLike,
  handleDislike,
}) {
  return (
    <div
      key={advice._id}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform hover:shadow-lg"
    >
      <img
        className="h-48 w-full object-cover"
        src={advice.ImgUrl}
        alt={advice.title || "Medical article"}
      />
      <div className="py-3 px-6 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {/* <p className="text-sm font-medium text-blue-600">
                        {advice.diseasesCategoryName || "Health"}
                      </p> */}
          <Link
            to={`${link}`}
            className="block mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {advice.title || "Untitled Article"}
          </Link>
          <p
            className="mt-3 text-base text-gray-500 line-clamp-3"
            style={{
              minHeight: "72px", // 3 lines * 24px line-height (adjust as needed)
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
            {/* //todo: add doctor image from private components */}
            <img
              className="h-10 w-10 rounded-full"
              src={
                "https://res.cloudinary.com/dweffiohi/image/upload/v1745583748/wn6wqxmsalbweclrngrn.jpg"
              }
              alt={"Doctor"}
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
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

        <div className="mt-4 flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between gap-5">
            {/* //todo: add like and dislike actions */}
            <button
              onClick={() => {
                handleLike(advice._id);
              }}
              className="flex items-center"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{advice.likesCount}</span>
            </button>
            <button
              onClick={() => {
                handleDislike(advice._id);
              }}
              className="flex items-end"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{advice.dislikesCount}</span>
            </button>
          </div>
          {selectedCategory === "All Categories" && (
            <div className="flex items-center">
              #{advice.diseasesCategoryName || "unKnown"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
