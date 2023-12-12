"use client";
import { useFetch } from "@/hooks/useFetch";
import EventCard from "../ui/events/EventCard";
import Loader from "../ui/loaders/Loader";

function DiscoverEvents() {
  // Hook to get Discovered Events
  const { data: DiscoveredEvents, isLoading: IsFetchingDiscoveredEvents } =
    useFetch("discovered-events", "events", (data) => data.events.slice(0, 3));

  return (
    <section className="w-full py-16">
      <section className="max-w-screen-xl mx-auto px-5 xl:px-0">
        <h1 className="text-xl lg:text-3xl font-bold mb-2">Discover Events</h1>
        <p>Take a peek at some amazing events using TicketTribe.</p>
        <section className="relative overflow-x-hidden">
          <section>
            {IsFetchingDiscoveredEvents ? (
              <section className="w-full h-full flex justify-center items-center my-5 col-span-4">
                <Loader width="50" height="50" color={"#777777"} />
              </section>
            ) : (
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 w-full">
                {DiscoveredEvents?.length > 0 ? (
                  DiscoveredEvents?.map((item: IEvent) => {
                    return (
                      <EventCard
                        key={item._id}
                        name={item.title}
                        location={item.location}
                        id={item._id}
                        image={item.image}
                        isAuth={false}
                        date={item.startDate}
                      />
                    );
                  })
                ) : (
                  <section className="md:col-span-2 lg:col-span-3 w-full flex flex-col justify-center items-center text-center py-5">
                    <h1 className="text-2xl">Oops!😔</h1>
                    <p className="my-3">
                      There are currently no featured events available.
                    </p>
                  </section>
                )}
              </section>
            )}
          </section>
        </section>
      </section>
    </section>
  );
}

export default DiscoverEvents;
