import { RiPencilFill } from "react-icons/ri";

export default function HabitDetail({ onModalOpen }) {
  return (
    <div className="flex justify-between py-2 px-4 border-b border-[#4a4a4a]">
      <p className="text-white">Drawing</p>
      <button
        type="button"
        className="flex items-center  ml-auto pl-2 outline-none cursor-pointer group"
        onClick={onModalOpen}
      >
        <RiPencilFill className="text-white group-hover:text-[#7B7C7C]" />
      </button>
    </div>
  );
}
