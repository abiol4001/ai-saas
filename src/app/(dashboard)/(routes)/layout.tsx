import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({children}: Props) => {
  return (
    <div className='h-full relative'>
        <div className='hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900'>
            <Sidebar />
        </div>
        <main className='md:pl-72'>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout