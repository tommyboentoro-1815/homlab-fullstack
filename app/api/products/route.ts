import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const products = await Product.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json(products, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
  })
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const product = await Product.create(body)
  return NextResponse.json(product, { status: 201 })
}
