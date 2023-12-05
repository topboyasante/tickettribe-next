import EventDetail from '@/components/events/EventDetail'
import React from 'react'

function Page({ params }: { params: { id: string } }) {
  return (
    <div><EventDetail isAuth={true} eventId={params.id}/></div>
  )
}

export default Page