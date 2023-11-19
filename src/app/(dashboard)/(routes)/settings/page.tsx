import Heading from '@/components/Heading'
import SubscriptionButton from '@/components/SubscriptionButton'
import { checkSubscription } from '@/lib/subscription'
import { Settings } from 'lucide-react'

import React from 'react'

type Props = {}

const SettingsPage = async (props: Props) => {
  const { isPro, endDate, isCanceled } = await checkSubscription()

  const inputDate = new Date(endDate);

  const formattedDate = `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${inputDate.getFullYear()}`;


  return (
    <div className=''>
      <Heading title="Settings" description="Manage account settings" icon={Settings} iconColor='text-blue-500' bgColor='bg-blue-500/10' />
      <div className='px-4 lg:px-8 w-full'>
        <div className='text-muted-foreground text-sm'>
          {isCanceled ? `Your plan will be canceled on ${formattedDate}` :
           isPro ? `You are currently on a pro plan and your plans ends on ${formattedDate}.` : "You are currently on a free plan." }
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default SettingsPage