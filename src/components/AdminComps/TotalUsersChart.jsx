import { PieChart } from "@mui/x-charts/PieChart";

export default function TotalUsersChart() {
  const desktopOS = [
    {
      label: "Windows",
      value: 72.72,
    },
    {
      label: "OS X",
      value: 16.38,
    },
    {
      label: "Linux",
      value: 3.83,
    },
    {
      label: "Chrome OS",
      value: 2.42,
    },
    {
      label: "Other",
      value: 4.65,
    },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white rounded-lg p-2">
      <PieChart
        series={[
          {
            data: desktopOS,
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 5,
            highlightScope: { fade: "global", highlight: "item" },
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        height={200}
      />
      <p className="text-sm text-gray-500">Total Users</p>
    </div>
  );
}
