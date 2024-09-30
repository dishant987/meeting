'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users } from 'lucide-react'

const testimonials = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Project Manager",
        comment: "This scheduler app has revolutionized how our team coordinates meetings. It's intuitive and saves us hours each week!",
        // avatar: "/placeholder.svg?height=100&width=100"
    },
    {
        id: 2,
        name: "Sarah Lee",
        role: "Freelance Designer",
        comment: "As someone working with clients in different time zones, this app is a lifesaver. The time zone feature is spot on!",
        // avatar: "/placeholder.svg?height=100&width=100"
    },
    {
        id: 3,
        name: "Mike Chen",
        role: "Startup Founder",
        comment: "The privacy controls are fantastic. I can share my availability without compromising my schedule. Highly recommended!",
        // avatar: "/placeholder.svg?height=100&width=100"
    },
    {
        id: 4,
        name: "Emily Taylor",
        role: "HR Manager",
        comment: "Scheduling interviews has never been easier. The reminders feature ensures we have fewer no-shows. It's a game-changer!",
        // avatar: "/placeholder.svg?height=100&width=100"
    },
    {
        id: 5,
        name: "Chris Smith",
        role: "Software Engineer",
        comment: "The integration with calendars is seamless. This app is a must-have for busy professionals!",
        // avatar: "/placeholder.svg?height=100&width=100"
    }
]
const works = [
    {
        id: 1,
        name: "Sign Up",
        description: "Create your free Scheduling account",

    },
    {
        id: 2,
        name: "Set Avalibility",
        description: "Define your availability for meetings",


    },
    {
        id: 3,
        name: "Share Your Link",
        description: "Send your link to your clients to schedule meetings",


    },
    {
        id: 4,
        name: "Get Booked",
        description: "Recive confirmation of your meeting",


    }

]

export default function Testimonials() {
    const [api, setApi] = useState()


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (api) {
                api.scrollNext()
            }
        }, 5000)

        return () => clearInterval(intervalId)
    }, [api])

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8  dark:text-foreground text-black">What Our Users Say</h2>
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full  mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial) => (
                            <CarouselItem key={testimonial.id} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 pl-4">
                                <Card className="h-full bg-card dark:bg-card">
                                    <CardContent className="flex flex-col justify-between h-full p-6">
                                        <p className="text-center text-foreground dark:text-foreground">&quot;{testimonial.comment}&quot;</p>
                                        <div className="flex justify-start items-center  mt-4">
                                            <Avatar className="w-12 h-12 mr-4">
                                                <AvatarImage
                                                    // src={testimonial.avatar}
                                                    alt={`${testimonial.name}'s avatar`} />
                                                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">{testimonial.name}</h3>
                                                <p className=" text-[12px] font-medium text-muted-foreground dark:text-muted-foreground ">{testimonial.role}</p>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <div className="flex items-center justify-center mt-4 space-x-2">
                        <CarouselPrevious variant="outline" className="bg-primary text-primary-foreground duration-500 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90" />
                        <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                            {current} / {count}
                        </span>
                        <CarouselNext variant="outline" className="bg-primary text-primary-foreground duration-500  dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90" />
                    </div> */}
                </Carousel>
                <div className="flex justify-center mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => api?.scrollTo(0)}
                        className="bg-primary text-primary-foreground  dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                    >
                        View All
                    </Button>
                </div>



            </div>
            <div className="container px-4 py-20 md:px-1">
                <h2 className="text-3xl font-bold text-center mb-10 text-primary">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {works.map((step) => (

                        <Card key={step.id} className="flex flex-col items-center text-center">
                            <CardHeader className="p-4 flex flex-col items-center text-center" >
                                <div className="w-12 h-12 rounded-full bg-blue-200 text-2xl font-semibold flex items-center justify-center mb-4">
                                    <span className='text-black '>{step.id}</span>
                                </div>
                                <CardTitle className="text-xl font-bold">{step.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>

                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}