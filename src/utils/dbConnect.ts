import mongoose from "mongoose";
import { registerModels } from "@/models";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Extend the global type so TypeScript knows about `_mongo`
declare global {
  // eslint-disable-next-line no-var
  var _mongo: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = globalThis._mongo;
if (!cached) {
  cached = globalThis._mongo = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        // Register all models after connection is established
        registerModels();
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("MongoDB: connection error", err);
        throw err;
      });
  }

  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (error) {
    console.error("MongoDB: connection error", error);
    throw error;
  }
}