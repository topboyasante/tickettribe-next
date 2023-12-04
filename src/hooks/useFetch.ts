import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function useFetchDiscoveredEvents(key: string) {
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
  return {
    DiscoveredEvents,
    IsFetchingDiscoveredEvents,
  };
}

function useFetchEvents(key: string) {
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
  return {
    IsFetchingEvents,
    Events,
  };
}

function useFetchSingleEvent(key: string, eventID: string) {
  const { isLoading: isFetchingSingleEvent, data: SingleEvent } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(
        `https://ticket-tribe.onrender.com/api/v1/events/${eventID}`
      );
      return res.data;
    },
    select: (data) => {
      return data.event;
    },
  });

  return {
    isFetchingSingleEvent,
    SingleEvent,
  };
}

export { useFetchEvents, useFetchDiscoveredEvents, useFetchSingleEvent };
