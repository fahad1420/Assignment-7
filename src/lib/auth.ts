import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./mongodb";
import { credentialLinkingPlugin } from "./credential-plugin";

const isProduction = process.env.NODE_ENV === "production";
const vercelURL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;
const baseURL =
  process.env.BETTER_AUTH_URL ??
  vercelURL ??
  "http://localhost:3000";

export const auth = betterAuth({
  database: mongodbAdapter(db, { transaction: false }),
  baseURL,
  plugins: [credentialLinkingPlugin()],
  account: {
    // Keep OAuth state encrypted in a short-lived browser cookie. This avoids
    // state records being lost between Vercel serverless instances.
    storeStateStrategy: "cookie",
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      requireLocalEmailVerified: false,
    },
  },
  advanced: {
    useSecureCookies: isProduction,
  },
  emailAndPassword: { enabled: true, autoSignIn: false },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
  trustedOrigins: Array.from(
    new Set(
      [
        baseURL,
        vercelURL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
      ].filter(Boolean) as string[],
    ),
  ),
});
