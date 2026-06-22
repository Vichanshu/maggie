"use client"
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { json } from 'zod'

function Client() {
  const trpc= useTRPC()
  const user = useQuery(trpc.hello.queryOptions())
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center'>
        {JSON.stringify(user.data)}
    </div>
  )

}

export default Client