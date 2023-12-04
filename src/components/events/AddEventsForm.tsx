"use client"
import useMutationRequest from '@/hooks/useMutationRequest';
import React from 'react'
import { useForm } from 'react-hook-form';
import Loader from '../ui/loaders/Loader';
import { useSession } from 'next-auth/react';

function AddEventsForm() {
    const { createEvent, isCreatingEvent } = useMutationRequest("events");
    const session = useSession()
    console.log(session)
    const {
      register,
      handleSubmit,
      // reset,
      formState: { errors },
    } = useForm<IEvent>();
  
    function onSubmit(data: IEvent) {
      const payload = {
        title: data.title,
        description: data.description,
        location: data.location,
        startDate: data.startDate,
        startDateTime: data.startDateTime,
        endDate: data.endDate,
        endDateTime: data.endDateTime,
      };
      createEvent(payload);
    }

  return (
    <section>
        <section>
          <h1 className="font-bold text-xl lg:text-3xl xl:text-4xl mb-2">
            Create An Event
          </h1>
          <p className="text-[#777777]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem in
            ea, ut voluptate molestias dolores.
          </p>
        </section>
        <hr className="my-5" />
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Event Name */}
            <section>
              <label htmlFor="name">Event Name</label>
              <br />
              <input
                type="text"
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <small className="text-red-600">{errors.title.type}</small>
              )}
            </section>
            <br />
            {/* Event Description */}
            <section>
              <label htmlFor="description">Description</label>
              <br />
              <input
                type="text"
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <small className="text-red-600">
                  {errors.description.type}
                </small>
              )}
            </section>
            <br />
            {/* Event Location */}
            <section>
              <label htmlFor="location">Location</label>
              <br />
              <input
                type="text"
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <small className="text-red-600">{errors.location.type}</small>
              )}
            </section>
            <br />
            {/* Event Start Date */}
            <section>
              <label htmlFor="start_date">Start Date</label>
              <br />
              <input
                type="date"
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
                {...register("startDate", { required: true })}
              />
              {errors.startDate && (
                <small className="text-red-600">{errors.startDate.type}</small>
              )}
            </section>
            <br />
            {/* Event Start Time */}
            <section>
              <label htmlFor="time">Start Time</label>
              <br />
              <input
                type="time"
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
                {...register("startDateTime", { required: true })}
              />
              {errors.startDateTime && (
                <small className="text-red-600">
                  {errors.startDateTime.type}
                </small>
              )}
            </section>
            <br />
            {/* Event End Date */}
            <section>
              <label htmlFor="end_date">End Date</label>
              <br />
              <input
                type="date"
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
                {...register("endDate", { required: true })}
              />
              {errors.endDate && (
                <small className="text-red-600">{errors.endDate.type}</small>
              )}
            </section>
            <br />
            {/* Event End Time */}
            <section>
              <label htmlFor="time">End Time</label>
              <br />
              <input
                type="time"
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
                {...register("endDateTime", { required: true })}
              />
              {errors.endDateTime && (
                <small className="text-red-600">
                  {errors.endDateTime.type}
                </small>
              )}
            </section>
            <br />
            <button
              className="bg-primary-light dark:bg-primary-dark text-white dark:text-black px-4 py-2 rounded"
              disabled={isCreatingEvent}
              type="submit"
            >
              {isCreatingEvent ? (
                <Loader width="20" height="20" color="#006d77" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </section>
      </section>
  )
}

export default AddEventsForm