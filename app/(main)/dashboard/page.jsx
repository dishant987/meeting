"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usernameSchema } from '@/app/lib/validators'
import useFetch from '@/hooks/use-fetch'
import { updateUsername } from '@/actions/user'
import toast from 'react-hot-toast'



const Dashboard = () => {
  const { user, isLoaded } = useUser()
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(usernameSchema)
  })

  useEffect(() => {
    if (user) {
      setValue("username", user?.username)
    }
  }, [user, setValue])

  // const { error, loading, fn: fnUpdateUsername, data: response } = useFetch(updateUsername)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await updateUsername(data.username)
      if (response.success === true && response.message === "Username updated") {
        toast.success(response.message)
      }
      if (response.success === false) {
        toast.error(response.message)
      }


    } catch (error) {
      setError(error)
      toast.error(error.message)

    } finally {
      setLoading(false)
    }

  }
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-5xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent '>Dashboard</h1>
      <Card >


        <CardHeader>
          <CardTitle>Welcome, <span className='font-bold '>{user?.firstName}</span></CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className=' space-y-4'>
            <div className='flex  items-center gap-2'>
              <span>{window?.location.origin}</span>
              <Input {...register("username")} placeholder={"username"} />
            </div>
            {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {loading ? <Button disabled>Updating...</Button> : <Button type='submit'>Update Username</Button>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
