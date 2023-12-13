"use client";
import Button from "@/components/ui/buttons/Button";
import Logo from "@/components/ui/logo/Logo";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

function ResetEmailForm() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [userToken, setUserToken] = useState<string | null>("");

  const { ResetPassword, IsResettingPassword } = useAuth("reset-password");

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<ResetPasswordInput>();

  function onSubmit(data: ResetPasswordInput) {
    if (data.password !== data.confirm_password) {
      toast.error("Passwords are not the same");
      return;
    }
    const payload = {
      email: userEmail as string,
      password: data.password,
      token: userToken as string,
    };
    ResetPassword(payload);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenValue = searchParams.get("token");
    const emailValue = searchParams.get("email");

    setUserEmail(emailValue);
    setUserToken(tokenValue);
  }, []);

  return (
    <section className="w-full lg:w-[70%] mx-auto">
      <Logo />
      <br />

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label htmlFor="password" className="font-bold">
            New Password
          </label>
          <section className="flex items-center rounded px-4 py-2 lg:px-2 lg:py-1 w-full border-2 mt-2 dark:border-[#404040] bg-transparent ">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Enter your new password"
              className="w-[95%] outline-none appearance-none bg-transparent"
              {...register("password", { required: true })}
            />
            <div className="w-[5%] flex justify-center items-center">
              {showPassword1 ? (
                <div onClick={() => setShowPassword1(!showPassword1)}>
                  <AiOutlineEyeInvisible />
                </div>
              ) : (
                <div onClick={() => setShowPassword1(!showPassword1)}>
                  <AiOutlineEye />
                </div>
              )}
            </div>
          </section>
        </section>
        <br />
        <section>
          <label htmlFor="password" className="font-bold">
            Confirm Password
          </label>
          <section className="flex items-center rounded px-4 py-2 lg:px-2 lg:py-1 w-full border-2 mt-2 dark:border-[#404040] bg-transparent ">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Enter your password"
              className="w-[95%] outline-none appearance-none bg-transparent"
              {...register("confirm_password", { required: true })}
            />
            <div className="w-[5%] flex justify-center items-center">
              {showPassword2 ? (
                <div onClick={() => setShowPassword2(!showPassword2)}>
                  <AiOutlineEyeInvisible />
                </div>
              ) : (
                <div onClick={() => setShowPassword2(!showPassword2)}>
                  <AiOutlineEye />
                </div>
              )}
            </div>
          </section>
        </section>
        <br />
        <Button
          size="sm"
          type="primary"
          isPerformingAction={IsResettingPassword}
        >
          Submit
        </Button>
      </form>
    </section>
  );
}

export default ResetEmailForm;
