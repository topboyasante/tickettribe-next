"use client";
import Button from "@/components/ui/buttons/Button";
import Loader from "@/components/ui/loaders/Loader";
import Ticket from "@/components/ui/ticket/Ticket";
import { useAuthFetch } from "@/hooks/useFetch";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Page() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: MyTickets, isLoading: IsFetchingMyTickets } = useAuthFetch(
    "my-tickets",
    "tickets/my-tickets",
    (data) => {
      return data.tickets;
    }
  );
  const filteredItems = MyTickets?.filter((item: ITicket) => {
    const EventMatch = item?.eventName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return EventMatch;
  });
  return (
    <section className="max-w-screen-xl min-h-screen mx-auto">
      <section className="p-5">
        <section>
          {/* Search Area */}
          <section className="w-full p-5">
            {/* Search Input */}
            <section className="flex flex-col md:flex-row lg:justify-center lg:items-center gap-3">
              <section className="border rounded-md px-2 py-1 lg:w-[45%] flex items-center">
                <input
                  type="search"
                  placeholder="Search for events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-black w-[85%] md:w-[90%] lg:w-[95%] outline-none appearance-none"
                />
                <section className="w-[15%] md:w-[10%] lg:w-[5%]">
                  <AiOutlineSearch />
                </section>
              </section>
            </section>
          </section>
        </section>
        <br />
        <section className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-3">
          <section>
            <h1 className="font-bold text-xl lg:text-3xl xl:text-4xl mb-2">
              My Tickets
            </h1>
            <p className="text-[#777777]">
              See tickets you created for your events
            </p>
          </section>
          <Link href={`/tickets/create`}>
            <Button size="sm" type="primary">
              Create Ticket
            </Button>
          </Link>
        </section>
        <br />
        <section>
          <section>
            {IsFetchingMyTickets ? (
              <section className="w-full h-full flex justify-center items-center my-5">
                <Loader width="50" height="50" color="#006d77" />
              </section>
            ) : (
              <section>
                {MyTickets && MyTickets?.length > 0 ? (
                  <section className="grid my-8 grid-cols-1 lg:grid-cols-3 gap-8 w-full h-full">
                    {filteredItems && filteredItems?.length > 0 ? (
                      filteredItems?.map((item: ITicket) => (
                        <Ticket
                          key={item.eventId}
                          name={item.name}
                          eventName={item.eventName}
                          eventId={item.eventId}
                          type={item.type}
                          ticketQty={item.ticketQty}
                          soldQty={item.soldQty}
                          price={item.price}
                          canBuy={false}
                        />
                      ))
                    ) : (
                      <section className="h-[300px] w-full col-span-3 flex justify-center items-center">
                        <h1 className="text-2xl">The item does not exist.</h1>
                      </section>
                    )}
                  </section>
                ) : (
                  <section className="h-[300px] w-full col-span-3 flex flex-col justify-center items-center">
                    <h1 className="text-2xl">Oops!😔</h1>
                    <p className="my-3">
                      There are currently no tickets available.
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

export default Page;
