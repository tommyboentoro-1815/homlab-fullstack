import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Settings } from '@/models/Settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const settings = await Settings.find().lean()
  const map: Record<string, string> = {}
  for (const s of settings as { key: string; value: string }[]) {
    map[s.key] = s.value
  }
  return NextResponse.json(map)
}

export async function PATCH(req: Request) {
  await connectDB()
  const body = await req.json()
  for (const [key, value] of Object.entries(body)) {
    await Settings.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, new: true }
    )
  }
  return NextResponse.json({ success: true })
}
