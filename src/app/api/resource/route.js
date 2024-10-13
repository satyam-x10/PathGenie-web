// src/app/api/resource/route.js
import { 
    connectDB, 
    createResource, 
    getAllResources, 
    getResourceById, 
    updateResource, 
    deleteResource 
  } from '@/utils/mongo';
  
  export async function GET(req) {
    try {
      await connectDB();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      const title = searchParams.get('title');
  
      if (id) {
        const resource = await getResourceById(id);
        if (!resource) {
          return new Response(JSON.stringify({ message: "Resource not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return new Response(JSON.stringify({ resource }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (title) {
        const resources = await Resource.find({ title: new RegExp(title, 'i') });
        return new Response(JSON.stringify({ resources }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        const resources = await getAllResources();
        return new Response(JSON.stringify({ resources }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('GET /api/resource error:', error);
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  export async function POST(req) {
    try {
      await connectDB();
      const body = await req.json();
      const { title, ...additionalFields } = body;
  
      if (!title) {
        return new Response(JSON.stringify({ message: "Title is required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const newResource = await createResource(title, additionalFields);
      return new Response(JSON.stringify({ message: "Resource created", newResource }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('POST /api/resource error:', error);
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  export async function PUT(req) {
    try {
      await connectDB();
      const body = await req.json();
      const { id, updatedData } = body;
  
      if (!id) {
        return new Response(JSON.stringify({ message: "Resource ID is required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const updatedResource = await updateResource(id, updatedData);
      if (!updatedResource) {
        return new Response(JSON.stringify({ message: "Resource not found or update failed" }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify({ message: "Resource updated", updatedResource }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('PUT /api/resource error:', error);
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  export async function DELETE(req) {
    try {
      await connectDB();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return new Response(JSON.stringify({ message: "Resource ID query parameter required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const deletedResource = await deleteResource(id);
      if (!deletedResource) {
        return new Response(JSON.stringify({ message: "Resource not found or delete failed" }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify({ message: "Resource deleted", deletedResource }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('DELETE /api/resource error:', error);
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
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
  