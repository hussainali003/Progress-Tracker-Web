import { DateTime } from "luxon";

import { useEffect, useRef, useState } from "react";

import { MdSort } from "react-icons/md";
import { useNavigate } from "react-router";
import { completeHabit, unCompleteHabit } from "../../../api/habitRow";
import useHabitStore from "../../../store/habitStore";
import DateHeader from "./DateHeader";
import TickButton from "./TickButton";

const getDateString = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date;
};

export default function ShowHabits() {
  const dropdownRef = useRef(null);
  const navigation = useNavigate();

  const [open, setOpen] = useState(false);
  const [, setSortBy] = useState({ label: "Ascending", value: "ascending" });

  const habits = useHabitStore((state) => state.habits);
  const setCompleteHabit = useHabitStore((state) => state.setCompleteHabit);
  const setUnCompleteHabit = useHabitStore((state) => state.setUnCompleteHabit);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigateHabit = (habitId) => {
    navigation(`/habit/${habitId}`);
  };

  return (
    <div>
      <header className="flex justify-between py-2 px-4 border-b border-[#4a4a4a]">
        <p className="text-white">Habits</p>
        <div ref={dropdownRef} className="relative w-[8%] flex justify-end">
          <button
            type="button"
            className="ml-auto cursor-pointer group"
            onClick={() => setOpen(!open)}
          >
            <MdSort size={20} className="text-[#7b7c7c] rotate-180 group-hover:text-white" />
          </button>
          {open && (
            <div className="absolute w-full z-50 mt-8 rounded bg-[#464646] shadow-xl">
              {options.map((opt, index) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt);
                    setOpen(false);
                  }}
                  className={`w-full block px-3 py-2 text-start text-white text-xs hover:bg-neutral-700 cursor-pointer 
                  ${index !== options.length - 1 ? "border-b border-neutral-600" : "rounded-b"}
                  ${index === 0 && "rounded-t"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      <DateHeader />
      {habits.map((habit) => {
        const completedDates = habit.completedDates || [];

        const days = [0, 1, 2, 3];

        return (
          <div className="flex justify-between py-2 px-4" key={habit.id}>
            <button
              type="button"
              className="flex flex-1 items-start cursor-pointer group"
              style={{ "--habit-color": `#${habit.color}` }}
              onClick={() => handleNavigateHabit(habit.id)}
            >
              <p className="text-sm text-(--habit-color) group-hover:text-white transition-colors">
                {habit.habit}
              </p>
            </button>

            <div className="flex flex-1 justify-end gap-[22px]">
              {days.map((offset) => {
                const date = getDateString(offset);
                const isChecked = completedDates.includes(DateTime.fromJSDate(date).toISODate());

                const toggleDate = () => {
                  if (isChecked) {
                    console.log(date);
                    // api
                    unCompleteHabit({
                      habitId: habit.id,
                      date: DateTime.fromJSDate(date).toISODate(),
                    });
                    // setter
                    setUnCompleteHabit(habit.id, DateTime.fromJSDate(date).toISODate());
                  } else {
                    // api
                    completeHabit({ habitId: habit.id, date: date });
                    // setter
                    setCompleteHabit(habit.id, DateTime.fromJSDate(date).toISODate());
                  }

                  /* setHabits((prev) =>
                    prev.map((h) => {
                      if (h.id !== habit.id) return h;

                      const newDates = isChecked
                        ? h.completedDates.filter(
                            (d) => d !== DateTime.fromJSDate(date).toISODate(),
                          )
                        : [...(h.completedDates || []), DateTime.fromJSDate(date).toISODate()];

                      return {
                        ...h,
                        completedDates: newDates.slice(-4), // keep only last 4
                      };
                    }),
                  );
                  */
                };

                return <TickButton key={offset} checked={isChecked} onClick={toggleDate} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const options = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];
