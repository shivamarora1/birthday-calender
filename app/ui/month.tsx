"use client";
import { useState } from "react";
import { getDaysInMonth, getMonthName } from "../lib/utils";
import Day from "./day";
import MonthHeading from "./month-heading";

export default function Month({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  
  const [monthState, setMonth] = useState(month);
  const [yearState, setYear] = useState(year);

  const monthName = getMonthName(monthState);
  const daysInMonth = getDaysInMonth(yearState, monthState);

  const nextMonth = () => {
    alert("here... next");
    let newDate = new Date(yearState, monthState + 1, 1);

    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const previousMonth = () => {
    alert("here... previous");
    let newDate = new Date(yearState, monthState - 1, 1);

    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const elements = [];
  let day = 1;

  while (day <= daysInMonth) {
    elements.push(<Day key={day} date={new Date(year, month, day)} />);
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
        <div className="grid grid-cols-7 w-fit">{elements}</div>
      </div>
    </>
  );
}
