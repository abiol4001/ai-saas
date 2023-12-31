"use client"
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {

  const router = useRouter()

  const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-sky-500",
      bgColor: "bg-sky-500/10"

    },
    {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"

    },
    {
      label: "Image Generation",
      icon: Image,
      href: "/image",
      color: "text-pink-800",
      bgColor: "bg-pink-800/10"

    },
    {
      label: "Video Generation",
      icon: Video,
      href: "/video",
      color: "text-orange-600",
      bgColor: "bg-orange-600/10"

    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-600",
      bgColor: "bg-green-600/10"

    },
  ]
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Explore the power of AI</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>Chat with the smartest AI - Experience the power of AI</p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-6'>
        {tools.map((tool) => (
          <Card key={tool.href} onClick={() => router.push(tool.href)} className='px4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'>
            <div className='flex items-center gap-x-4'>
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <p className='font-bold'>{tool.label}</p>
            </div>
            <ArrowRight className='w-5 h-5 mr-2' />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard