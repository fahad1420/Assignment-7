
import { MongoClient } from "mongodb";
import dns from "node:dns";

// Use Google's DNS resolver for MongoDB SRV lookups on environments (such as Windows)
// where the default local DNS resolver may refuse or fail SRV records.
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch {
  // Ignore if custom DNS server configuration is unsupported in the current runtime
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing. Check the project-root .env file.");
}

const globalMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalMongo.mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 0,
    maxIdleTimeMS: 60_000,
    connectTimeoutMS: 10_000,
    serverSelectionTimeoutMS: 15_000,
    retryReads: true,
    retryWrites: true,
  });

globalMongo.mongoClient = mongoClient;

export const db = mongoClient.db("bazardor");

export async function ensureMongoConnection(): Promise<void> {
  await mongoClient.connect();
}
