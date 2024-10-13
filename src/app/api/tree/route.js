

import { saveTopicsFromLocalStorage } from '@/utils/chain';
import { NextResponse } from 'next/server';


export async function POST(req) {
    
    try {
        const hierarchicalTasks = await req.json(); // Parse the JSON body
        console.log('hierarchicalTasks type:', typeof hierarchicalTasks);
       await  saveTopicsFromLocalStorage(hierarchicalTasks.data);

        return NextResponse.json({ message: "Topics saved successfully", data: hierarchicalTasks }, { status: 201 });
    } catch (error) {
        console.error("Error saving topics:", error);
        return NextResponse.json({ message: "Error saving topics", error: error.message }, { status: 500 });
    }
}
