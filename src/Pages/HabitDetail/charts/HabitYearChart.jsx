import { Cell, Legend, Pie, PieChart } from "recharts";

export default function HabitYearChart({ totalCompletedDays }) {
  const totalDaysInYear = 365;
  const remainingDays = totalDaysInYear - totalCompletedDays;

  const data = [
    { name: "YEAR", value: remainingDays },
    { name: "COMPLETED HABIT DAYS", value: totalCompletedDays },
  ];

  return (
    <PieChart
      responsive
      style={{ width: "100%", height: "100%", aspectRatio: 1, outline: "none", border: "none" }}
    >
      <Pie
        startAngle={-270}
        endAngle={90}
        data={data}
        stroke="none"
        dataKey="value"
        isAnimationActive={true}
      >
        {data.map((entry, index) => (
          <Cell style={{ outline: "none" }} key={`cell-${entry.name}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Legend iconSize={10} verticalAlign="bottom" />
    </PieChart>
  );
}

const COLORS = ["#D3D3D3", "#107ab0"];
