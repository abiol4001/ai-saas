import { LandingHero } from '@/components/LandingHero'
import { LandingNavbar } from '@/components/LandingNavbar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
      <div className="h-[100vh] bg-[#111827]">
          <LandingNavbar />
          <LandingHero />
      </div>
  )
}

export default page