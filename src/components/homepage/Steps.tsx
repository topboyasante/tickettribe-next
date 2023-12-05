import { IoMdCreate } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { CiShare2, CiMoneyBill } from "react-icons/ci";
function Steps() {
  return (
    <section className="w-full p-5 ">
      <section className="max-w-screen-xl mx-auto">
        <section className="w-full">
          <h1 className="text-xl lg:text-3xl font-bold mb-2">
            Be a Star Event Host in 4 Easy Steps
          </h1>
          <p>
            Ensure seamless registration and ticketing. Get paid quickly and
            securely.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
          <section className="col-span-1 border-[4px] dark:border-[#404040] px-5 py-8 rounded-3xl">
            <section>
              <section className="bg-primary-light dark:bg-primary-dark text-white dark:text-black p-3 rounded-full w-fit mb-2">
                <IoMdCreate />
              </section>
              <br />
              <h1 className="text-xl font-bold">Create your event</h1>
              <p className="text-[#777777] mt-3">
                Define your event&apos;s purpose, audience, and unique features.
                Craft a compelling description to attract attendees and set the
                tone for a memorable experience.
              </p>
            </section>
          </section>
          <section className="col-span-1 border-[4px] dark:border-[#404040] px-5 py-8 rounded-3xl">
            <section>
              <section className="bg-primary-light dark:bg-primary-dark text-white dark:text-black p-3 rounded-full w-fit mb-2">
                <IoTicketOutline />
              </section>
              <br />
              <h1 className="text-xl font-bold">Create your Tickets</h1>
              <p className="text-[#777777] mt-3">
                Use our ticketing platform with secure payment options.
                Customize ticket types to cater to different audience
                preferences. Ensure a seamless and quick registration process.
              </p>
            </section>
          </section>
          <section className="col-span-1 border-[4px] dark:border-[#404040] px-5 py-8 rounded-3xl">
            <section>
              <section className="bg-primary-light dark:bg-primary-dark text-white dark:text-black p-3 rounded-full w-fit mb-2">
                <CiShare2 />
              </section>
              <br />
              <h1 className="text-xl font-bold">Share your event</h1>
              <p className="text-[#777777] mt-3">
                Utilize social media, email, and partnerships for maximum
                exposure. Create visually appealing content highlighting key
                event details. Encourage attendees to share, expanding your
                event&apos;s reach.
              </p>
            </section>
          </section>
          <section className="col-span-1 border-[4px] dark:border-[#404040] px-5 py-8 rounded-3xl">
            <section>
              <section className="bg-primary-light dark:bg-primary-dark text-white dark:text-black p-3 rounded-full w-fit mb-2">
                <CiMoneyBill />
              </section>
              <br />
              <h1 className="text-xl font-bold">Make Money!</h1>
              <p className="text-[#777777] mt-3">
                Use our reliable payment system for quick and secure
                transactions. Monitor ticket sales and explore additional
                revenue streams like sponsorships or merchandise sales.
                Celebrate the financial success of your event.
              </p>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Steps;
