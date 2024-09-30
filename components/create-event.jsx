"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
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
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create New Event</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <EventForm />

                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
