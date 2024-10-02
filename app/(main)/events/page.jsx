import { getEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import { Suspense } from "react";


export default function EventPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Events />
    </Suspense>
  )
}

const Events = async () => {
  const { events, username } = await getEvents();
  if (events.length === 0) return <div className="flex h-screen items-center justify-center">No events found</div>
  return <div>
    <h1 className="text-5xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent pb-6 ">Upcoming Events</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4" >
      {events.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  </div>
}