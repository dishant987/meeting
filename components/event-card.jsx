"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Link, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { deleteEvent } from '@/actions/events'

const EventCard = ({ event, username, isPublic = false }) => {
    const [isCopied, setIsCopied] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`)
            setIsCopied(true)
            toast.success("Link copied to clipboard")
            setTimeout(() => {
                setIsCopied(false)
            }, 3500)
        } catch (error) {
            console.error(error)
            toast.error("Failed to copy link")
        }

    }
    const handleDelete = async () => {
        setLoading(true)

        try {
            const res = await deleteEvent(event.id);
            console.log(res)
            if (res.success === true && res.message === "Event deleted") {
                toast.success(res.message)
                router.refresh()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }
    return (
        <Card className="flex flex-col justify-between cursor-pointer">
            <CardHeader>
                <CardTitle className="font-bold">{event.title}</CardTitle>
                <CardDescription className="flex justify-between">
                    <span>
                        {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
                    </span>
                    <span>
                        {event._count.bookings} {event._count.bookings === 1 ? "Booking" : "Bookings"}
                    </span>

                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{event.description}.</p>
            </CardContent>
            {!isPublic && <CardFooter className="flex gap-4  ">
                <Button variant="outline" className="flex items-center" onClick={handleCopy}>
                    <Link className='mr-2 h-4 w-4' /> {isCopied ? "Copied" : "Copy Link"}
                </Button>
                <Button disabled={loading} variant="destructive" onClick={handleDelete}>
                    <Trash2 className='mr-2 h-4 w-4' /> Delete
                </Button>
            </CardFooter>}
        </Card>
    )
}

export default EventCard
