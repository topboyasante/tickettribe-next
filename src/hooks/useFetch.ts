import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

//For Requests that do not need the accessToken
export function useFetch(
  key: string,
  url: string,
  customSelect?: (data: any) => any // A function to tansform the data into how we need it
) {
  const { isLoading, data } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(
        `https://ticket-tribe.onrender.com/api/v1/${url}`
      );
      return res.data;
    },
    select:
      customSelect ||
      ((data) => {
        return data.events;
      }),
  });

  return {
    isLoading,
    data,
  };
}

export function useAuthFetch(
  key: string,
  url: string,
  customSelect?: (data: any) => any // A function to tansform the data into how we need it
) {
  const session = useSession();
  const accessToken = session.data?.user.token;

  const { isLoading, data } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(
        `https://ticket-tribe.onrender.com/api/v1/${url}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    enabled: session.status === "authenticated",
    select:
      customSelect ||
      ((data) => {
        return data.events;
      }),
  });

  return {
    isLoading,
    data,
  };
}

export function useFetchUser(key: string) {
  const session = useSession();
  const accessToken = session.data?.user.token;

  const { isLoading: isFetchingUser, data: User } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(
        `https://ticket-tribe.onrender.com/api/v1/user/profile`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    enabled: session.status === "authenticated",
    select: (data) => {
      return data.user;
    },
  });
  return {
    isFetchingUser,
    User,
  };
}