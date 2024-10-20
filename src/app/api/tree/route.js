

import { saveChainTopicToMongo } from '@/utils/chain';
import { NextResponse } from 'next/server';
import { getTreeById } from '@/utils/chain';

export async function POST(req) {
    
    try {
        const payload = await req.json(); // Parse the JSON body
        console.log('hierarchicalTasks type:', typeof payload);
       await  saveChainTopicToMongo(payload.data,payload.email);
       console.log('email:', payload.email);
       

        return NextResponse.json({ message: "Topics saved successfully", data: payload }, { status: 201 });
    } catch (error) {
        console.error("Error saving topics:", error);
        return NextResponse.json({ message: "Error saving topics", error: error.message }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        const minimapId = req.nextUrl.searchParams.get('minimapId'); // Get query parameter
        console.log('minimapId:', minimapId);
        
        // You can now use minimapId to fetch topics or do any required processing.
        const treeData = await getTreeById(minimapId); // Replace with your logic
        
        return NextResponse.json({ message: "Topics fetched successfully", data: treeData }, { status: 200 });
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ message: "Error fetching topics", error: error.message }, { status: 500 });
    }
}