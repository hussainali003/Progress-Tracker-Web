export default function HabitLeaderboard({ userHabits }) {
  return (
    <>
      {/* TITLE */}
      <p className="mb-4 font-medium text-lg text-white">Leaderboard</p>

      {/* TABLE HEADER */}
      <div className="flex px-3 py-4 text-white rounded-t-2xl border border-[#4a4a4a]">
        <p className="flex-1 font-medium text-center text-sm">RANK</p>
        <p className="flex-3 font-medium text-center text-sm">HABIT</p>
        <p className="flex-1 font-medium text-center text-sm">DAYS</p>
      </div>

      {/* 🔥 SCROLL AREA */}
      <div
        className="flex-1 min-h-0 text-white overflow-y-auto border-x border-[#4a4a4a]
              scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-500"
      >
        {userHabits.map((habit, index) => (
          <div key={habit.id} className={`flex px-3 py-4 border-b border-[#4a4a4a]`}>
            <p className="flex-1 font-medium text-center text-sm">{index + 1}</p>
            <p className="flex-3 font-medium text-center text-sm">{habit.name}</p>
            <p className="flex-1 font-medium text-center text-sm">{habit.totalCompletedDays}</p>
          </div>
        ))}
      </div>
    </>
  );
}
