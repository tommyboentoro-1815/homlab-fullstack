import { Schema, model, models } from 'mongoose'

const SettingsSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
})

export const Settings = models.Settings ?? model('Settings', SettingsSchema)
