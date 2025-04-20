import mongoose, { Schema, Document } from 'mongoose'

export interface ICourse extends Document {
  title: string
  description: string
  price: number
  videoUrl: string
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  videoUrl: { type: String, required: true },
}, { timestamps: true })

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema)