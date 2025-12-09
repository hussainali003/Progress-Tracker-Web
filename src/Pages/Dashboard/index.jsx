import { useState } from "react";

import HabitModal from "./createHabit/HabitModal";
import ControlPanel from "./sections/ControlPanel";
import DisplayPanel from "./sections/DisplayPanel";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full w-full flex bg-[#171717]">
      {/* Left Section */}
      <ControlPanel onOpenModal={() => setIsModalOpen(true)} />
      {/* Right Section */}
      <DisplayPanel onOpenModal={() => setIsModalOpen(true)} />
      {/* Habit Creation Modal */}
      <HabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
