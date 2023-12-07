"use client";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { FormEvent, useState } from "react";
import EventName from "../forms/create-events/EventName";
import EventLocation from "../forms/create-events/EventLocation";
import EventStartDate from "../forms/create-events/EventStartDate";
import EventEndDate from "../forms/create-events/EventEndDate";
import EventDescription from "../forms/create-events/EventDescription";
import { motion } from "framer-motion";
import useMutationRequest from "@/hooks/useMutationRequest";
import Loader from "../ui/loaders/Loader";

function AddEventsForm() {
  //This is the initial structure of the data we need when creating an event.
  const INITIAL_DATA: ICreateEventRequest = {
    title: "",
    description: "",
    startDate: "",
    startDateTime: "",
    endDate: "",
    endDateTime: "",
    location: "",
  };

  //this is the state variable that will be updating the form data
  const [data, setData] = useState<ICreateEventRequest>(INITIAL_DATA);

  function updateFields(fields: Partial<ICreateEventRequest>) {
    setData((prev) => {
      //returns an object with data from the previous form filled, and the current form filled
      return { ...prev, ...fields };
    });
  }

  const { createEvent, isCreatingEvent } = useMutationRequest("events");

  //Usage of the "useMultiStepForm" hook
  const {
    currentStepIndex,
    steps,
    currentStep,
    back,
    next,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm([
    <EventName {...data} updateFields={updateFields} key={1} />,
    <EventLocation {...data} updateFields={updateFields} key={2} />,
    <EventStartDate {...data} updateFields={updateFields} key={3} />,
    <EventEndDate {...data} updateFields={updateFields} key={4} />,
    <EventDescription {...data} updateFields={updateFields} key={5} />,
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    createEvent(data);
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="min-h-[93vh] max-w-[1000px] mx-auto flex flex-col justify-center"
      onSubmit={onSubmit}
    >
      {currentStep}
      <section className="flex gap-5">
        {!isFirstStep && ( // don't show the previous button on the first form
          <button
            className="mt-20 border border-primary-light dark:border-primary-dark dark:text-white text-black px-4 py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              back();
            }}
            disabled={currentStepIndex <= 0}
          >
            Prev
          </button>
        )}
        <button
          type="submit"
          className="mt-20 bg-primary-light dark:bg-primary-dark text-white dark:text-black px-4 py-2 rounded"
        >
          {isCreatingEvent ? (
            <Loader width="20" height="20" color="#006d77" />
          ) : (
            <>{isLastStep ? "Finish" : "Next"}</>
          )}
        </button>
      </section>
    </motion.form>
  );
}

export default AddEventsForm;
