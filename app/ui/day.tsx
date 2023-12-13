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
        onClick={() => showModal(day, date.getMonth())}
        className={`block border-l border-b border-gray-600 text-center w-44 lg:w-48 h-48 lg:h-44 
        ${day <= 2 ? "border-t" : ""}
        ${day <= 7 ? "lg:border-t" : ""} 
        ${day == lastDay ? "lg:border-r border-r border-b" : ""}
        ${day == 1 ? "lg:rounded-tl-lg" : ""}
        ${day == 7 ? "lg:rounded-tr-lg" : ""}
        ${day == 28 ? "lg:rounded-br-lg" : ""}
        ${day % 2 == 0 && day % 7 != 0 && day != lastDay ? "border-r lg:border-r-0" : ""}
        ${day % 14 == 0 ? "border-r": ""}
        ${day % 7 == 0 ? "lg:border-r" : ""} 
        ${day == lastDay - 1 ? "border-b" : ""}
        ${(lastDay == 28 && day == 22) || day == 29 ? "lg:rounded-bl-lg" : ""}
        ${day == lastDay ? "lg:rounded-br-lg border-b border-r" : ""}`}
      >
        <div className="text-xs">{dayName}</div>
        <div className="text-sm font-medium">{day}</div>
        <div className="text-sm mt-1 mb-1 ml-2">
          {eventsParam.map((event, idx) => {
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
