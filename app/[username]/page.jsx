import { getUserByUsername } from '@/actions/user'
import EventCard from '@/components/event-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { notFound } from 'next/navigation'
import React from 'react'

const UserPage = async ({ params }) => {
    const user = await getUserByUsername(params.username)
    console.log(user)
    if (!user) {
        notFound()
    }
    return (
        <div className='container mx-auto px-4 py-4'>
            <div className='flex flex-col items-center mb-8'>
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className='text-3xl font-bold mb-2'>{user.name}</h1>
                <p className='text-gray-600 text-center'>
                    Welcome to my scheduling page. please select an event below to book a call with me.
                </p>
            </div>

            {user.events.length === 0 ? (
                <p className='text-gray-600 text-center'>No events found</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>{user.events.map((event) => {
                    return (
                        <EventCard
                            key={event.id}
                            event={event}
                            username={params.username}
                            isPublic
                        />
                    )
                })}</div>
            )
            }

        </div>
    )
}
export default UserPage
