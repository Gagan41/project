// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/utils/dbConnect"
import User from "@/models/User"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()
  await dbConnect()

  const existing = await User.findOne({ email })
  if (existing) return NextResponse.json({ error: "Email in use" }, { status: 400 })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash })  // role defaults to "user"

  const token = jwt.sign({ userId: user._id }, JWT_SECRET)
  return NextResponse.json({ token })
}
