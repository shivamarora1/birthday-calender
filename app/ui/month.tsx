"use client";
import { useState } from "react";
import { getDaysInMonth, getMonthName } from "../lib/utils";
import Day from "./day";
import MonthHeading from "./month-heading";
import {
  getDayEventsByMonth,
  getDayEventsByDate,
} from "../lib/utils";

import {
  eventsDataType,
} from "../lib/definitions";

export type showModalFxn = (day: number, month: number) => void;
export default function Month({
  month,
  year,
  showModal,
  allEvents,
}: {
  month: number;
  year: number;
  showModal: showModalFxn;
  allEvents: eventsDataType;
}) {
  const [monthState, setMonth] = useState(month);
  const [yearState, setYear] = useState(year);

  const monthName = getMonthName(monthState);
  const daysInMonth = getDaysInMonth(yearState, monthState);
  const events = getDayEventsByMonth(allEvents, monthState);

  const nextMonth = () => {
    let newDate = new Date(yearState, monthState + 1, 1);

    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const previousMonth = () => {
    let newDate = new Date(yearState, monthState - 1, 1);

    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const elements = [];
  let day = 1;

  while (day <= daysInMonth) {
    const dt = new Date(yearState, monthState, day);
    elements.push(
      <Day
        key={dt.getTime()}
        date={dt}
        showModal={showModal}
        eventsParam={getDayEventsByDate(events, day)}
      />
    );
    day++;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <MonthHeading
          month={monthName + " " + yearState}
          previousMonthFxn={previousMonth}
          nextMonthFxn={nextMonth}
        />
        <div className="grid grid-cols-2 lg:grid-cols-7 w-fit">{elements}</div>
      </div>
    </>
  );
}
