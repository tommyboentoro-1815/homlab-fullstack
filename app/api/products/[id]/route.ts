import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const product = await Product.findById(params.id).lean()
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await req.json()
  const update: Record<string, unknown> = {}
  for (const key of Object.keys(body)) {
    update[key] = body[key]
  }
  const result = await Product.updateOne({ _id: params.id }, { $set: update })
  console.log('[PATCH] updateOne result:', JSON.stringify(result))
  const product = await Product.findById(params.id).lean()
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  console.log('[PATCH] fetched after update, featured:', (product as any).featured)
  return NextResponse.json(product)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB()
  await Product.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
