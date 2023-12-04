"use client";
import Loader from "@/components/ui/loaders/Loader";
import Logo from "@/components/ui/logo/Logo";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

function page() {
  const { verifyAccount, isverifyingAccount, HasVerifiedAccount } =
    useAuth("events");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenValue = searchParams.get("token");
    const emailValue = searchParams.get("email");
    const data = {
      email: emailValue,
      verificationToken: tokenValue,
    };
    verifyAccount(data);
  }, [location.search]);
  return (
    <section className="w-full h-screen">
      <section className="w-full h-full flex items-center">
        {/* Left Side */}
        <section
          className={`hidden lg:block w-full h-full lg:w-[50%] 
      bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070')]`}
        ></section>
        {/* Right Side */}
        <section className="w-full lg:w-[50%] p-5">
          {isverifyingAccount ? (
            <Loader width="30" height="30" color="#006d77" />
          ) : (
            <section>
              <Logo />
              {HasVerifiedAccount ? (
                <h1>
                  Your Account has been verified! You would be redirected to
                  Sign In!{" "}
                </h1>
              ) : (
                <h1>Your Account could not be verified. Please try again. </h1>
              )}
            </section>
          )}
        </section>
      </section>
    </section>
  );
}

export default page;
