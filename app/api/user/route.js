import sql from "@/config/db";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // const { userId } = await req?.json();
    // const { userId } = getAuth(req);
    const { searchParams } = new URL(req?.url);
    const userId = searchParams.get("userId");

    const creations =
      await sql`SELECT * FROM creations WHERE user_id=${userId} ORDER BY created_at DESC`;

    const publishedCreations =
      await sql`SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC`;

    return NextResponse.json({ creations, publishedCreations, success: true });
  } catch (error) {
    console.log("Failed to get user data:", error);
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

export async function POST(req) {
  try {
    const { id, userId } = await req?.json();

    const [creation] = await sql`SELECT * FROM creations WHERE id=${id}`;
    if (!creation) {
      return NextResponse.json({
        message: "Creation not found",
        success: false,
      });
    }
    // console.log(creation);

    const currentLikes = creation?.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes?.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = "Creation Unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }
    // const formattedArray = `${updatedLikes.join(',')}`
    // await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id=${id}`

    const formattedArray = `{${updatedLikes.map((id) => `"${id}"`).join(",")}}`;
    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

    return NextResponse.json({ message: message, success: true });
  } catch (error) {
    console.log("Failed to like creations:", error);
    return NextResponse.json({ message: error.message, success: false });
  }
}
