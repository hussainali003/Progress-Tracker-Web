const HABITRANKDATA = [
  {
    id: 1,
    name: "Drawing",
    totalCompleteDays: 200,
  },
  {
    id: 2,
    name: "Drawing",
    totalCompleteDays: 200,
  },
  {
    id: 3,
    name: "Drawing",
    totalCompleteDays: 200,
  },
  {
    id: 4,
    name: "Drawing",
    totalCompleteDays: 200,
  },
  {
    id: 5,
    name: "Drawing",
    totalCompleteDays: 200,
  },
  {
    id: 6,
    name: "Drawing",
    totalCompleteDays: 200,
  },
];

export default function HabitLeaderboard() {
  return (
    <>
      {/* TITLE */}
      <p className="mb-4 font-medium text-lg text-white">Leaderboard</p>

      {/* TABLE HEADER */}
      <div className="flex pl-3 pr-[22px] py-4 rounded-t-2xl text-white border border-[#4a4a4a]">
        <p className="flex-1 font-medium text-center text-sm">RANK</p>
        <p className="flex-3 font-medium text-center text-sm">HABIT</p>
        <p className="flex-1 font-medium text-center text-sm">DAYS</p>
      </div>

      {/* 🔥 SCROLL AREA */}
      <div
        className="flex-1 min-h-0 text-white overflow-y-auto border-x border-[#4a4a4a]
              scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-500"
        style={{ scrollbarGutter: "stable" }}
      >
        {HABITRANKDATA.map((habit, index) => (
          <div
            key={habit.id}
            className={`flex px-3 py-4 ${
              index !== HABITRANKDATA.length - 1 ? "border-b border-[#4a4a4a]" : ""
            }`}
          >
            <p className="flex-1 font-medium text-center text-sm">{habit.id}</p>
            <p className="flex-3 font-medium text-center text-sm">{habit.name}</p>
            <p className="flex-1 font-medium text-center text-sm">{habit.totalCompleteDays}</p>
          </div>
        ))}
      </div>
    </>
  );
}
