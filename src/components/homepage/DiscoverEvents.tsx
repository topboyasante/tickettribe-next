"use client";
import { useFetch } from "@/hooks/useFetch";
import EventCard from "../ui/events/EventCard";
import Loader from "../ui/loaders/Loader";

function DiscoverEvents() {
  // Hook to get Discovered Events
  const { DiscoveredEvents, IsFetchingDiscoveredEvents } =
    useFetch("get_all_events");

  return (
    <section className="w-full py-16">
      <section className="max-w-screen-xl mx-auto px-5 xl:px-0">
        <h1 className="text-xl lg:text-3xl font-bold mb-2">Discover Events</h1>
        <p>Take a peek at some amazing events using TicketTribe.</p>
        <section className="relative overflow-x-hidden">
          <section className="grid lg:grid-cols-4 gap-5 my-5 w-full">
            {IsFetchingDiscoveredEvents ? (
              <section className="w-full h-full flex justify-center items-center my-5 col-span-4">
                <Loader width="50" height="50" color={"#777777"} />
              </section>
            ) : (
              DiscoveredEvents?.map((item: IEvent) => {
                return (
                  <EventCard
                    key={item._id}
                    name={item.title}
                    location={item.location}
                    id={item._id}
                    image={item.image}
                    isAuth={false}
                  />
                );
              })
            )}
          </section>
          
        </section>
      </section>
    </section>
  );
}

export default DiscoverEvents;
