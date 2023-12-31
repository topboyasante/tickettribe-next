import DiscoverEvents from "@/components/homepage/DiscoverEvents";
import Hero from "@/components/homepage/Hero";
import Steps from "@/components/homepage/Steps";
import React from "react";

function Page() {
  return (
    <main>
      <Hero />
      <DiscoverEvents/>
      <Steps/>
    </main>
  );
}

export default Page;
