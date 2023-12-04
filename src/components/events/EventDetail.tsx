"use client";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import React from "react";
import Loader from "../ui/loaders/Loader";
import { AiFillCalendar } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { formatDate, formatTime } from "@/utils";
import { useFetchById } from "@/hooks/useFetchById";
import Link from "next/link";
import Button from "../ui/buttons/Button";
import Ticket from "../ui/ticket/Ticket";

function EventDetail({
  eventId,
  isAuth,
}: {
  eventId: string;
  isAuth: boolean;
}) {
  //Fetch the Event whose ID was Passed:
  const { SingleEvent, isFetchingSingleEvent } = useFetchById(
    "events",
    eventId
  );
  //Fetch Tickets for this event
  const { AllTicketsForEvent } = useFetchById("all-tickets", eventId);
  //Fetch all My Events
  const { MyEvents } = useFetch("my-events");
  //Check if the selected event exists in the "MyEvents" array. this means the user logged in created this event.
  const isMyEvent = (event: IEvent) => {
    return event._id === SingleEvent._id;
  };

  return (
    <section className="max-w-screen-xl mx-auto px-5 xl:px-0">
      {isFetchingSingleEvent ? (
        <Loader width="50" height="50" color="#006d77" />
      ) : (
        <section>
          {/* Header */}
          <section className="w-full">
            <Image
              src={SingleEvent?.image}
              alt={SingleEvent?.title}
              className="h-[200px] lg:h-[500px] w-full object-cover"
              width={1000}
              height={1000}
              priority={true}
            />
          </section>
          <section className="my-5">
            <section className="flex"></section>
            <section className="flex flex-col gap-5 lg:flex-row justify-between lg:items-center">
              {/* Left Side */}
              <section>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold capitalize">
                  {SingleEvent?.title}
                </h1>
                <p className="mt-3 mb-5">{SingleEvent?.description}</p>
                {MyEvents?.some(isMyEvent) && (
                  <section className="flex gap-5">
                    <Link href={`/events/my-events/edit/${eventId}`}>
                      <Button size="sm" type="primary">
                        Edit Event
                      </Button>
                    </Link>
                    <Button size="sm" type="danger">
                      Delete Event
                    </Button>
                  </section>
                )}
              </section>
              {/* Right Side */}
              {isAuth && (
                <section className="w-full lg:w-[40%] h-[600px] lg:h-[300px] overflow-y-auto relative">
                  {/* Counter for how many tickets you want will be here */}
                  <section className="sticky top-0 bg-primary-light dark:bg-primary-dark dark:text-black w-full p-3 ">
                    <p className="font-bold text-xl">Buy Tickets</p>
                  </section>
                  <section className="flex flex-col gap-5 p-5">
                    {AllTicketsForEvent?.map((item: ITicket) => {
                      return (
                        <Ticket
                          key={item._id}
                          name={item.name}
                          eventName={item.eventName}
                          eventId={item.eventId}
                          type={item.type}
                          price={item.price}
                          canBuy={true}
                        />
                      );
                    })}
                  </section>
                </section>
              )}
            </section>
            {/* Date and Time */}
            <section className="mt-5">
              <h3 className="font-bold text-2xl">Date and Time</h3>
              <section className="flex gap-2 items-center">
                <AiFillCalendar />
                <p>{formatDate(SingleEvent?.startDate)}</p>
              </section>
              <section className="flex gap-2 items-center">
                <CiClock2 />
                <p>{formatTime(SingleEvent?.startDateTime)}</p>
              </section>
            </section>
            {/* Location */}
            <section className="mt-5">
              <h3 className="font-bold text-2xl">Location</h3>
              <section className="flex gap-2 items-center">
                <BiMapPin />
                <p>{SingleEvent?.location}</p>
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}

export default EventDetail;
