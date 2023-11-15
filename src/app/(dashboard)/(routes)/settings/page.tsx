import Heading from '@/components/Heading'
import { Badge } from '@/components/ui/badge'
import { Settings } from 'lucide-react'

import React from 'react'

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <div className=''>
      <Heading title="Settings" description="Change your account settings" icon={Settings} iconColor='text-blue-500' bgColor='bg-blue-500/10' />
      <div className='px-4 lg:px-8 w-full h-[calc(100vh-180px)] flex justify-center items-center'>
        <Badge className='py-1 text-base'>
          Coming Soon! This page is under construction and will be available shortly.
        </Badge>
      </div>
    </div>
  )
}

export default SettingsPage