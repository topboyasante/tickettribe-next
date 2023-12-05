"use client";
import { useForm } from "react-hook-form";
import useMutationRequest from "../../hooks/useMutationRequest";
import { useAuthFetch } from "@/hooks/useFetch";
import Loader from "../ui/loaders/Loader";

function AddTicket() {
  //Fetch all My Events
  const { data: MyEvents, isLoading: IsFetchingMyEvents } = useAuthFetch(
    "my-events",
    "events/my-events",
    (data) => {
      return data.event;
    }
  );
  const { createTicket, isCreatingTicket } = useMutationRequest("my-tickets");

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<ITicket>();

  function onSubmit(data: ITicket) {
    createTicket(data);
  }

  return (
    <section className="max-w-screen-xl mx-auto">
      <section className="p-5">
        <section>
          <h1 className="font-bold text-xl lg:text-3xl xl:text-4xl mb-2">
            Create A Ticket
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
              {IsFetchingMyEvents ? (
                <Loader width="20" height="20" color="#006d77" />
              ) : (
                <select
                  className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none bg-transparent "
                  {...register("eventName", { required: true })}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Select Event
                  </option>
                  {MyEvents?.map((item: IEvent) => {
                    return (
                      <option
                        value={item.title}
                        key={item._id}
                        className="dark:text-black"
                      >
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              )}
              {errors.eventName && (
                <small className="text-red-600">{errors.eventName.type}</small>
              )}
            </section>
            <br />
            {/* Name of Ticket */}
            <section>
              <label htmlFor="name">Ticket Name</label>
              <br />
              <select
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none bg-transparent "
                {...register("name", { required: true })}
              >
                <option value="regular" className="dark:text-black">Regular</option>
                <option value="early-bird" className="dark:text-black">Early Bird</option>
                <option value="parking-pass" className="dark:text-black">Parking Pass</option>
              </select>
            </section>
            <br />
            {/* Ticket Quantity */}
            <section>
              <label htmlFor="name">Ticket Quantity</label>
              <br />
              <input
                type="number"
                min={1}
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none bg-transparent appearance-none"
                {...register("ticketQty", { required: true })}
              />
              {errors.ticketQty && (
                <small className="text-red-600">{errors.ticketQty.type}</small>
              )}
            </section>
            <br />
            {/* Ticket Price */}
            <section>
              <label htmlFor="name">Ticket Price</label>
              <br />
              <input
                type="number"
                min={0}
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none bg-transparent appearance-none"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <small className="text-red-600">{errors.price.type}</small>
              )}
            </section>
            <br />
            {/* Ticket Type */}
            <section>
              <label htmlFor="name">Ticket Type</label>
              <br />
              <select
                className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none bg-transparent "
                {...register("type", { required: true })}
              >
                <option value="standard" className="dark:text-black">Standard</option>
                <option value="vip" className="dark:text-black">VIP</option>
                <option value="vvip" className="dark:text-black">VVIP</option>
              </select>
            </section>
            <br />
            <button
              className="bg-primary-light dark:bg-primary-dark text-white dark:text-black px-4 py-2 rounded"
              disabled={isCreatingTicket}
              type="submit"
            >
              {isCreatingTicket ? (
                <Loader width="20" height="20" color="#006d77" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}

export default AddTicket;
