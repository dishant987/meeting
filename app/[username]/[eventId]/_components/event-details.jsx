import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';
import React from 'react'

const EventDetails = ({ event }) => {
  console.log(event);
  const { user } = event;
  return (
    <div className='p-10 lg:w-1/3 bg-white rounded-lg'>
      <h1 className='text-3xl font-semibold mb-4'>{event.title}</h1>
      <div className='flex items-center mb-4'>
        <Avatar className="w-14 h-14 mr-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className='text-3xl font-semibold mb-2'>{user.name}</h1>
          <p className='text-gray-600'>@{user.username}</p>
        </div>
      </div>
      <div className='flex items-center mb-4'>
        <Clock className="h-6 w-6 mr-2 text-primary" />
        <span>{event.duration} minutes</span>
      </div>
      <div className='flex items-center mb-2'>
        <Calendar className="h-6 w-6 mr-2 text-primary" />
        <span>Google Meet</span>
      </div>
      <p className='text-gray-600'>{event.description}</p>
    </div>
  )
}

export default EventDetails