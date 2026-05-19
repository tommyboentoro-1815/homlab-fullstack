import { Schema, model, models } from 'mongoose'

const NewsSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  subheading: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  imageUrls: { type: [String], required: true },
}, { timestamps: true })

export const News = models.News ?? model('News', NewsSchema)
