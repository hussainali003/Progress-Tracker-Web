import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function AverageHabitTimeChart({ data }) {
  return (
    <LineChart
      tabIndex={-1}
      responsive
      data={data}
      className="recharts-wrapper !focus:outline-none !focus:border-none"
      style={{ width: "100%", height: "100%", aspectRatio: 1, cursor: "pointer" }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <XAxis dataKey="day" tickLine={false} />
      <YAxis width="auto" tickLine={false} />
      <Legend />
      <Line type="monotone" dataKey="Minutes spend per day" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
