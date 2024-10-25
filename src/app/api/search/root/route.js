import { connectDB } from "@/utils/db/mongo";
import { Root } from "@/utils/db/root";

export async function POST(req) {
  await connectDB(); // Ensure the database is connected

  try {
    const { query } = await req.json(); // Extract 'query' from the request body

    console.log("searching root with index:", query);
    if (!query) {
      return new Response(
        JSON.stringify({ message: "Query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Use MongoDB Atlas Search with the 'search_index'
    const roots = await Root.aggregate([
      {
        $search: {
          index: "root_search", // specify your search index name here
          text: {
            query: query,
            path: { wildcard: "*" },
            fuzzy: { maxEdits: 2 }, // Optional: enable fuzzy matching if desired
          },
        },
      },
      {
        $project: {
          name: 1,
          _id: 1,
        },
      },
    ]);

    console.log("search result:", roots);

    return new Response(JSON.stringify(roots), {
      status: 200,
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
