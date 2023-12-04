import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export function useFetchById(key: string, eventId: String) {
  const session = useSession();
  const accessToken = session.data?.user.token;

  const { isLoading: isFetchingSingleEvent, data: SingleEvent } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(
        `https://ticket-tribe.onrender.com/api/v1/events/${eventId}`
      );
      return res.data;
    },
    select: (data) => {
      return data.event;
    },
  });

  const { isLoading: isFetchingAllTicketsForEvent, data: AllTicketsForEvent } =
    useQuery({
      queryKey: [key],
      queryFn: async () => {
        const res = await axios.get(
          `https://ticket-tribe.onrender.com/api/v1/tickets/my-tickets`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return res.data;
      },
      select: (data) => {
        const ticketsForEvent = data.tickets.filter(
          (i: ITicket) => i.eventId === eventId
        );
        return ticketsForEvent;
      },
    });

  return {
    SingleEvent,
    isFetchingSingleEvent,
    isFetchingAllTicketsForEvent,
    AllTicketsForEvent
  };
}
