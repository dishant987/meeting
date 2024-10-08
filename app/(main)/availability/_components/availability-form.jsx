"use client"
import { availabilitySchema } from '@/app/lib/validators'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { timeSlots } from '../data'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import updateAvailability from '@/actions/availability'
import toast from 'react-hot-toast'

const AvailabilityForm = ({ initalData }) => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, setValue, formState: { errors }, control, watch } = useForm({
        resolver: zodResolver(availabilitySchema),
        defaultValues: { ...initalData }
    })
   
    const onSubmit = async (data) => {
        // setLoading(true)
        console.log(data);
        return;
        try {
            const res = await updateAvailability(data)

            if (res.success === true && res.message === "Availability updated successfully") {
                toast.success(res.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                ].map((day) => {
                    const isAvailable = watch(`${day}.isAvailable`);

                    return (
                        <div key={day} className='flex items-center space-x-4 mb-4'>
                            <Controller
                                name={`${day}.isAvailable`}
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            setValue(`${day}.isAvailable`, checked)
                                            if (!checked) {
                                                setValue(`${day}.startTime`, "09:00")
                                                setValue(`${day}.endTime`, "17:00")
                                            }

                                        }}
                                    />
                                )}
                            />

                            <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                            {isAvailable && (
                                <>
                                    <Controller
                                        name={`${day}.startTime`}
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    {/* {console.log(field)} */}
                                                    <SelectTrigger className='w-[180px]'>
                                                        <SelectValue placeholder="Start Time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeSlots.map((timeSlot) => (
                                                            <SelectItem key={timeSlot} value={timeSlot}>{timeSlot}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )
                                        }}
                                    />
                                    <span>to</span>
                                    <Controller
                                        name={`${day}.endTime`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                               
                                                <SelectTrigger className='w-[180px]'>
                                                    <SelectValue placeholder="End Time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {timeSlots.map((timeSlot) => (
                                                        <SelectItem key={timeSlot} value={timeSlot}>{timeSlot}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors[day]?.endTime && (
                                        <span className="text-red-500">{errors[day]?.endTime?.message}</span>

                                    )}
                                </>
                            )}
                        </div>
                    )
                })}
                <div className='flex items-center space-x-4'>
                    <span className='w-48'>Minimum gap before booking (minutes):</span>
                </div>
                <Input type="number" {...register("timeGap", { valueAsNumber: true })} className="w-[180px] mt-3  " />
                {errors?.timeGap && (
                    <span className="text-red-500 block mt-4">{errors?.timeGap?.message}</span>
                )}

                <Button disabled={loading} type="submit" className="mt-4">
                    {loading ? "Updating..." : "Update Availability"}
                </Button>
            </form>
        </div>
    )
}

export default AvailabilityForm
