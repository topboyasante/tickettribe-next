"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

//this type shows the data we are expecting from this component
type FormData = {
  location: string;
};

type FormProps = FormData & {
  location: string;
  updateFields: (fields: Partial<FormData>) => void;
};

function EventLocation({ ...props }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  //Update the form's default values with the data from the API
  useEffect(() => {
    if (props.location !== "") {
      reset({
        location: props.location,
      });
    }
  }, [props.location,reset]);

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
          Where are you holding the event?
        </h1>
      </section>
      <section className="mt-16">
        <label htmlFor="location">Enter Event Location</label>
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
    </motion.div>
  );
}

export default EventLocation;
