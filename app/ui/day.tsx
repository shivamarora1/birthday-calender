"use client";
import { useState } from "react";
import { showModalFxn } from "@/app/ui/month";
export default function Day({
  date,
  eventsParam = [],
  showModal,
}: {
  date: Date;
  eventsParam: String[];
  showModal: showModalFxn;
}) {

  const [events, setEvents] = useState(eventsParam);
  const addNewEvent = (event: string) => {
    const existingEvents = [...events];
    existingEvents.push(event);
    setEvents(existingEvents);
  };

  const showAddNewEventDialog = () => {
    addNewEvent("event @ " + date.toDateString());
  };

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
        onClick={showModal}
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
          {events.map((event, idx) => {
            // tailwind does not support string interpolation
            let bgColorClass = "bg-gray-400";
            switch (idx) {
              case 0:
                bgColorClass = "bg-gray-400";
                break;
              case 1:
                bgColorClass = "bg-gray-300";
                break;
              case 2:
                bgColorClass = "bg-gray-200";
                break;
              default:
                bgColorClass = "bg-gray-100";
                break;
            }
            // end of ugly switch case conditions.

            const textColorClass = idx > 0 ? "text-black" : "text-white";
            return (
              <div
                key={idx}
                className={`mb-0.5 rounded-l ${bgColorClass} ${textColorClass}`}
              >
                {event}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
