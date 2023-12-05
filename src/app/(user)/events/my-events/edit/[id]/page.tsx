import UpdateEventDetails from '@/components/events/UpdateEventDetails'
import React from 'react'

function Page({ params }: { params: { id: string } }) {
  return (
    <UpdateEventDetails eventId={params.id}/>
  )
}

export default Page