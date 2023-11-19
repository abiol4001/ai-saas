import { auth } from "@clerk/nextjs"
import { prisma } from "./prismadb"
import { stripe } from "./stripe"

const DAY_IN_MS = 86_400_000

export interface SubscriptionsValues {
  isPro: boolean,
  isCanceled: boolean,
  endDate: Date | null
}

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  let isCanceled = false;

  const isSubscribed =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  if (isSubscribed && userSubscription) {
    const stripePlan = await stripe.subscriptions.retrieve(
      userSubscription.stripeSubscriptionId!
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  let endDate = null;
  if (isSubscribed) {
    endDate = userSubscription.stripeCurrentPeriodEnd;
  }

  return { isPro: !!isSubscribed, isCanceled, endDate };
};