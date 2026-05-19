import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ContactInfo } from '@/models/ContactInfo'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const info = await ContactInfo.findOne().lean()
  return NextResponse.json(info ?? {})
}

export async function PATCH(req: Request) {
  await connectDB()
  const body = await req.json()
  const info = await ContactInfo.findOneAndUpdate(
    {},
    { $set: body },
    { upsert: true, new: true, lean: true }
  )
  return NextResponse.json(info)
}
