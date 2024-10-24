import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db/mongo";
import { saveTreeToMongo } from "@/utils/db/tree";

export async function POST(req) {
  await connectDB(); // Ensure the database is connected

  try {
    const payload = await req.json(); // Parse the JSON body
    //console.log("hierarchicalTasks type:", typeof payload);
    await saveTreeToMongo(payload.data, payload.email);
    //console.log("email:", payload.email);

    return NextResponse.json(
      { message: "Topics saved successfully", data: payload },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving topics:", error);
    return NextResponse.json(
      { message: "Error saving topics", error: error.message },
      { status: 500 },
    );
  }
}
