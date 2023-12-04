import Button from "../buttons/Button";
import TicketCheck from "./TicketCheck";

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
  return (
    <section className="border col-span-1 p-5">
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
            <Button size="sm" type="primary">Purchase Ticket</Button>
        </section>
      )}
    </section>
  );
}

export default Ticket;
