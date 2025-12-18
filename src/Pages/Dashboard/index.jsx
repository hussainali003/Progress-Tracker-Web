import { DateTime } from "luxon";

import { useEffect, useState } from "react";

import { getHabitsWithRecords } from "../../api/habit";

import useHabitStore from "../../store/habitStore";
import HabitModal from "./createHabit/HabitModal";
import ControlPanel from "./sections/ControlPanel";
import DisplayPanel from "./sections/DisplayPanel";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setHabits = useHabitStore((state) => state.setHabits);
  const setIsFetchingHabits = useHabitStore((state) => state.setIsFetchingHabits);

  useEffect(() => {
    const loadHabits = async () => {
      setIsFetchingHabits(true);

      try {
        const habitsFromApi = await getHabitsWithRecords();

        const data = habitsFromApi.map((habit) => ({
          ...habit,
          completedDates: habit.completedDates.map((date) => DateTime.fromISO(date).toISODate()),
        }));

        setHabits(data);
      } catch (error) {
        console.error("Failed to parse response body as JSON:", error);
      } finally {
        setIsFetchingHabits(false);
      }
    };

    loadHabits();
  }, [setHabits, setIsFetchingHabits]);

  return (
    <div className="h-full w-full flex bg-[#171717]">
      <ControlPanel onOpenModal={() => setIsModalOpen(true)} />
      <DisplayPanel onOpenModal={() => setIsModalOpen(true)} />
      <HabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
