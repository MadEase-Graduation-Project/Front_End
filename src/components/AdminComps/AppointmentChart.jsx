import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2400, 2210, 0, 2000, 2181, 2500, 2100];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function AppointmentChart() {
  return (
    <div className="bg-white rounded p-2">
      <LineChart
        height={300}
        series={[
          {
            data: uData,

            area: true,
            stack: "total",
            showMark: false,
          },
          {
            data: pData,

            area: true,
            stack: "total",
            showMark: false,
          },
          {
            data: amtData,

            area: true,
            stack: "total",
            showMark: false,
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: "none",
          },
        }}
      />
    </div>
  );
}
