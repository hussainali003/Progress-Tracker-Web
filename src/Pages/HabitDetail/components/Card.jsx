export default function Card({ children, title, value }) {
  return (
    <div className="row-span-1 col-span-2 p-3 rounded bg-[#323232]">
      <div className="items-center gap-2">
        {children}
        <p className="text-lg text-white">{title}</p>
      </div>
      <p className="text-xl text-white">{value}</p>
    </div>
  );
}
