import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '@/app/lib/validators';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';

const EventForm = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            duration: 30,
            isPrivate: true,
        },
    });

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="title">
                    Event Title
                </label>
                <Input
                    id="title"
                    {...register('title')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500"
                />
                {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="description">
                    Event Description
                </label>
                <Input
                    id="description"
                    {...register('description')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500"
                />
                {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="duration">
                    Duration (minutes)
                </label>
                <Input
                    id="duration"
                    {...register('duration', { valueAsNumber: true })}
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500"
                />
                {errors.duration && <p className="text-red-500 mt-1 text-sm">{errors.duration.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="isPrivate">
                    Event Privacy
                </label>
                <Controller
                    name="isPrivate"
                    control={control}
                    render={({ field }) => (
                        <Select value={field.value ? 'true' : 'false'} onValueChange={(value) => field.onChange(value === 'true')}>
                            <SelectTrigger className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500">
                                <SelectValue placeholder="Select privacy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Private</SelectItem>
                                <SelectItem value="false">Public</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.isPrivate && <p className="text-red-500 mt-1 text-sm">{errors.isPrivate.message}</p>}
            </div>

            <Button type="submit" className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md focus:ring-indigo-500 focus:outline-none dark:bg-indigo-700 dark:hover:bg-indigo-800">
                Submit
            </Button>
        </form>
    );
};

export default EventForm;
