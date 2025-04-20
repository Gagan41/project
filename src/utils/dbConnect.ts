import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!
let cached: any = globalThis._mongo
if (!cached) {
  cached = globalThis._mongo = { conn: null, promise: null }
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}