import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) ?? 'homlab'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())

  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => (error ? reject(error) : resolve(result))
    ).end(buffer)
  })

  return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
}
