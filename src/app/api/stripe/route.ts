import { prisma } from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


const settingsUrl = absoluteUrl("/settings")

export async function GET() {
    try {
        const {userId} = auth()
        const user = await currentUser()

        if(!userId || !user) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: {
                userId
            }
        })
    } catch (error) {
        console.log("STRIPE_ERROR", error)
        return new NextResponse("Internal error", {status: 500})
    }
}