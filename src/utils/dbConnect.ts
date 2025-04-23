import mongoose from "mongoose";

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
    console.log("MongoDB: using cached connection");
    return cached!.conn;
  }

  if (!cached!.promise) {
    console.log("MongoDB: creating new connection...");
    cached!.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        console.log("MongoDB: connected successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("MongoDB: connection error", err);
        throw err;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}