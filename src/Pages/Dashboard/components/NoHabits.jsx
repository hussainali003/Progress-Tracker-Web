import { TiArrowRepeatOutline } from "react-icons/ti";
import WritingBoard from "../../../assets/images/writing-board.svg";

export default function NoHabits({ onOpenModal }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <img src={WritingBoard} alt="Empty habits illustration" className="w-32 h-32 opacity-80" />
      <h1 className="text-white">Welcome to Progress Tracker</h1>
      <p className="text-center text-sm text-[#7b7c7c]">
        Start your first habit and watch your progress grow.
        <br />
        It's empty now. Add one to start your journey.
      </p>
      <button
        type="button"
        className="flex item-center py-1 px-2 gap-1 border border-[#4a4a4a] rounded bg-transparent cursor-pointer hover:bg-[#4a4a4a]"
        onClick={onOpenModal}
      >
        <TiArrowRepeatOutline size={16} color="#FFFFFF" />
        <p className="font-medium text-xs text-white">Build New Habit</p>
      </button>
    </div>
  );
}
