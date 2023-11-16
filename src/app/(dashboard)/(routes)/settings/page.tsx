import Heading from '@/components/Heading'
import SubscriptionButton from '@/components/SubscriptionButton'
import { checkSubscription } from '@/lib/subscription'
import { Settings } from 'lucide-react'

import React from 'react'

type Props = {}

const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription()

  return (
    <div className=''>
      <Heading title="Settings" description="Manage account settings" icon={Settings} iconColor='text-blue-500' bgColor='bg-blue-500/10' />
      <div className='px-4 lg:px-8 w-full'>
        <div className='text-muted-foreground'>
          {isPro ? "You are currently on a pro plan." : "You are currently on a free plan." }
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default SettingsPage