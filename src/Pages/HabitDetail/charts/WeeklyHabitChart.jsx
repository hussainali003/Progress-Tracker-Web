import { Bar, BarChart, XAxis, YAxis } from "recharts";

// #region Sample data
const data = [
  {
    name: "Mon",
    uv: 1,
  },
  {
    name: "Tue",
    uv: 0,
  },
  {
    name: "Wed",
    uv: 1,
  },
  {
    name: "Thu",
    uv: 1,
  },
  {
    name: "Fri",
    uv: 1,
  },
  {
    name: "Sat",
    uv: 0,
  },
  {
    name: "Sun",
    uv: 0,
  },
];

// #endregion
export default function TinyBarChart() {
  return (
    <BarChart
      responsive
      data={data}
      barSize={36}
      style={{ width: "100%", height: "100%", aspectRatio: 1 }}
    >
      <XAxis dataKey="name" />
      <YAxis dataKey="uv" width={"auto"} ticks={[0, 1]} domain={[0, 1]} orientation="right" />
      <Bar dataKey="uv" fill="#FFFFFF" radius={[4, 4, 0, 0]} />
    </BarChart>
  );
}
