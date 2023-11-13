import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='mb-8 space-y-4'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>Explore the power of AI</h2>
      <p>Chat with the smartest AI - Experience the power of AI</p>
    </div>
  )
}

export default Dashboard