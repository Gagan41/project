import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../../utils/dbConnect'
import { registerUser } from '../../../../controllers/authController'

export async function POST(req: NextRequest) {
  await dbConnect()
  const body = await req.json()
  try {
    const token = await registerUser(body)
    return NextResponse.json({ token }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}