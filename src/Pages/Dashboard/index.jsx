import { useState } from "react";

import ControlPanel from "./components/ControlPanel";
import DisplayPanel from "./components/DisplayPanel";
import HabitModal from "./createHabit/HabitModal";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full w-full flex bg-[#171717]">
        {/* Left Section */}
        <ControlPanel onOpenModal={() => setIsModalOpen(true)} />
        {/* Right Section */}
        <DisplayPanel />
        {/* Habit Creation Modal */}
        <HabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
