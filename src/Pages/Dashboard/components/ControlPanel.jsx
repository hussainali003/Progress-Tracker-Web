export default function ControlPanel({ onOpenModal }) {
  return (
    <div className="h-full flex flex-col flex-1 px-4 py-12">
      <header className="flex items-center mb-6">
        <img src="" alt="logo" />
        <h1 className="text-white text-2xl font-semibold ml-2">Dashboard</h1>
      </header>
      <button
        type="button"
        onClick={onOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        + Create Habit
      </button>
    </div>
  );
}
