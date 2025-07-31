// /app/api/upgrade-to-premium/route.js


import { clerkClient ,getAuth} from "@clerk/nextjs/server";


import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated", success: false });
  }

  await clerkClient.users.updateUser(userId, {
    privateMetadata: {
      plan: "premium",
    },
  });

  return NextResponse.json({
    message: "User upgraded to premium successfully",
    success: true,
  });
}
