import useHabitStore from "../../../store/habitStore";

import NoHabits from "../components/NoHabits";
import ShowHabits from "../components/ShowHabits";

export default function DisplayPanel({ onOpenModal }) {
  const habits = useHabitStore((state) => state.habits);
  const isFetchingHabits = useHabitStore((state) => state.isFetchingHabits);
  const isError = useHabitStore((state) => state.isError);

  return (
    <div className="h-full flex-5 pt-12">
      <div className="h-full flex flex-col border border-r-0 border-b-0 border-[#4a4a4a] rounded-tl-md">
        <div className="flex flex-1">
          {isFetchingHabits ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : isError ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="font-medium text-lg text-center text-red-500">
                {isError}
                <br />
                Please try again later
              </div>
            </div>
          ) : habits.length === 0 ? (
            <NoHabits onOpenModal={onOpenModal} />
          ) : (
            <ShowHabits />
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
