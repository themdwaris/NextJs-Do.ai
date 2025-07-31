// app/api/webhook/route.js

import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  const body = await req.json();
  const eventType = body.type;

  console.log("📩 Webhook received:", eventType, body);

  if (eventType === "billing.subscription.updated") {
    const userId = body.data.user.id;
    const plan = body.data.subscription.plan.name.toLowerCase(); // "premium" or "free"

    await clerkClient.users.updateUser(userId, {
      privateMetadata: { plan },
    });

    console.log(`✅ Plan updated for user ${userId} to ${plan}`);
    return new Response("Plan updated", { status: 200 });
  }

  return new Response("Unhandled event", { status: 200 });
}
