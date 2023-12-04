import axios, { AxiosError } from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

function useAuth<T>(key?: string) {
  const router = useRouter()
  const {
    mutate: SignUp,
    data: SignUpData,
    isPending: isSigningUp,
    isSuccess: HasSignedUp,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.post(
        `https://ticket-tribe.onrender.com/api/v1/auth/register`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      toast.success("User successfully created! Kindly Verify your Account.");
    },
    onError: (error: AxiosError<any, any>) => {
      console.log(error);
      toast.error(`${error?.response?.data.message}`);
    },
  });

  const {
    mutate: verifyAccount,
    data: verifyAccountData,
    isPending: isverifyingAccount,
    isSuccess: HasVerifiedAccount,
    isError: VerificationFailed,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.post(
        `https://ticket-tribe.onrender.com/api/v1/auth/verify-email`,
        payload
      );
      router.push("/auth/sign-in");
      toast.success("Your Account has been verified!");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      // reset();
    },
    onError: (error: AxiosError<any, any>) => {
      console.log(error);
      toast.error(`${error?.response?.data.msg}`);
    },
  });

  return {
    SignUp,
    isSigningUp,
    HasSignedUp,
    SignUpData,
    verifyAccount,
    verifyAccountData,
    isverifyingAccount,
    HasVerifiedAccount,
    VerificationFailed,
  };
}

export default useAuth;
