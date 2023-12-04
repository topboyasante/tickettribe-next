import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useFetch(key: string) {
  const session = useSession();
  const accessToken = session.data?.user.token;

  const { isLoading: IsFetchingDiscoveredEvents, data: DiscoveredEvents } =
    useQuery({
      queryKey: [key],
      queryFn: async () => {
        const res = await axios.get(
          `https://ticket-tribe.onrender.com/api/v1/events/`
        );
        return res.data;
      },
      select: (data) => {
        return data.events.slice(0, 4);
      },
    });

  const { isLoading: IsFetchingEvents, data: Events } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(
        `https://ticket-tribe.onrender.com/api/v1/events/`
      );
      return res.data;
    },
    select: (data) => {
      return data.events;
    },
  });

  const { isLoading: IsFetchingMyEvents, data: MyEvents } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(
        `https://ticket-tribe.onrender.com/api/v1/events/my-events`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    select: (data) => {
      return data.event;
    },
  });

  return {
    DiscoveredEvents,
    IsFetchingDiscoveredEvents,
    Events,
    IsFetchingEvents,
    MyEvents,
    IsFetchingMyEvents
  };
}
