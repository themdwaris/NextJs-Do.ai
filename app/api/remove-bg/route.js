import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import sql from "@/config/db";
import connectCloudinary from "@/config/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
  await connectCloudinary();
  try {
    const formData = await req?.formData();
    const userId = formData.get("userId");

    if (!userId) {
      return NextResponse.json({
        message: "Not authenticated",
        success: false,
      });
    }

    const user = await clerkClient.users.getUser(userId);
    const plan = user?.privateMetadata?.plan;

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

    const file = formData.get("image");
    if (!file) {
      return NextResponse.json({ message: "Missing file", success: true });
    }

    // if (plan !== "premium") {
    //   return NextResponse.json({
    //     message: "This feature is only for premium users.",
    //     success: false,
    //   });
    // }

    // const arraybuffer = await file?.arraybuffer()
    // const buffer = Buffer.from(arraybuffer)

    // const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Convert file stream to buffer manually
    const stream = file.stream();
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image, {
      transformation: {
        effect: "background_removal",
        background_removal: "remove_the_background",
      },
    });

    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    // console.log(secure_url);

    return NextResponse.json({ content: secure_url, success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: error.message, success: false });
  }
}
