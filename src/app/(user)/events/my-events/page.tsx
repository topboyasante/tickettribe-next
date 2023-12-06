"use client";

import Button from "@/components/ui/buttons/Button";
import EventCard from "@/components/ui/events/EventCard";
import Loader from "@/components/ui/loaders/Loader";
import { useAuthFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Page() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  //Fetch all My Events
  const { data: MyEvents, isLoading: IsFetchingMyEvents } = useAuthFetch(
    "my-events",
    "events/my-events",
    (data) => {
      return data.event;
    }
  );

  let filteredItems = MyEvents?.filter((item: IEvent) => {
    const EventMatch = item?.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return EventMatch;
  });

  return (
    <section className="max-w-screen-xl min-h-screen mx-auto">
      <section className="p-5">
        <section>
          <section className="flex flex-col md:flex-row lg:justify-between lg:items-center gap-3 my-3">
            <section className="border dark:border-[#303030] rounded-md px-2 py-1 w-[60%] lg:w-[45%] flex items-center">
              <input
                type="search"
                placeholder="Search for events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-[85%] md:w-[90%] lg:w-[95%] outline-none appearance-none"
              />
              <section className="w-[15%] md:w-[10%] lg:w-[5%]">
                <AiOutlineSearch />
              </section>
            </section>
          </section>
          <section className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-3">
            <section>
              <h1 className="font-bold text-xl lg:text-3xl xl:text-4xl mb-2">
                My Events
              </h1>
              <p className="text-[#777777]">
                See all events you&apos;ve created
              </p>
            </section>
            <Link href={`/events/create`}>
              <Button size="sm" type="primary">
                Create Event
              </Button>
            </Link>
          </section>
        </section>
        <section>
          <section>
            {IsFetchingMyEvents ? (
              <section className="w-full h-full flex justify-center items-center my-5">
                <Loader width="50" height="50" color="#006d77" />
              </section>
            ) : (
              <section>
                {MyEvents?.length > 0 ? (
                  <section className="grid my-8 grid-cols-1 lg:grid-cols-3 gap-8 w-full h-full">
                    {filteredItems && filteredItems?.length > 0 ? (
                      filteredItems?.map((item: IEvent) => (
                        <EventCard
                          key={item._id}
                          name={item.title}
                          location={item.location}
                          id={item._id}
                          image={item.image}
                          isAuth={true}
                        />
                      ))
                    ) : (
                      <section className="h-[300px] w-full col-span-3 flex flex-col justify-center items-center">
                        <h1 className="text-2xl">Oops!😔</h1>
                        <p>The event you&apos;re looking for does not exist.</p>
                      </section>
                    )}
                  </section>
                ) : (
                  <section className="h-[300px] w-full col-span-3 flex flex-col justify-center items-center">
                    <h1 className="text-2xl">Oops!😔</h1>
                    <p>There are currently no events available.</p>
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

export default Page;
