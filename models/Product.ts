import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: { type: [String], required: true },
  category: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

export const Product = models.Product ?? model('Product', ProductSchema)
