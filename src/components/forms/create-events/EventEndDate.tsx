"use client";
import { getCurrentDate } from "@/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//this type shows the data we are expecting from this component
type FormData = {
  endDate: string;
  endDateTime: string;
};

type FormProps = FormData & {
  endDate: string;
  endDateTime: string;
  updateFields: (fields: Partial<FormData>) => void;
};

function EventEndDate({ ...props }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  //Update the form's default values with the data from the state
  useEffect(() => {
    if (props.endDate !== "" && props.endDateTime !== "") {
      reset({
        endDate: props.endDate,
        endDateTime: props.endDateTime,
      });
    }
  }, [props.endDate, props.endDateTime,reset]);

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
          When does the event End?
        </h1>
      </section>
      <section className="mt-16">
        {/* Event Start Date */}
        <section>
          <label htmlFor="start_date">End Date</label>
          <br />
          <input
            type="date"
            min={minDate}
            required
            className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
            {...register("endDate", { required: true })}
          />
          {errors.endDate && (
            <small className="text-red-600">{errors.endDate.type}</small>
          )}
        </section>
        <br />
        {/* Event Start Time */}
        <section>
          <label htmlFor="time">End Time</label>
          <br />
          <input
            type="time"
            required
            className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
            {...register("endDateTime", { required: true })}
          />
          {errors.endDateTime && (
            <small className="text-red-600">{errors.endDateTime.type}</small>
          )}
        </section>
      </section>
    </motion.div>
  );
}

export default EventEndDate;
