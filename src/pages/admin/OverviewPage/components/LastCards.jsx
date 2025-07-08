import Card from "@/components/shared/Card";
import { FaVirus, FaLightbulb } from "react-icons/fa";

import {
  selectAdviceCount,
  selectAdvicesLoading,
  selectAdvicesError,
  selectTotalDiseases,
  selectDiseasesLoading,
  selectDiseasesError,
} from "@/store/selectors";
import { useSelector } from "react-redux";

export default function LastCards() {
  const loading = () => {
    return (
      <div className="flex items-center justify-center h-9">
        <div className="animate-pulse bg-gray-300 rounded h-2 w-20"></div>
      </div>
    );
  };

  const totalDiseases = useSelector(selectTotalDiseases);
  const loadingDiseases = useSelector(selectDiseasesLoading);
  const errorDiseases = useSelector(selectDiseasesError);

  const totalAdvices = useSelector(selectAdviceCount);
  const loadingAdvices = useSelector(selectAdvicesLoading);
  const errorAdvices = useSelector(selectAdvicesError);

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 auto-rows-fr">
        <Card
          to={"/admin/diseases"}
          title="Total Diseases"
          value={loadingDiseases ? loading() : totalDiseases || 0}
          period="Medical Data"
        >
          <FaVirus className="text-xl text-orange-500" />
        </Card>
        <Card
          to={"/admin/advices"}
          title="Total Advices"
          value={loadingAdvices ? loading() : totalAdvices || 0}
          period="Medical Data"
        >
          <FaLightbulb className="text-xl text-purple-500" />
        </Card>
      </div>
    </div>
  );
}
