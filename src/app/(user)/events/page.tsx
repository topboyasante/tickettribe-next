"use client";
import EventCard from "@/components/ui/events/EventCard";
import Loader from "@/components/ui/loaders/Loader";
import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function page() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { Events, IsFetchingEvents } = useFetch("events");
  const filteredItems = Events?.filter((item: IEvent) => {
    const EventMatch = item?.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return EventMatch;
  });
  return (
    <section className="max-w-screen-xl mx-auto p-5 xl:px-0">
      {/* Header */}
      <section>
        <h1 className="text-2xl font-semibold text-primary-light dark:text-primary-dark">
          Events
        </h1>
        <section className="flex flex-col md:flex-row lg:justify-between lg:items-center gap-3 my-3">
          <section className="border dark:border-[#303030] rounded-md px-2 py-1 lg:w-[45%] flex items-center">
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
      </section>
      {/* Content */}
      <section>
        <section>
          {IsFetchingEvents ? (
            <section className="w-full h-full flex justify-center items-center my-5">
              <Loader width="50" height="50" color="#006d77" />
            </section>
          ) : (
            <section className="grid my-8 grid-cols-1 lg:grid-cols-3 gap-8 w-full h-full">
              {filteredItems?.length > 0 ? (
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
                  <p>The event you're looking for does not exist.</p>
                </section>
              )}
            </section>
          )}
        </section>
      </section>
    </section>
  );
}

export default page;
