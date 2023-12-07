"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

//this type shows the data we are expecting from this component
type FormData = {
  title: string;
};

type FormProps = FormData & {
  title: string;
  updateFields: (fields: Partial<FormData>) => void;
};

function EventName({ ...props }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  //Update the form's default values with the data from the API
  useEffect(() => {
    if (props.title !== "") {
      reset({
        title: props.title,
      });
    }
  }, [props.title,reset]);

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
          Hello! Let&apos;s create an event.
        </h1>
      </section>
      <section className="mt-16">
        <label htmlFor="name">What's the name of your event?</label>
        <br />
        <input
          type="text"
          required
          className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
          {...register("title")}
        />
        {errors.title && (
          <small className="text-red-600">{errors.title.type}</small>
        )}
      </section>
    </motion.div>
  );
}

export default EventName;
