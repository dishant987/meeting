"use client"
import * as React from "react"
import {
    Drawer,

    DrawerContent,

    DrawerHeader,
    DrawerTitle,

} from "@/components/ui/drawer"
import { useRouter, useSearchParams } from "next/navigation"
import EventForm from "./event-form"

export default function CreateEventDrawer() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    React.useEffect(() => {
        const create = searchParams.get("create")
        if (create === "true") {
            setOpen(true)
        }
    }, [searchParams])
    const handleClose = () => {
        setOpen(false)
        if (searchParams.get("create") === "true") {
            router.replace(window?.location?.pathname)
        }
    }
    return (
        <Drawer open={open} onClose={handleClose}>

            <DrawerContent>
                <div className="mx-auto w-full max-w-3xl m-10">
                    <DrawerHeader>
                        <DrawerTitle className="text-3xl p-3 text-center">Create New Event</DrawerTitle>

                    </DrawerHeader>
                    <EventForm onSubmitForm={handleClose} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}
