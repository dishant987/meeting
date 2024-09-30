"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20
            const y = (e.clientY / window.innerHeight - 0.5) * 20
            setPosition({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 text-center">
            <motion.div
                className="relative mb-8 text-9xl font-bold text-gray-200"
                animate={{ x: position.x, y: position.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
                404
            </motion.div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">Page not found</h1>
            <p className="mb-8 max-w-md text-lg text-gray-600">
                Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
            </p>
            <Button
                onClick={() => router.push('/')}
                className=""
            >
                Go back home
            </Button>
            <div className="mt-12 text-sm text-gray-500">
                Lost? Try moving your mouse around to guide the 404!
            </div>
        </div>
    )
}