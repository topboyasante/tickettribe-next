"use client";
import useMutationRequest from "@/hooks/useMutationRequest";
import Button from "../buttons/Button";
import TicketCheck from "./TicketCheck";
import { useState } from "react";
import Modal from "../modal/Modal";
import Loader from "../loaders/Loader";
import { useForm } from "react-hook-form";

type TicketProps = {
  eventName: string;
  eventId: string;
  name: string;
  price: number;
  soldQty?: number;
  ticketQty?: number;
  type: string;
  canBuy?: boolean;
  isAuthenticated?: boolean;
};

function Ticket(props: TicketProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { PurchaseTicket, isPurchasingTicket } = useMutationRequest(
    "",
    "purchased-tickets"
  );
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<IPurchaseTicketRequest>();

  function onSubmit(data: IPurchaseTicketRequest) {
    const payload = {
      eventName: props.eventName,
      ticketType: props.type,
      ticketName: props.name,
      ticketQty:data.ticketQty
    };
    PurchaseTicket(payload);
  }

  return (
    <section>
      <section className="border-[5px] dark:border-[#404040] rounded-2xl col-span-1 p-5">
        <section className="flex justify-between items-center">
          <h1>{props.eventName}</h1>
          <TicketCheck check={props.name} />
        </section>
        <section className="my-5">
          <TicketCheck check={props.type} />
        </section>
        <p>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "GHC",
          }).format(Number(props.price))}
        </p>
        {props.ticketQty && <p>Total Quantity: {props.ticketQty}</p>}
        {props.canBuy && (
          <section className="mt-5">
            <Button size="sm" type="primary" onClick={() => setIsOpen(true)}>
              Purchase Ticket
            </Button>
          </section>
        )}
      </section>
      {/* Modal */}
      <Modal
        CloseModal={() => setIsOpen(false)}
        ModalIsOpen={isOpen}
        ModalTitle="Purchase Ticket"
        ModalContent={
          <section className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="text-black">
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
                  <small className="text-red-600">
                    {errors.ticketQty.type}
                  </small>
                )}
              </section>
              <br />
              <button
                className="bg-primary-light dark:bg-primary-dark text-white dark:text-black px-4 py-2 rounded"
                disabled={isPurchasingTicket}
                type="submit"
              >
                {isPurchasingTicket ? (
                  <Loader width="20" height="20" color="#006d77" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </section>
        }
      />
    </section>
  );
}

export default Ticket;
