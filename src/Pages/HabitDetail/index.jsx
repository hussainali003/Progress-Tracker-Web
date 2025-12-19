import { useState } from "react";

import Header from "./components/Header";
import HabitDetailModal from "./components/modal";

export default function HabitDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full w-full flex bg-[#171717] p-12">
      <div className="h-full w-full flex flex-col border border-[#4a4a4a] rounded-md">
        <Header onModalOpen={() => setIsModalOpen(true)} />
        <HabitDetailModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
