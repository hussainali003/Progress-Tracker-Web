import { IoIosHome } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";

import { useNavigate } from "react-router";

export default function HabitDetail({ onModalOpen }) {
  const navigation = useNavigate();

  const handleNavigateToDashboard = () => {
    navigation("/dashboard");
  };

  return (
    <div className="flex justify-between py-2 px-4 border-b border-[#4a4a4a]">
      <p className="flex items-center  text-white">Drawing</p>
      <div className="flex items-center gap-1 ml-auto">
        <button
          type="button"
          className="px-2 outline-none cursor-pointer group"
          onClick={onModalOpen}
        >
          <RiPencilFill className="text-white group-hover:text-[#7B7C7C]" />
        </button>
        <button
          type="button"
          className="px-2 outline-none cursor-pointer group"
          onClick={handleNavigateToDashboard}
        >
          <IoIosHome className="text-white group-hover:text-[#7B7C7C]" />
        </button>
      </div>
    </div>
  );
}
