"use client"
import { useTRPC } from '@/trpc/client'
import { useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { json } from 'zod'
import { authClient } from '@/lib/auth-client'
import {redirect} from 'next/navigation'

function Client() {

  const handleClick=async()=> {
    await authClient.signOut()
    redirect('/login')
  }



  const trpc= useTRPC()
  const user = useSuspenseQuery(trpc.hello.queryOptions())
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center flex-col gap-4'>
        {JSON.stringify(user.data)}
        <button onClick={handleClick} className='border-2 bg-red-500 rounded-md p-2 hover:bg-red-600'>LogOut</button>
    </div>
  )

}

export default Client