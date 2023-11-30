import { fetchAllEvents } from "@/app/lib/data";

export async function GET(req:Request) {
  const events = await fetchAllEvents();
  return Response.json(events);
}
