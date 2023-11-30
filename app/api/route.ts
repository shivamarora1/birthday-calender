import { fetchAllEvents } from "@/app/lib/data";

export async function GET() {
  const events = await fetchAllEvents();
  return Response.json(events);
}
