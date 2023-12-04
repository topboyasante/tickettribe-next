"use client";
import Button from "@/components/ui/buttons/Button";
import Logo from "@/components/ui/logo/Logo";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignInForm() {
  const router = useRouter();
  const [isReqSent, setIsReqSent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  async function onSubmit(data: LoginInput) {
    setIsReqSent(true);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.error) {
      console.log(res.error);
      toast.error(`${res.error}`);
      setIsReqSent(false);
    } else {
      setIsReqSent(false);
      router.push("/events");
    }
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <section className="max-w-[95%] lg:max-w-[60%] mx-auto">
      {/* Heading */}
      <section className="w-full">
        <Logo />
        <p className="text-[#777777]">Enter your credentials to log in</p>
      </section>
      <br />
      {/* Form */}
      <section className="w-full">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 mt-2 dark:border-[#404040] bg-transparent outline-none appearance-none w-full rounded px-4 py-2 lg:px-2 lg:py-1"
              {...register("email")}
            />
          </section>
          <br />
          <section>
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <section className="flex items-center rounded px-4 py-2 lg:px-2 lg:py-1 w-full border-2 mt-2 dark:border-[#404040] bg-transparent ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-[95%] outline-none appearance-none bg-transparent"
                {...register("password")}
              />
              <div className="w-[5%] flex justify-center items-center">
                {showPassword ? (
                  <div onClick={() => setShowPassword(!showPassword)}>
                    <AiOutlineEyeInvisible />
                  </div>
                ) : (
                  <div onClick={() => setShowPassword(!showPassword)}>
                    <AiOutlineEye />
                  </div>
                )}
              </div>
            </section>
          </section>
          <br />
          <section className="mb-3">
            <Link
              href={`/auth/forgot-password`}
              className="font-bold text-primary"
            >
              Forgot Password?
            </Link>
          </section>
          <Button size="sm" type="primary" isPerformingAction={isReqSent}>
            Sign In
          </Button>
        </form>
      </section>
      <br />
      {/* Sign Up Link */}
      <section>
        <p>
          Don't have an account?{" "}
          <span className="text-primary-light dark:text-primary-dark font-bold">
            <Link href={`/auth/sign-up`}>Sign Up</Link>
          </span>
        </p>
      </section>
    </section>
  );
}

export default SignInForm;
