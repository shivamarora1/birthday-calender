export default function Day({ date }: { date: Date }) {
  const events = [
    "Events",
    "Event-1",
    "Events-2",
    "Event-3",
    "Events-4",
    "Event-5",
  ];
  const day = date.getDate();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const dayName = date.toLocaleDateString("en", { weekday: "long" });
  return (
    <>
      <div
        className={`block border-l border-b border-gray-600 w-48 h-44 text-center 
        ${day <= 7 ? "border-t" : ""} 
        ${day % 7 == 0 ? "border-r" : ""} 
        ${day == lastDay ? "border-r" : ""}
        ${day == 1 ? "rounded-tl-lg" : ""}
        ${day == 7 ? "rounded-tr-lg" : ""}
        ${day == 28 ? "rounded-br-lg" : ""}
        ${(lastDay == 28 && day == 22) || day == 29 ? "rounded-bl-lg" : ""}
        ${day == lastDay ? "rounded-br-lg" : ""}`}
      >
        <div className="text-xs">{dayName}</div>
        <div className="text-sm font-medium">{day}</div>
        <div className="text-sm mt-1 mb-1 ml-2">
          {events.map((event, idx) => (
            <div
              key={idx}
              className={`mb-0.5 rounded-l 
              bg-gray-${Math.max(400 - idx * 100, 100)} 
              ${idx > 0 ? "text-black" : "text-white"}`}
            >
              event
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
