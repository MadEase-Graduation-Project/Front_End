import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { FaLightbulb } from "react-icons/fa";
import { description } from "@/utils/stringUtils";
import {
  selectAdvicesError,
  selectAdvicesLoading,
  selectAllAdvices,
  selectTotalDiseases,
} from "@/store/selectors";

export default function LastAdvices() {
  const advices = useSelector(selectAllAdvices);
  const loading = useSelector(selectAdvicesLoading);
  const advicesCount = useSelector(selectTotalDiseases);
  const erro = useSelector(selectAdvicesError);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 bg-white p-3 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Recent Advices</h2>
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-white p-4 shadow-lg rounded-lg ">
      <h2 className="text-xl font-semibold mb-2">Recent Advices</h2>

      {advicesCount === 0 ? (
        <p className="text-gray-500 italic">No advices found</p>
      ) : (
        <>
          {advices.slice(0, 5).map((advice) => (
            <div
              key={advice._id}
              className="flex gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                <FaLightbulb size={18} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-medium">
                  {advice.title || "Medical Advice"}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {advice.description ? description(advice.description) : ""}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
