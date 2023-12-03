import { FaGlobe } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";

function page() {
  return (
    <main className="w-screen h-full">
      <section
        className={`w-full h-[30vh]
      bg-bottom 
      bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070')]`}
      >
        <section className="w-full h-full backdrop-brightness-50 flex justify-center items-center">
          <h1 className="font-bold text-3xl xl:text-4xl text-white">
            Bringing the world together through live experiences
          </h1>
        </section>
      </section>
      <main className="w-screen bg-primary dark:text-white h-full px-5 py-8 flex justify-center items-center">
        <h3 className="text-center lg:w-[70%] mx-auto text-lg">
          TicketTribe is a global self-service ticketing platform for live
          experiences that allows anyone to create, share, find and attend
          events that fuel their passions and enrich their lives. From music
          festivals, marathons, conferences, community rallies, and fundraisers,
          to gaming competitions and air guitar contests. Our mission is to
          bring the world together through live experiences.
        </h3>
      </main>
      <section className="max-w-screen-xl mx-auto dark:text-white w-full p-5">
        <h2 className="text-3xl font-bold text-center">2023 at a Glance</h2>
        <section className="flex flex-col lg:flex-row justify-between items-center gap-5 my-5">
          <div className="border dark:border-[#404040] p-5 w-full rounded">
            <FaGlobe size={35} />
            <p className="mt-3">5M total events in nearly 180 countries</p>
          </div>
          <div className="border dark:border-[#404040] p-5 w-full rounded">
            <LuPartyPopper size={35} />
            <p className="mt-3">798K free + paid creators</p>
          </div>
          <div className="border dark:border-[#404040] p-5 w-full rounded">
            <IoTicketOutline size={35} />
            <p className="mt-3">284M total tickets</p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default page;
