"use client"
import Button from "@/components/ui/buttons/Button";
import PricingCard from "@/components/ui/pricing/PricingCard";
import Link from "next/link";

function page() {
    const pricingData = [
        {
          title: "Free Events",
          price: "0",
          features: [
            "Free Registrations",
            "Free Ticket Verification",
            "Up to 100 Tickets",
            "Unlimited Events",
          ],
          buttonLabel: "Get Started",
        },
        {
          title: "Tier 1",
          price: "1000",
          features: [
            "Free Registrations",
            "Free Ticket Verification",
            "Up to 1000 Tickets",
            "Unlimited Events",
          ],
          buttonLabel: "Get Started",
        },
        {
          title: "Tier 2",
          price: "2500",
          features: [
            "Free Registrations",
            "Free Ticket Verification",
            "Up to 2500 Tickets",
            "Unlimited Events",
          ],
          buttonLabel: "Get Started",
        },
        {
          title: "Custom Tier",
          price: "4000+",
          features: [
            "Free Registrations",
            "Free Ticket Verification",
            "From 4000 Tickets",
            "Unlimited Events",
          ],
          buttonLabel: "Get Started",
        },
      ];
      return (
        <main className="w-full h-full pt-[7vh]">
          <main className="w-full h-full p-5">
            <section className="max-w-screen-xl mx-auto">
              <h1 className="text-2xl lg:text-3xl font-bold text-primary">
                Pricing
              </h1>
              <p className="">
                No set-up fees or hidden costs, sign up today and find out how
                TicketTribe can help you sell tickets for your upcoming event.
              </p>
              <br />
              <Link href={`/events/create`}>
                <Button size="sm" type="primary">Create An Event</Button>
              </Link>
            </section>
          </main>
          <section className="max-w-screen-xl mx-auto p-5 lg:px-0">
            <section className="grid grid-cols-1 md:grid-cols-4 w-full gap-5">
              {pricingData.map((data, index) => (
                <PricingCard
                  key={index}
                  title={data.title}
                  price={data.price}
                  features={data.features}
                  buttonLabel={data.buttonLabel}
                />
              ))}
            </section>
          </section>
        </main>
      );
}

export default page