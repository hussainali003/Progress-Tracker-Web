import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Mon",
    Time: 4000,
    "Average Time": 2400,
  },
  {
    name: "Tue",
    Time: 3000,
    "Average Time": 1398,
  },
  {
    name: "Wed",
    Time: 2000,
    "Average Time": 9800,
  },
  {
    name: "Thu",
    Time: 2780,
    "Average Time": 3908,
  },
  {
    name: "Fri",
    Time: 1890,
    "Average Time": 4800,
  },
  {
    name: "Sat",
    Time: 2390,
    "Average Time": 3800,
  },
  {
    name: "Sun",
    Time: 3490,
    "Average Time": 4300,
  },
];

export default function AverageHabitTimeChart() {
  return (
    <LineChart responsive data={data} style={{ width: "100%", height: "100%", aspectRatio: 1 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Time" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Average Time" stroke="#82ca9d" />
    </LineChart>
  );
}
