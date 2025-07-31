import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import sql from "@/config/db";
import path from "path";
import fs from "fs/promises";
import pdf from "pdf-parse/lib/pdf-parse.js";
import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req) {
  try {
    // const { userId } = await auth(); // Don't pass req
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

    const file = formData.get("resume");
    if (!file) {
      return NextResponse.json({ message: "Missing file", success: true });
    }

    // if (plan !== "premium") {
    //   return NextResponse.json({
    //     message: "This feature is only for premium users.",
    //     success: false,
    //   });
    // }

    // ✅ Get file size from the blob
    const arrayBuffer = await file.arrayBuffer();
    const sizeInBytes = arrayBuffer.byteLength;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);

    if (sizeInKB > 5 * 1024 * 1024) {
      return NextResponse.json({
        message: "Pdf size limit exceeds, max size 5MB ",
        success: false,
      });
    }

    // Define tmp directory cross-platform
    const tmpDir = path.join(process.cwd(), "tmp"); // or you can use os.tmpdir()

    // Ensure it exists
    await fs.mkdir(tmpDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(tmpDir, Date.now() + "-" + file.name);
    await fs.writeFile(filePath, buffer);

    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdf(dataBuffer);
    const prompt = `Review the following resume and provide the constructive feedback on its strengths, weaknesses, and areas for improvements. Resume/Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume')`;

    return NextResponse.json({ content: content, success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: error.message, success: false });
  }
}
