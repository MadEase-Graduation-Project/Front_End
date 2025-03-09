import { ChartBar } from "@/components/AdminComps/ChartBar";
import TotalCards from "@/components/AdminComps/TotalCards";

export default function Overview() {
  return (
    <div className="p-2 flex flex-col gap-4">
      <TotalCards />
      <ChartBar />
    </div>
  );
}
