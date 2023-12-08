import { dayEventsType, eventsDataType } from "@/app/lib/definitions";
export function getMonthName(month: number): String {
  // 0 indexed month.
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return allMonths[month];
}

export function getDayName(year: number, month: number, day: number): String {
  // 0 indexed month.
  const date = new Date(year, month, day, 0, 0, 0, 0);
  return date.toLocaleDateString("en", { weekday: "long" });
}

export function getDaysInMonth(year: number, month: number): number {
  // 0 indexed month.
  if (month >= 11) {
    month = -1;
  } else if (month <= 0) {
    month = 0;
  }
  const dt = new Date(year, month + 1, 0);
  return dt.getDate();
}

// ! delete me after use.
export const eventsData: eventsDataType = {
  2: { 7: ["Shivam's Birthday"] },
};

export function getDayEventsByMonth(
  data: eventsDataType,
  month: number
): dayEventsType {
  if (data && month in data) {
    return data[month] || {};
  }
  return {};
}

export function getDayEventsByDate(data: dayEventsType, day: number): String[] {
  if (day in data) {
    return data[day];
  }
  return [];
}

export function addDayEvent(
  allEvents: eventsDataType,
  month: number,
  day: number,
  event: string
): eventsDataType {
  let newAllEvents = allEvents || {};
  if (month in newAllEvents) {
    if (day in newAllEvents[month]) {
      let events = newAllEvents[month][day];
      events.push(event);
    } else {
      newAllEvents[month][day] = [event];
    }
  } else {
    newAllEvents[month] = { [day]: [event] };
  }
  return newAllEvents;
}
