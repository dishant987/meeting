"use client"

import { useUser, UserButton } from '@clerk/nextjs'
import { Calendar, Clock, Users, Video, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BarLoader } from 'react-spinners'

const navItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: Users,
    },
    {
        name: "Meetings",
        href: "/meetings",
        icon: Video,
    },
    {
        name: "Events",
        href: "/events",
        icon: Calendar,
    },
    {
        name: "Availability",
        href: "/availability",
        icon: Clock,
    },
]

function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-700 border-t md:hidden">
            <div className="flex justify-around">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center  py-2 px-3 text-xs ${pathname === item.href ? 'text-blue-600' : 'text-gray-500'
                            }`}
                    >
                        <item.icon className="h-6 w-6 mb-1" />
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export function AppSidebar() {
    const pathname = usePathname()


    const Sidebar = () => (
        <div className="flex h-screen flex-col gap-2">
            <ScrollArea className="flex-1 px-3 mt-5">
                <div className="flex flex-col gap-2 py-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 duration-300 text-gray-500 font-semibold  transition-all hover:text-gray-900 ${pathname === item.href ? 'bg-blue-100 text-gray-900' : ''
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )

    return (
        <>

            <aside className="hidden border-r bg-white md:block md:w-[300px]">
                <Sidebar />
            </aside>
        </>
    )
}

export function AppLayout({ children }) {
    const { isLoaded, isSignedIn } = useUser()

    if (!isLoaded) {
        return (
            <BarLoader color="#36d7b7" width="100%" />
        )

    }

    if (!isSignedIn) {
        return <div className="flex h-screen items-center justify-center">
            Please sign in to access this page.
        </div>
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto p-8 pb-16 md:pb-8">
                {children}
            </main>
            <BottomNav />
        </div>
    )
}

export default AppLayout