"use client";
import Button from "@/components/ui/buttons/Button";
import Logo from "@/components/ui/logo/Logo";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignUpForm() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { SignUp, isSigningUp } = useAuth("events");

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<RegisterInput>();

  function onSubmit(data: RegisterInput) {
    if (data.password !== data.confirm_password) {
      toast.error("Passwords are not the same");
      return;
    }
    const payload = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    };
    SignUp(payload);
  }
  return (
    <section className="max-w-[95%] lg:max-w-[60%] mx-auto">
      {/* Heading */}
      <section className="w-full">
        <Logo />
        <p className="text-[#777777]">Create your account</p>
      </section>
      <br />
      {/* Form */}
      <section className="w-full">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="fullname" className="font-bold">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your fullname"
              className="border-2 mt-2 dark:border-[#404040] bg-transparent outline-none appearance-none w-full rounded px-4 py-2 lg:px-2 lg:py-1"
              {...register("full_name")}
            />
          </section>
          <br />
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
                type={showPassword1 ? "text" : "password"}
                placeholder="Enter your password"
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
          <Button size="sm" type="primary" isPerformingAction={isSigningUp}>
            Sign Up
          </Button>
        </form>
      </section>
      <br />
      {/* Sign Up Link */}
      <section>
        <p>
          Already have an account?{" "}
          <span className="text-primary-light dark:text-primary-dark font-bold">
            <Link href={`/auth/sign-in`}>Sign In</Link>
          </span>
        </p>
      </section>
    </section>
  );
}

export default SignUpForm;
