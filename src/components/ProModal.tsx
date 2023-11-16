'use client'

import { useEffect, useState } from "react"
import { Check, Code, Image, MessageSquare, Music, Video, Zap } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useProModal } from "@/hooks/useProModal"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import axios from "axios"

type Props = {}

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-sky-500",
        bgColor: "bg-sky-500/10"

    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"

    },
    {
        label: "Image Generation",
        icon: Image,
        color: "text-pink-800",
        bgColor: "bg-pink-800/10"

    },
    {
        label: "Video Generation",
        icon: Video,
        color: "text-orange-600",
        bgColor: "bg-orange-600/10"

    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-green-600",
        bgColor: "bg-green-600/10"

    },
]

const ProModal = (props: Props) => {

    const proModal = useProModal()

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
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to AISaaS
                        <Badge variant="premium" className="uppercase py-1 text-sm">
                            Pro
                        </Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
                        <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon />
                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.label}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5" />
                        </Card>
                    ))}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button disabled={isLoading} onClick={handleClick} className="w-full" variant="premium">
                    Upgrade
                    <Zap className="h-4 w-4 fill-white ml-2" />
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ProModal