import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId | null
  course: mongoose.Types.ObjectId
  amount: number
  paymentId: string
  status: string
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  paymentId: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)