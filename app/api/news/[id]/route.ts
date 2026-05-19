import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { News } from '@/models/News'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const article = await News.findById(params.id)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await req.json()
  const article = await News.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(article)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB()
  await News.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
