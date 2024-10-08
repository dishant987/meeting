import { getEventDetails } from '@/actions/events'

import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import EventDetails from './_components/event-details'
import BookingForm from './_components/booking-form'


export async function generateMetadata({ params }) {
    const event = await getEventDetails(params.username, params.eventId)
    if (!event) {
        return {
            title: 'Event not found'
        }
    }
    return {
        title: `Book ${event.title} with ${event.user.name} | Scheduling App`,
        description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}. View available public events and book a schedules.`,
    }
}

const EventPage = async ({ params }) => {
    const event = await getEventDetails(params.username, params.eventId)

    if (!event) {
        notFound()
    }
    return (
        <div className='flex flex-col justify-center lg:flex-row px-4 py-8'>

            <EventDetails event={event} />
            <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
                <BookingForm />
            </Suspense>
        </div>
    )
}
export default EventPage
