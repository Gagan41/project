// app/api/contact/route.ts
import { NextResponse } from "next/server";
import dbConnect from '@/utils/dbConnect';  
import Query from "@/models/Query";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const newQuery = new Query({ name, email, message });
    await newQuery.save();

    return NextResponse.json(
      { success: true, message: "Query submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
