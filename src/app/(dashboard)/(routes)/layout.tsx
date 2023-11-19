import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { getApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = async ({children}: Props) => {

  const apiLimitCount = await getApiLimit()
  const {isPro} = await checkSubscription();

  return (
    <div className='h-full relative'>
        <div className='hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 bg-gray-900'>
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
        </div>
        <main className='md:pl-72'>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout