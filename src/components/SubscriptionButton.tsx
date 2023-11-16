"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { checkSubscription } from '@/lib/subscription'
import { Zap } from 'lucide-react'
import axios from 'axios'

type Props = {
    isPro: boolean | undefined
}

const SubscriptionButton = ({isPro}: Props) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url
        } catch (error) {
            console.log("STRIPE_CLIENT_ERROR", error)
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <Button variant={isPro ? "default" : "premium"} className='mt-2'>
        {isPro ? "Manage Subscription" : "Upgrade to Pro"}
        {!isPro && <Zap className='h-4 w-4 fill-white ml-2' />}
    </Button>
  )
}

export default SubscriptionButton