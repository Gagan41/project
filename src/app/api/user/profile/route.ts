// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function verifyToken(token?: string) {
  if (!token) throw new Error("No token");
  return (jwt.verify(token, JWT_SECRET) as { userId: string }).userId;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const userId = verifyToken(token);
    await dbConnect();
    const u = await User.findById(userId).select("_id name email role");
    if (!u) throw new Error("Not found");
    return NextResponse.json({
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const userId = verifyToken(token);
    const { name, email } = await req.json();

    await dbConnect();
    const u = await User.findById(userId);
    if (!u) throw new Error("Not found");

    u.name = name;
    u.email = email;
    await u.save();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
