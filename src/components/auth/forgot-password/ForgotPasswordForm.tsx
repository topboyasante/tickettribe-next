"use client"
import Button from '@/components/ui/buttons/Button';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';

function ForgotPasswordForm() {
    const { SendEmail, isSendingEmail } = useAuth("send-email");
    const {
      register,
      handleSubmit,
      // formState: { errors },
    } = useForm<{ email: string }>();
  
    function onSubmit(data: {email:string}) {
      SendEmail(data);
    }
  return (
    <section className="max-w-[95%] lg:max-w-[60%] mx-auto">
    {/* Heading */}
    <section className="w-full">
      <h1 className="font-bold text-2xl">Forgot your password?</h1>
      <p className="text-[#777777]">
        Not a problem! It happens to the best of us.
      </p>
      <p className="text-[#777777]">
        We will send you an email with instructions on how to reset your
        password.
      </p>
    </section>
    <br />
    {/* Form */}
    <section className="w-full">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="border-2 mt-2 dark:border-[#404040] bg-transparent outline-none appearance-none w-full rounded px-4 py-2 lg:px-2 lg:py-1 my-3"
          {...register("email", { required: true })}
        />
        <Button size='sm' type="primary" isPerformingAction={isSendingEmail}>
          Submit
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
  )
}

export default ForgotPasswordForm