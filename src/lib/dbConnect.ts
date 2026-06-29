import mongoose from "mongoose";

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing in .env.local");
  }

  return uri;
}

const MONGODB_URI = getMongoUri();

async function dbConnect() {
  // Create cache if it does not exist
  if (!globalThis.mongooseCache) {
    globalThis.mongooseCache = {
      conn: null,
      promise: null,
    };
  }

  const cached = globalThis.mongooseCache;

  // If already connected, reuse connection
  if (cached.conn) {
    console.log("♻️ Reusing existing MongoDB connection");
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      console.log("✅ MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  // Wait for connection
  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;