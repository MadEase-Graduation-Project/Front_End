import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressBar() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4">
      <Progress value={value} className=" opacity-30" />
    </div>
  );
}
