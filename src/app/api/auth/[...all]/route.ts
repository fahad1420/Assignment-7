import { auth } from "@/lib/auth";
import { ensureMongoConnection } from "@/lib/mongodb";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export async function GET(request: Request) {
  try {
    await ensureMongoConnection();
  } catch (error) {
    console.error("[Auth API] MongoDB connection failure during GET:", error);
  }
  return handlers.GET(request);
}

export async function POST(request: Request) {
  try {
    await ensureMongoConnection();
  } catch (error) {
    console.error("[Auth API] MongoDB connection failure during POST:", error);
  }
  return handlers.POST(request);
}
