"use client";
import Link from "next/link";
import Button from "../ui/buttons/Button";

function Hero() {
  return (
    <main className="w-full h-full pt-[7vh]">
      <section
        className={`relative w-full h-[70vh] lg:h-[50vh]
        bg-bottom 
        bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auhref=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070')]`}
      >
        <section className="w-full h-full flex flex-col gap-5 justify-center items-center backdrop-brightness-50">
          <section className="text-white w-full lg:w-1/2 text-center p-5 lg:p-0">
            <h1 className="font-bold text-xl lg:text-3xl xl:text-4xl mb-2">
              Own your events! Everything on one platform
            </h1>
            <p>
              All-in-one event ticketing platform for event organisers,
              promoters, and managers. Easily create, promote and manage your
              events of any type and size.
            </p>
          </section>
          <section className="flex flex-col md:flex-row gap-5 items-center">
            <Link href={`/events/create`}>
              <Button size="sm" type="primary">
                Create An Event
              </Button>
            </Link>
            <Link href={`/tickets`}>
              <Button size="sm" type="outline">
                Buy A Ticket
              </Button>
            </Link>
          </section>
        </section>
      </section>
    </main>
  );
}

export default Hero;
