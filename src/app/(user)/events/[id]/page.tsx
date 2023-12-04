import EventDetail from '@/components/events/EventDetail'
import React from 'react'

function page({ params }: { params: { id: string } }) {
  return (
    <div><EventDetail isAuth={true} eventId={params.id}/></div>
  )
}

export default page