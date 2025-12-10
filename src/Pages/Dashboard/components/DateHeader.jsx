export default function DateHeader() {
  const today = new Date();

  const getDayLabel = (offset) => {
    const date = new Date();
    date.setDate(today.getDate() - offset);

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();

    return { dayName, dayNumber };
  };

  const days = [
    { label: "Today", offset: 0 },
    { label: "Yesterday", offset: 1 },
    { label: "-1 Day", offset: 2 },
    { label: "-2 Days", offset: 3 },
  ];

  return (
    <div className="flex py-2 px-4">
      <div className="flex-1"></div>
      <div className="flex flex-1 gap-4 justify-end">
        {days.map((item) => {
          const { dayName, dayNumber } = getDayLabel(item.offset);
          return (
            <div key={item.offset} className="flex flex-col items-center justify-center gap-1">
              <p className="text-xs text-[#7b7c7c]">{dayName}</p>
              <p className="text-xs text-[#7b7c7c]">{dayNumber}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
