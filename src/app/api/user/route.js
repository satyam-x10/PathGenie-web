// src/app/api/user/route.js
import { connectDB, createUser, getAllUsers, getUserByEmail, updateUser, deleteUser } from '@/utils/mongo';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  
  // console.log('email:', email);

  if (email) {
    const user = await getUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const users = await getAllUsers();
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { email, rootTopics } = body;

  const newUser = await createUser(email, rootTopics);
  return new Response(JSON.stringify({ message: "User created", newUser }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const { email, updatedData } = body;

  const updatedUser = await updateUser(email, updatedData);
  if (!updatedUser) {
    return new Response(JSON.stringify({ message: "User not found or update failed" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: "User updated", updatedUser }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return new Response(JSON.stringify({ message: "Email query parameter required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const deletedUser = await deleteUser(email);
  if (!deletedUser) {
    return new Response(JSON.stringify({ message: "User not found or delete failed" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: "User deleted", deletedUser }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'application/json',
    },
  });
}
