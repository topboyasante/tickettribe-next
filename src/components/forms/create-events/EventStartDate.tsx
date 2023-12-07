"use client";
import { getCurrentDate } from "@/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//this type shows the data we are expecting from this component
type FormData = {
  startDate: string;
  startDateTime: string;
};

type FormProps = FormData & {
  startDate: string;
  startDateTime: string;
  updateFields: (fields: Partial<FormData>) => void;
};

function EventStartDate({ ...props }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  //Update the form's default values with the data from the state
  useEffect(() => {
    if (props.startDate !== "" && props.startDateTime !== "") {
      reset({
        startDate: props.startDate,
        startDateTime: props.startDateTime,
      });
    }
  }, [props.startDate, props.startDateTime]);

  function onSubmit(data: FormData) {
    props.updateFields(data);
  }
  const [minDate] = useState<string>(() => getCurrentDate());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onChange={handleSubmit(onSubmit)}
    >
      <section>
        <h1 className="text-primary-light dark:text-primary-dark font-bold text-xl lg:text-3xl xl:text-4xl mb-2">
          When does the event start?
        </h1>
      </section>
      <section className="mt-16">
        {/* Event Start Date */}
        <section>
          <label htmlFor="start_date">Start Date</label>
          <br />
          <input
            type="date"
            required
            min={minDate}
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
            required
            className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
            {...register("startDateTime", { required: true })}
          />
          {errors.startDateTime && (
            <small className="text-red-600">{errors.startDateTime.type}</small>
          )}
        </section>
      </section>
    </motion.div>
  );
}

export default EventStartDate;
