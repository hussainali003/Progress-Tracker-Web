import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import { getHabitsWithRecords } from "../../../api/habit";

import NoHabits from "../components/NoHabits";
import ShowHabits from "../components/ShowHabits";

export default function DisplayPanel({ onOpenModal }) {
  const [habits, setHabits] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const habitsFromApi = await getHabitsWithRecords();

        const data = habitsFromApi.map((habit) => ({
          ...habit,
          completedDates: habit.completedDates.map((date) => DateTime.fromISO(date).toISODate()),
        }));

        setHabits(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="h-full flex-5 pt-12">
      <div className="h-full flex flex-col border border-r-0 border-b-0 border-[#4a4a4a] rounded-tl-md">
        <div className="flex-1">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : habits.length === 0 ? (
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
