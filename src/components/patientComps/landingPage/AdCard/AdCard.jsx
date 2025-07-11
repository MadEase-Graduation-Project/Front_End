import { ArrowUpRight, Clock4, RefreshCw } from "lucide-react";
import clsx from "clsx";

export default function AdCard({
  title,
  description,
  ImgUrl,
  link,
  createdAt,
  updatedAt,
  creatorName,
  className = "",
}) {
  const fmt = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <article
      className={clsx(
        "w-full h-[440px] flex flex-col overflow-hidden rounded-2xl shadow-lg bg-white",
        className
      )}
    >
      {/* Image section */}
      <figure className="h-[170px]">
        <img
          src={ImgUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </figure>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-2 flex-grow">
        <h3 className="text-base sm:text-lg font-bold text-menavy line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 leading-snug line-clamp-3">
          {description}
        </p>

        <div className="flex flex-col gap-1 text-xs text-gray-500 mt-auto">
          {/* Creator Name */}
          {creatorName && (
            <p className="text-xs text-meblue3 italic">By {creatorName}</p>
          )}
          <span className="flex items-center gap-1">
            <Clock4 className="w-4 h-4" />
            Created: {fmt(createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <RefreshCw className="w-4 h-4" />
            Updated: {fmt(updatedAt)}
          </span>
        </div>

        {/* Learn More button (always visible, disabled if no link) */}
        <span
          className={clsx(
            "mt-1 inline-flex items-center gap-1 font-semibold underline underline-offset-4 transition-colors",
            link
              ? "text-mepale hover:text-menavy cursor-pointer"
              : "text-gray-300 cursor-not-allowed pointer-events-none"
          )}
        >
          Learn more
          <ArrowUpRight size={18} />
        </span>
      </div>
    </article>
  );
}
