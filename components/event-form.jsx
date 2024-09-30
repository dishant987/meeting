import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema } from '@/app/lib/validators'

const EventForm = () => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            duration: 30,
            isPrivate: true
        }
    })
    return (
        <form>

        </form>
    )
}

export default EventForm
