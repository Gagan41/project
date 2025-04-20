import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../../utils/dbConnect'
import { loginUser } from '../../../../controllers/authController'

export async function POST(req: NextRequest) {
  await dbConnect()
  const body = await req.json()
  try {
    const token = await loginUser(body)
    return NextResponse.json({ token })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 })
  }
}