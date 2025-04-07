import { connectDB } from "@/utils/db/mongo";
import { getRootById } from "@/utils/db/root";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB(); // Ensure the database is connected

  try {
    const url = new URL(req.url); // Create a URL object from req.url
    const rootId = url.searchParams.get("rootId"); // Extract the 'rootId' parameter from the query

    if (!rootId) {
      return NextResponse.json(
        { message: "Missing rootId parameter" },
        { status: 400 } // Bad Request
      );
    }

    const root = await getRootById(rootId); // Get the root from the database
    console.log("root", root);

    return NextResponse.json({ root }, { status: 200 });
  } catch (error) {
    console.error("Error fetching root:", error);
    return NextResponse.json(
      { message: "Error fetching root", error: error.message },
      { status: 500 }
    );
  }
}
