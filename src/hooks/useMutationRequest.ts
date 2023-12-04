import axios, { AxiosError } from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

function useMutationRequest<T>(eventId?: string, key?: string) {
  const router = useRouter()
  const session = useSession()
  const accessToken = session.data?.user.token
  // Create Events
  const {
    mutate: createEvent,
    data: CreatedEvent,
    isPending: isCreatingEvent,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.post(
        `https://ticket-tribe.onrender.com/api/v1/events`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      toast.success("Event Created!");
      router.push("/events")
    },
    onError: (error: AxiosError<any, any>) => {
      console.log(error);
      toast.error(`${error?.response?.data.msg}`);
    },
  });

  // Edit Events
  const {
    mutate: EditEvent,
    data: EditedEvent,
    isPending: isEditingEvent,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.patch(
        `https://ticket-tribe.onrender.com/api/v1/events/${eventId}`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      toast.success("Event Updated!");
    },
    onError: (error: AxiosError<any, any>) => {
      console.log(error);
      toast.error(`${error?.response?.data.msg}`);
    },
  });

  //Delete Events
  const {
    mutate: DeleteEvent,
    data: DeletedEvent,
    isPending: isDeletingEvent,
  } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `https://ticket-tribe.onrender.com/api/v1/events/${eventId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      toast.success("Event Deleted!");
    },
    onError: (error: AxiosError<any, any>) => {
      console.log(error);
      toast.error(`${error?.response?.data.msg}`);
    },
  });

  //Upload Event Image
  const {
    mutate: UploadEventImage,
    data: UploadedEventImage,
    isPending: isUploadingEventImage,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.patch(
        `https://ticket-tribe.onrender.com/api/v1/events/uploadImg/${eventId}`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      toast.success("Event Image Updateed!");
      // navigate("/events");
    },
    onError: (error: AxiosError<any, any>) => {
      console.log(error);
      toast.error(`${error?.response?.data.msg}`);
    },
  });

  // Create Tickets
  const {
    mutate: createTicket,
    data: CreatedTicket,
    isPending: isCreatingTicket,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.post(
        `https://ticket-tribe.onrender.com/api/v1/tickets`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      toast.success("Ticket Created!");
    },
    onError: (error: AxiosError<any, any>) => {
      console.log(error);
      toast.error(`${error?.response?.data.msg}`);
    },
  });

  return {
    createEvent,
    CreatedEvent,
    isCreatingEvent,
    EditEvent,
    EditedEvent,
    isEditingEvent,
    DeleteEvent,
    DeletedEvent,
    isDeletingEvent,
    UploadEventImage,
    UploadedEventImage,
    isUploadingEventImage,
    createTicket,
    CreatedTicket,
    isCreatingTicket,
  };
}

export default useMutationRequest;
