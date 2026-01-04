import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getHabitDetail, getUserHabits, updateHabitCompletedDates } from "../../api/habit";

import useHabitStore from "../../store/habitStore";

import AverageHabitTimeChart from "./charts/AverageHabitTimeChart";
import HabitYearChart from "./charts/HabitYearChart";
import WeeklyHabitChart from "./charts/WeeklyHabitChart";

import Calendar from "./components/Calendar";
import Card from "./components/Card";
import HabitLeaderboard from "./components/HabitLeaderboard";
import HabitUpdateCompletedDateModal from "./components/HabitUpdateCompletedDateModal";
import Header from "./components/Header";
import HabitDetailModal from "./components/modal";

export default function HabitDetail() {
  const { habitId } = useParams();

  const habit = useHabitStore((state) => state.habit);
  const setHabit = useHabitStore((state) => state.setHabit);

  const [userHabits, setUserHabits] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHabitUpdateCompletedDateModalOpen, setIsHabitUpdateCompletedDateModalOpen] =
    useState(false);

  useEffect(() => {
    const loadHabitDetail = async () => {
      try {
        setIsLoading(true);
        const habitDetail = await getHabitDetail({ habitId });

        setHabit(habitDetail);
        setSelectedDates(habitDetail.completedDates?.map((date) => new Date(date)));
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadHabitDetail();
  }, [habitId]);

  useEffect(() => {
    const loadUserHabits = async () => {
      try {
        const userHabits = await getUserHabits({ habitId });

        setUserHabits(userHabits);
      } catch (error) {
        console.log(error.message);
      }
    };

    loadUserHabits();
  }, [habitId]);

  const handleUpdateCompletedDates = async () => {
    try {
      setIsLoading(true);

      const habitDetail = await updateHabitCompletedDates({
        habitId,
        completedDates: selectedDates.map((date) => DateTime.fromJSDate(date).toISODate()),
      });

      const userHabits = await getUserHabits({ habitId });

      setUserHabits(userHabits);

      setHabit(habitDetail);
      setSelectedDates(habitDetail.completedDates?.map((date) => new Date(date)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsHabitUpdateCompletedDateModalOpen(false);
    }
  };

  return (
    <div className="h-full w-full flex bg-[#171717] p-12">
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : habit ? (
        <div className="h-full w-full flex flex-col border border-[#4a4a4a] rounded-md">
          <Header
            habitName={habit.name}
            habitColor={habit.color}
            onModalOpen={() => setIsModalOpen(true)}
          />
          <div className="flex-1 grid grid-rows-7 grid-cols-10 min-h-0 min-w-0 gap-4 p-4">
            <Card title="Current Streak" value={habit.stats.currentStreak} />
            <Card title="Longest Streak" value={habit.stats.longestStreak} />
            <Card title="Completed Days" value={habit.stats.totalCompletedDays} />
            <div className="row-span-4 col-span-4 px-3 pt-3 rounded bg-[#323232] min-h-0 flex flex-col">
              <HabitLeaderboard userHabits={userHabits} />
            </div>
            <div className="row-span-3 col-span-6 rounded px-3 pt-3 bg-[#323232]">
              <AverageHabitTimeChart data={habit.minutes_spent} />
            </div>
            <div className="row-span-3 col-span-5 rounded px-3 pt-3 bg-[#323232]">
              <WeeklyHabitChart />
            </div>
            <div className="row-span-3 col-span-3 flex flex-1 flex-col px-2 rounded bg-[#323232]">
              <Calendar selectedDates={selectedDates} setSeletedDates={setSelectedDates} />
              <button
                type="button"
                onClick={() => setIsHabitUpdateCompletedDateModalOpen(true)}
                className="mb-3 mt-auto py-1 rounded cursor-pointer bg-blue-500"
              >
                <p className="font-medium text-sm text-center text-white">Update</p>
              </button>
            </div>
            <div className="row-span-3 col-span-2 rounded bg-[#323232]">
              <HabitYearChart totalCompletedDays={habit.stats.totalCompletedDays} />
            </div>
          </div>
          <HabitDetailModal
            habitId={habit.id}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <HabitUpdateCompletedDateModal
            onUpdateCompletedDates={handleUpdateCompletedDates}
            isHabitUpdateCompletedDateModalOpen={isHabitUpdateCompletedDateModalOpen}
            onHabitUpdateCompletedDateModalClose={() =>
              setIsHabitUpdateCompletedDateModalOpen(false)
            }
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="font-medium text-lg text-center text-red-500">
            {isError}
            <br />
            Please try again later
          </div>
        </div>
      )}
    </div>
  );
}
