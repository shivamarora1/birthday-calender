import { describe, expect, test } from "@jest/globals";
import {
    addDayEvent,
  getDayEventsByDate,
  getDayEventsByMonth,
  getDayName,
  getDaysInMonth,
  getMonthName,
} from "./utils";

describe("getMonths fxn", () => {
  test.each([
    { month: 0, output: "January" },
    { month: 3, output: "April" },
    { month: 11, output: "December" },
  ])("Month Name", ({ month, output }) => {
    expect(getMonthName(month)).toBe(output);
  });
});

describe("getDaysInMonth fxn", () => {
  test.each([
    { year: 2023, month: 3, output: 30 },
    { year: 2024, month: 4, output: 31 },
    { year: 2022, month: 1, output: 28 },
    { year: 2021, month: 1, output: 28 },
  ])("Day name of Month", ({ year, month, output }) => {
    expect(getDaysInMonth(year, month)).toBe(output);
  });
});

describe("getDayName fxn", () => {
  test.each([
    { year: 2023, month: 1, day: 28, dayName: "Saturday" },
    { year: 2023, month: 4, day: 10, dayName: "Monday" },
    { year: 2022, month: 8, day: 12, dayName: "Friday" },
    { year: 2025, month: 11, day: 3, dayName: "Monday" },
    { year: 2026, month: 8, day: 20, dayName: "Thursday" },
    { year: 2004, month: 5, day: 23, dayName: "Sunday" },
    { year: 2004, month: 9, day: 14, dayName: "Tuesday" },
  ])("Get Day Name", ({ year, month, day, dayName }) => {
    expect(getDayName(year, month, day)).toBe(dayName);
  });
});

describe("getDayEventsByMonth fxn", () => {
  let eventsInApril = {
    3: ["Birthday-1", "Birthday-2"],
    11: ["B-1", "B-12"],
    23: ["b89", "b93"],
  };
  let eventsInMarch = { 2: ["Birthday-3"], 30: ["C-89", "ER-23"] };
  let eventsInJanuary = {
    0: ["Birthday-4", "Birthday-5"],
    22: ["BT-98", "EC-9898"],
  };
  let eventsInFebruary = { 1: ["Birthday-8", "Birthday-9"] };
  let eventsInDecember = { 11: ["Birthday-11", "Birthday-21"] };

  let data = {
    3: eventsInApril,
    2: eventsInMarch,
    0: eventsInJanuary,
    1: eventsInFebruary,
    11: eventsInDecember,
  };

  test.each([
    { data: data, month: 3, output: eventsInApril },
    { data: data, month: 2, output: eventsInMarch },
    { data: data, month: 0, output: eventsInJanuary },
    { data: data, month: 11, output: eventsInDecember },
  ])("Get Day Events By Month", ({ data, month, output }) => {
    expect(getDayEventsByMonth(data, month)).toBe(output);
  });

  test.each([
    { data: eventsInApril, day: 11, output: eventsInApril[11] },
    { data: eventsInJanuary, day: 22, output: eventsInJanuary[22] },
    { data: eventsInDecember, day: 11, output: eventsInDecember[11] },
  ])("Get Day Events By Date", ({ data, day, output }) => {
    expect(getDayEventsByDate(data, day)).toBe(output);
  });

  test.each([
    {
      allEvents: {},
      month: 3,
      day: 1,
      event: "Event XY",
      output: { 3: { 1: ["Event XY"] } },
    },
    {
      allEvents: { 1: { 18: ["Event-xy"], 29: ["Event-XYZ"] } },
      month: 1,
      day: 29,
      event: "Event XY",
      output: { 1: { 18: ["Event-xy"], 29: ["Event-XYZ"] } },
    },
  ])("Add Day Event",({allEvents,month,day,event,output})=>{
    expect(addDayEvent(allEvents,month,day,event)).toBe(output)
  });
});


// Test it.....