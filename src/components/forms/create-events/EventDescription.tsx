"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

//this type shows the data we are expecting from this component
type FormData = {
  description: string;
};

type FormProps = FormData & {
  description: string;
  updateFields: (fields: Partial<FormData>) => void;
};

function EventDescription({ ...props }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  //Update the form's default values with the data from the API
  useEffect(() => {
    if (props.description !== "") {
      reset({
        description: props.description,
      });
    }
  }, [props.description,reset]);

  function onSubmit(data: FormData) {
    props.updateFields(data);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onChange={handleSubmit(onSubmit)}
    >
      <section>
        <h1 className="text-primary-light dark:text-primary-dark font-bold text-xl lg:text-3xl xl:text-4xl mb-2">
          What&apos;s the event about?
        </h1>
      </section>
      <section className="mt-16">
        {/* Event Description */}
        <section>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            required
            rows={10}
            className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <small className="text-red-600">{errors.description.type}</small>
          )}
        </section>
      </section>
    </motion.div>
  );
}

export default EventDescription;
