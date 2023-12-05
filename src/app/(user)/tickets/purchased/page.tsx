"use client"
import { useAuthFetch } from '@/hooks/useFetch';
import React from 'react'

function Page() {
  const { data: PurchasedTickets, isLoading: IsFetchingPurchasedTickets } = useAuthFetch(
    "my-tickets",
    "attendants/purchased-tickets",
    (data) => {
      return data.purchaseTickets;
    }
  );
  console.log(PurchasedTickets)
  return (
    <div>Page</div>
  )
}

export default Page