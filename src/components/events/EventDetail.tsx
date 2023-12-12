"use client";
import { useAuthFetch, useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "../ui/loaders/Loader";
import { AiFillCalendar } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { formatDate, formatTime } from "@/utils";
import { useFetchById } from "@/hooks/useFetchById";
import Link from "next/link";
import Button from "../ui/buttons/Button";
import Ticket from "../ui/ticket/Ticket";
import useMutationRequest from "@/hooks/useMutationRequest";
import Modal from "../ui/modal/Modal";

function EventDetail({
  eventId,
  isAuth,
}: {
  eventId: string;
  isAuth: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //Fetch the Event whose ID was Passed:
  const { SingleEvent, isFetchingSingleEvent } = useFetchById(
    "events",
    eventId
  );
  //Fetch Tickets for this event
  const { data: AllTicketsForEvent } = useAuthFetch(
    "my-tickets",
    "tickets/my-tickets",
    (data) => {
      const ticketsForEvent = data.tickets.filter(
        (i: ITicket) => i.eventId === eventId
      );
      return ticketsForEvent;
    }
  );
  //All MyEvents
  const { data: MyEvents, isLoading: IsFetchingMyEvents } = useAuthFetch(
    "my-events",
    "events/my-events",
    (data) => {
      return data.event;
    }
  );
  //Check if the selected event exists in the "MyEvents" array. this means the user logged in created this event.
  const isMyEvent = (event: IEvent) => {
    if (SingleEvent) {
      return event._id === SingleEvent._id;
    }
  };

  const { DeleteEvent, isDeletingEvent } = useMutationRequest(
    eventId,
    "my-events"
  );

  function deleteData() {
    DeleteEvent();
    setIsOpen(isDeletingEvent);
  }

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
            <section className="flex flex-col gap-5 lg:flex-row justify-between lg:items-center">
              {/* Left Side */}
              <section className="lg:w-[60%]">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold capitalize text-primary-light dark:text-primary-dark">
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
                    <Button
                      size="sm"
                      type="danger"
                      onClick={() => setIsOpen(true)}
                    >
                      Delete Event
                    </Button>
                  </section>
                )}
                {/* Date and Time */}
                <section className="mt-5">
                  <h3 className="font-bold text-2xl">Date and Time</h3>
                  <section className="flex gap-2 items-center">
                    <AiFillCalendar />
                    <p>
                      {SingleEvent && formatDate(SingleEvent?.startDate)} -{" "}
                      {SingleEvent && formatDate(SingleEvent?.endDate)}
                    </p>
                  </section>
                  <section className="flex gap-2 items-center">
                    <CiClock2 />
                    <p>
                      {SingleEvent && formatTime(SingleEvent?.startDateTime)} -{" "}
                      {SingleEvent && formatTime(SingleEvent?.endDateTime)}
                    </p>
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
              {/* Right Side */}
              {isAuth && (
                <section className="w-full lg:w-[40%] h-[600px] lg:h-[350px] overflow-y-auto relative scrollbar-hide">
                  <section className="sticky top-0 bg-primary-light dark:bg-primary-dark dark:text-black rounded-t-md w-full p-3 ">
                    <p className="font-bold text-xl text-white dark:text-black">
                      Buy Tickets
                    </p>
                  </section>
                  <section>
                    {AllTicketsForEvent?.length > 0 ? (
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
                    ) : (
                      <section className="p-5">
                        <h1>No tickets available, yet</h1>
                      </section>
                    )}
                  </section>
                </section>
              )}
            </section>
          </section>
        </section>
      )}
      {/* Modal */}
      <Modal
        CloseModal={() => setIsOpen(false)}
        ModalIsOpen={isOpen}
        ModalTitle="Delete Event"
        ModalContent={
          <section className="dark:text-white">
            <h1>Are you sure you want to delete this event?</h1>
            <div className="flex gap-5 mt-3">
              <button
                onClick={deleteData}
                disabled={isDeletingEvent}
                className="bg-red-700 text-white px-3 py-1 rounded"
              >
                Yes
              </button>
              <button onClick={() => setIsOpen(false)}>No</button>
            </div>
          </section>
        }
      />
    </section>
  );
}

export default EventDetail;
