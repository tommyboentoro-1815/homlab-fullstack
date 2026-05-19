import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { News } from '@/models/News'

export async function GET() {
  await connectDB()
  const articles = await News.find().sort({ createdAt: -1 })
  return NextResponse.json(articles)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const article = await News.create(body)
  return NextResponse.json(article, { status: 201 })
}
