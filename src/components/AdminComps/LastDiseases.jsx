import { fetchAllDiseases } from "@/store/Slices/Diseases";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { FaVirus } from "react-icons/fa";

export default function LastDiseases() {
  const dispatch = useDispatch();
  const { items: diseases, loading } = useSelector((state) => state.diseases);
  const [maxItems, setMaxItems] = useState(5);

  useEffect(() => {
    dispatch(fetchAllDiseases());
  }, [dispatch]);

  const handleShowMore = () => {
    setMaxItems((prev) => (prev === 5 ? diseases.length : 5));
  };

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
          {diseases.slice(0, maxItems).map((disease) => (
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
                  {disease.description}
                </p>
              </div>
            </div>
          ))}

          {diseases.length > 5 && (
            <button
              onClick={handleShowMore}
              className="self-center mt-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
            >
              {maxItems === 5 ? "Show All" : "Show Less"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
