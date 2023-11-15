"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { MAX_FREE_COUNTS } from "../../constants"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { Zap } from "lucide-react"

type Props = {
    apiLimitCount: number
}

const FreeTrialCounter = ({apiLimitCount = 0}: Props) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

  return (
    <div className="px-3">
        <Card className="bg-white/10 border-0">
            <CardContent className="py-6">
                <div className="text-sm text-center text-white mb-4 space-y-2">
                    <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations</p>
                    <Progress className="h-3" value={(apiLimitCount/MAX_FREE_COUNTS) * 100} />
                </div>
                <Button className="w-full" variant="premium">
                    Upgrade
                    <Zap className="h-4 w-4 fill-white ml-2" />
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default FreeTrialCounter