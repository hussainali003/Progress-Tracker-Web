import { DateTime } from "luxon";

import { useEffect, useRef, useState } from "react";

import { MdSort } from "react-icons/md";

import { useNavigate } from "react-router";

import useHabitStore from "../../../store/habitStore";

import DateHeader from "./DateHeader";
import TickButton from "./TickButton";
import UpdateCompleteDateModal from "./UpdateCompleteDateModal";

const getDateString = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date;
};

export default function ShowHabits() {
  const dropdownRef = useRef(null);
  const navigation = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHabitId, setSelectedHabitId] = useState(null);
  const [isDateCheck, setIsDateCheck] = useState(null);

  const [open, setOpen] = useState(false);
  const [, setSortBy] = useState({ label: "Ascending", value: "ascending" });

  const habits = useHabitStore((state) => state.habits);

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
    <div className="flex flex-1 flex-col">
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

                return (
                  <TickButton
                    key={offset}
                    checked={isChecked}
                    onModalOpen={() => {
                      setIsDateCheck(isChecked);
                      setSelectedDate(date);
                      setSelectedHabitId(habit.id);
                      setIsModalOpen(true);
                    }}
                  />
                );
              })}
            </div>
            <UpdateCompleteDateModal
              isDateChecked={isDateCheck}
              date={selectedDate}
              habitId={selectedHabitId}
              isModalOpen={isModalOpen}
              onModalClose={() => setIsModalOpen(false)}
            />
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
