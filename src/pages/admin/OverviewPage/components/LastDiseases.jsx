import { fetchAllDiseases } from "@/store/slices/diseaseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { FaVirus } from "react-icons/fa";
import { description } from "@/utils/stringUtils";

export default function LastDiseases() {
  const dispatch = useDispatch();
  const { items: diseases, loading } = useSelector((state) => state.diseases);

  useEffect(() => {
    dispatch(fetchAllDiseases());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 bg-white p-3 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Recent Diseases</h2>
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Recent Diseases</h2>

      {diseases.length === 0 ? (
        <p className="text-gray-500 italic">No diseases found</p>
      ) : (
        <>
          {diseases.slice(0, 5).map((disease) => (
            <div
              key={disease._id}
              className="flex gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 text-orange-600">
                <FaVirus size={18} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-medium">{disease.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {disease.description ? description(disease.description) : ""}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
