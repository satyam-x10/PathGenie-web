import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db/mongo";
import { getTree, saveTreeToMongo } from "@/utils/db/tree";
import { addPossibleNamesToRoot, addRelationsToRoot, addTagsToRoot, createRoot } from "@/utils/db/root";

export async function POST(req) {
  await connectDB(); // Ensure the database is connected

  try {
    const payload = await req.json(); // Parse the JSON body
    console.log("hierarchicalTasks type:", typeof payload);
    console.log('tree uploading');
    
    const history_id= await saveTreeToMongo(payload.data, payload.email);
    console.log('root uploading ');
    const RootData= JSON.parse(payload.rootData);
    
    await createRoot(RootData.name);
    console.log('names uploading');

    await addPossibleNamesToRoot(RootData.name, RootData.possibleNames);
    await addTagsToRoot(RootData.name, RootData.tags);
    await addRelationsToRoot(RootData.name,[history_id]);
    console.log('all done');
    
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

export async function GET(req) {
  await connectDB(); // Ensure the database is connected

  try {
    const { id } = req.query; // Extract the 'id' parameter from the query
    const tree = await getTree(id); // Get the tree from the database

    return NextResponse.json({ tree }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tree:", error);
    return NextResponse.json(
      { message: "Error fetching tree", error: error.message },
      { status: 500 },
    );
  }
}