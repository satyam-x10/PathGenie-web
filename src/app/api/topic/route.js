// src/app/api/topic/route.js
import { 
    connectDB, 
    createTopic, 
    getAllTopics, 
    getTopicById, 
    updateTopic, 
    deleteTopic ,
    getSubtopicChainById
  } from '@/utils/mongo';
  
  export async function GET(req) {
    try {
      await connectDB();
      const { searchParams } = new URL(req.url);
      const topicID = searchParams.get('topicID');
      const chainId = searchParams.get('chainId'); // Updated variable name for clarity
  
      // If topicID is provided, fetch the topic by ID
      if (topicID) {
        const topic = await getTopicById(topicID);
        if (!topic) {
          return new Response(JSON.stringify({ message: "Topic not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return new Response(JSON.stringify({ topic }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // If topicID is missing and chainId is present, fetch subtopic chain
      if (chainId) {
        const subtopicChain = await getSubtopicChainById(chainId);
        return new Response(JSON.stringify({ subtopicChain }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // If neither topicID nor chainId is provided
      return new Response(JSON.stringify({ message: "Please provide a topicID or chainId." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      console.error('GET /api/topic error:', error);
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
      const { taskID, title, resourceId, description, subtopics, parentTopic } = body;
  
      if (!taskID || !title || !resourceId) {
        return new Response(JSON.stringify({ message: "taskID, title, and resourceId are required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const newTopic = await createTopic(taskID, title, resourceId, description, subtopics, parentTopic);
      return new Response(JSON.stringify({ message: "Topic created", newTopic }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('POST /api/topic error:', error);
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
        return new Response(JSON.stringify({ message: "Topic ID is required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const updatedTopic = await updateTopic(id, updatedData);
      if (!updatedTopic) {
        return new Response(JSON.stringify({ message: "Topic not found or update failed" }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify({ message: "Topic updated", updatedTopic }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('PUT /api/topic error:', error);
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
        return new Response(JSON.stringify({ message: "Topic ID query parameter required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const deletedTopic = await deleteTopic(id);
      if (!deletedTopic) {
        return new Response(JSON.stringify({ message: "Topic not found or delete failed" }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify({ message: "Topic deleted", deletedTopic }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('DELETE /api/topic error:', error);
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
  