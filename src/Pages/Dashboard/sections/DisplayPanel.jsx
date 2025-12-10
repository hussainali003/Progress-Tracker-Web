import { useState } from "react";
import NoHabits from "../components/NoHabits";
import ShowHabits from "../components/ShowHabits";

export default function DisplayPanel({ onOpenModal }) {
  const [habits, setHabits] = useState([
    { id: 1, color: "FF5733", name: "Morning Jog adasdas dasdas dasdasd " },
    { id: 2, color: "33FF57", name: "Read a Book" },
    { id: 3, color: "3357FF", name: "Meditation" },
  ]);

  return (
    <div className="h-full flex-5 pt-12">
      <div className="h-full flex flex-col border border-r-0 border-b-0 border-[#4a4a4a] rounded-tl-md">
        <div className="flex-1">
          {habits.length === 0 ? (
            <NoHabits onOpenModal={onOpenModal} />
          ) : (
            <ShowHabits habits={habits} setHabits={setHabits} />
          )}
        </div>
        <footer className="flex border-t border-[#4a4a4a]">
          <button type="button" className="p-2 cursor-pointer group" onClick={onOpenModal}>
            <p className="text-sm text-[#3662CC] group-hover:text-white">+ Add Habit</p>
          </button>
        </footer>
      </div>
    </div>
  );
}
