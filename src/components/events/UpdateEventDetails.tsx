"use client";
import { FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useMutationRequest from "../../hooks/useMutationRequest";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Loader from "../ui/loaders/Loader";
import Modal from "../ui/modal/Modal";
import { useFetchById } from "@/hooks/useFetchById";
import { RiImageAddLine } from "react-icons/ri";
import { formatDateToMMDDYY } from "@/utils";
import Image from "next/image";

function UpdateEventDetails({ eventId }: { eventId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //State to hold the image
  const [selectedFile, setSelectedFile] = useState<Blob | null>();
  // State to hold the Image Preview Link
  const [preview, setPreview] = useState<string>("");

  //Fetch the Event whose ID was Passed:
  const { SingleEvent, isFetchingSingleEvent } = useFetchById("event", eventId);
  const { UploadEventImage, EditEvent } = useMutationRequest(eventId, "events");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IEvent>({
    defaultValues: {
      title: SingleEvent?.title,
      description: SingleEvent?.description,
      location: SingleEvent?.location,
      startDate: SingleEvent && formatDateToMMDDYY(SingleEvent?.startDate),
      startDateTime: SingleEvent?.startDateTime,
      endDate: SingleEvent?.endDate,
      endDateTime: SingleEvent?.endDateTime,
    },
  });

  //Update the form's default values with the data from the API
  useEffect(() => {
    if (SingleEvent) {
      reset({
        ...SingleEvent,
        startDate: SingleEvent && formatDateToMMDDYY(SingleEvent?.startDate),
        endDate: SingleEvent && formatDateToMMDDYY(SingleEvent?.endDate),
      });
    }
  }, [SingleEvent,reset]);

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
    EditEvent(payload);
  }

  function uploadImage(e: FormEvent) {
    e.preventDefault();
    //create form data
    let formData = new FormData();
    formData.set("image", selectedFile as Blob);

    UploadEventImage(formData);
  }

  function fileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && (e.target.files[0] as Blob);
    setSelectedFile(file);

    //create a new file reader
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataURL = reader.result;
      setPreview(dataURL as string);
    };

    reader.readAsDataURL(file as Blob);
  }

  return (
    <section>
      {/* Header */}
      <section
        className={"relative w-full h-[50vh] bg-bottom bg-cover"}
        style={{ backgroundImage: `url(${SingleEvent?.image})` }}
      >
        <section className="w-full h-full flex flex-col gap-5 justify-end items-end backdrop-brightness-50 p-5">
          <button
            onClick={() => setIsOpen(true)}
            className="absolute bg-primary-light text-white dark:bg-primary-dark dark:text-black rounded-full p-3 hover:scale-105 cursor-pointer ease-in duration-200"
          >
            <FaCamera />
          </button>
        </section>
      </section>
      {/* content */}
      {isFetchingSingleEvent ? (
        <section className="w-full h-full flex justify-center items-center">
          <Loader width="50" height="50" color="#006d77" />
        </section>
      ) : (
        <section className="max-w-screen-xl mx-auto p-5 xl:px-0">
          {SingleEvent && (
            <section className="max-w-screen-xl mx-auto">
              <section className="p-5">
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
                        <small className="text-red-600">
                          {errors.title.type}
                        </small>
                      )}
                    </section>
                    <br />
                    {/* Event Description */}
                    <section>
                      <label htmlFor="description">Description</label>
                      <br />
                      <textarea
                        rows={10}
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
                        <small className="text-red-600">
                          {errors.location.type}
                        </small>
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
                        <small className="text-red-600">
                          {errors.startDate.type}
                        </small>
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
                        <small className="text-red-600">
                          {errors.endDate.type}
                        </small>
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
                      className="bg-primary-light text-white dark:bg-primary-dark dark:text-black px-4 py-2 rounded"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <Loader width="20" height="20" color="#006d77" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </section>
              </section>
            </section>
          )}
        </section>
      )}
      {/* Modal */}
      <Modal
        CloseModal={() => setIsOpen(false)}
        ModalIsOpen={isOpen}
        ModalTitle="Upload Event Image"
        ModalContent={
          <section>
            <section className="my-5 border p-3 rounded">
              {preview ? (
                <Image src={preview} alt="preview_image" />
              ) : (
                <p>No Image Selected</p>
              )}
            </section>
            <form onSubmit={(e) => uploadImage(e)}>
              <label
                htmlFor="imageUpload"
                className="h-9 w-auto gap-2 flex flex-row items-center justify-center bg-primary-light dark:bg-primary-dark text-white dark:text-blackfont-semibold rounded-[4px] hover:cursor-pointer"
              >
                <div className="">
                  <RiImageAddLine />
                </div>
                <p>Choose Image</p>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={(e) => fileUpload(e)}
                className="hidden relative h-[0.1px] -z-50"
              />
              <button className="bg-primary-light text-white dark:bg-primary-dark dark:text-black px-2 py-1 rounded mt-3 hover:scale-105 cursor-pointer ease-in duration-200">
                Submit
              </button>
            </form>
          </section>
        }
      />
    </section>
  );
}

export default UpdateEventDetails;
