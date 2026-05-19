import { Schema, model, models } from 'mongoose'

const ContactInfoSchema = new Schema({
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  location: { type: String, default: '' },
  instagram: { type: String, default: '' },
  tokopedia: { type: String, default: '' },
})

export const ContactInfo = models.ContactInfo ?? model('ContactInfo', ContactInfoSchema)
