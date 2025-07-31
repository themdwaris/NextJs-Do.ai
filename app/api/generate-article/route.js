

import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import sql from "@/config/db";
// import { clerkClient } from "@clerk/nextjs/server";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req) {
  try {
    // const { userId } = getAuth(req);
    const { prompt, length,userId } = await req?.json();
     
     
    if (!userId) {
      return NextResponse.json({ message: "User not authenticated", success: false });
    }
    
    
    const user = await clerkClient?.users?.getUser(userId);
    const plan = user?.privateMetadata?.plan || "free";
    const free_usage = user?.privateMetadata?.free_usage || 0;

    

    if (plan !== "premium" && free_usage >= 10) {
      return NextResponse.json({
        message: "Free usage limit reached. Upgrade to premium.",
        success: false,
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return NextResponse.json({ content, success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: error.message, success: false });
  }
}
