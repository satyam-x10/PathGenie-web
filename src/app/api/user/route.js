// src/app/api/user/route.js
import { connectDB } from "@/utils/db/mongo";
import { getTree } from "@/utils/db/tree";
import {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "@/utils/db/user.js";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  // //console.log('email:', email);

  if (email) {
    const user = await getUserByEmail(email);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    const users = await getAllUsers();
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  await connectDB(); // Ensure the database is connected

  try {
    const body = await req.json();
    const { email } = body;
    //console.log("email:", email);

    // Check if the user already exists in the database
    const existingUser = await getUserByEmail(email);
    // //console.log("existingUser:", existingUser);

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists", user: existingUser }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }
    //console.log("creating:", email);

    // If no existing user, create a new one
    const newUser = await createUser(email);
    //console.log("newUser:", newUser);

    return new Response(JSON.stringify({ message: "User created", newUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error processing request",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
