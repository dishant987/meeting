import React from 'react'
import AvailabilityForm from './_components/availability-form'
import { getUserAvailability } from '@/actions/availability'
import { defaultAvailability } from './data'


const AvailabilityPage = async () => {
  const availability = await getUserAvailability()
  console.log(availability)
  return (
    <div>
      <h1 className='text-5xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent pb-6 '>Availability</h1>
      <AvailabilityForm initalData={availability || defaultAvailability} />
    </div>
  )
}

export default AvailabilityPage
