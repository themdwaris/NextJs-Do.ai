
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import sql from "@/config/db";
import axios from "axios";
import connectCloudinary from "@/config/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
  await connectCloudinary();
  try {
    // const { userId } = await auth(); // Don't pass req
    const { userId,prompt, publish } = await req.json();
    // console.log(userId);
    if (!userId) {
      return NextResponse.json({
        message: "Not authenticated",
        success: false,
      });
    }

    const user = await clerkClient.users.getUser(userId);
    const plan = user?.privateMetadata?.plan;
    // console.log(user);
    
    
    if (!plan) {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: {
          plan: "premium",
        },
      });

      return NextResponse.json({
        message: "Plan set to premium for testing. Try again.",
        success: false,
      });
    }

    if (plan !== "premium") {
      return NextResponse.json({
        message: "This feature is only for premium users.",
        success: false,
      });
    }

    

    // if (plan !== "premium") {
    //   return NextResponse.json({
    //     message: "This feature is only for premium users.",
    //     success: false,
    //   });
    // }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO creations(user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${
      publish ?? false
    })`;

   
    return NextResponse.json({ content: secure_url, success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: error.message, success: false });
  }
}
