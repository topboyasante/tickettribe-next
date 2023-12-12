"use client"
import EventDetail from "@/components/events/EventDetail";
import { useSession } from "next-auth/react";
import React from "react";

function Page({ params }: { params: { id: string } }) {
  const session = useSession();
  const token = session.data?.user.token;

  return (
    <div>
      <EventDetail isAuth={token ? true : false} eventId={params.id} />
    </div>
  );
}

export default Page;
