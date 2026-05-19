import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { connectDB } from '@/lib/mongodb'
import { ContactInfo } from '@/models/ContactInfo'

export async function POST(req: Request) {
  const { name, phone, message } = await req.json()

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  await connectDB()
  const info = await ContactInfo.findOne().lean() as { email?: string } | null
  const toEmail = info?.email

  if (!toEmail) {
    return NextResponse.json({ error: 'No recipient email configured' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Homlab Contact Form" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: `New message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  })

  return NextResponse.json({ success: true })
}
