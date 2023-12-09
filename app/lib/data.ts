import { conn } from "@/app/lib/db";
import { event, eventsDataType } from "./definitions";
// fetching all events at once
export async function fetchAllEvents() {
  try {
    const query = `SELECT * FROM events`;
    const data = await conn.query(query);
    const birthdayEvents = data.rows.reduce((acc: eventsDataType, event) => {
      const { month, day, title } = event;

      let monthObj = acc[month]|| {}; 
      monthObj[day] = monthObj[day] || [];
      monthObj[day].push(title);
      return acc;
    }, {});
    return birthdayEvents;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch events data.");
  }
}
export async function saveEvent(ev: event) {
  try {
    if (!ev.month || !ev.day || !ev.title)
      throw new Error("Month, Day, Title is required");
    const query = `INSERT INTO events(month,day,title)VALUES($1,$2,$3);`
    const res = await conn.query(query,[ev.month,ev.day,ev.title])
    return "success";
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to save event data.");
  }
}
