import axios, { AxiosError } from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";

const queryClient = new QueryClient();

function useAuth<T>(key?: string) {
  const router = useRouter();
  const { reset } = useForm();
  const session = useSession();
  const accessToken = session.data?.user.token;

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
      toast.success("User successfully created! Kindly Verify your Account. Check your mail for a verification link.");
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`${error?.response?.data.msg}`);
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
      toast.error(`${error?.response?.data.msg}`);
    },
  });

  const {
    mutate: SendEmail,
    data: Email,
    isPending: isSendingEmail,
    isSuccess: HasSentEmail,
  } = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const res = await axios.post(
        `https://ticket-tribe.onrender.com/api/v1/auth/forgot-password`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        "A Reset Password Link has been sent to your email. Click on the Link to Reset your Password."
      );
      reset();
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`There was an error. Please Try Again.`);
    },
  });

  const {
    mutate: ResetPassword,
    data: ResetPasswordData,
    isPending: IsResettingPassword,
    isSuccess: HasResetPassword,
  } = useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      token: string;
    }) => {
      const res = await axios.post(
        `https://ticket-tribe.onrender.com/api/v1/auth/reset-password`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        "You have Successfully Reset your password. Please Sign In!"
      );
      router.push("/auth/sign-in");
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`There was an error. Please Try Again.`);
    },
  });

  const {
    mutate: ChangePassword,
    data: ChangePasswordData,
    isPending: IsChangingPassword,
    isSuccess: HasChangedPassword,
  } = useMutation({
    mutationFn: async (payload: {
      oldpassword: string;
      newpassword: string;
    }) => {
      const res = await axios.patch(
        `https://ticket-tribe.onrender.com/api/v1/user/updateUserPassword`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      signOut();
      router.push("/auth/sign-in");
      toast.success(
        "You have Successfully Changed your password. Please Sign In!",
        { duration: 5000 }
      );
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`There was an error. Please Try Again.`);
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
    SendEmail,
    isSendingEmail,
    HasSentEmail,
    Email,
    HasResetPassword,
    ResetPassword,
    ResetPasswordData,
    IsResettingPassword,
    ChangePassword,
    IsChangingPassword,
    HasChangedPassword,
    ChangePasswordData,
  };
}

export default useAuth;
