import { FaCheck } from "react-icons/fa";

export default function TickButton({ checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-4 h-4 flex items-center justify-center rounded border transition-all duration-200
        ${
          checked
            ? "bg-[#4a4a4a] border-[#4a4a4a] text-white"
            : "border-neutral-600 text-transparent hover:border-white"
        }
      `}
    >
      <FaCheck size={10} />
    </button>
  );
}
