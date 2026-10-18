import { createAuthMiddleware } from "@better-auth/core/api";
import { APIError } from "better-auth";
import type { BetterAuthPlugin } from "better-auth";

/**
 * Credential linking plugin:
 * 1. On /sign-up/email:
 *    - If an account already exists with this email via OAuth (Google or GitHub)
 *      and does NOT have a credential password, securely hash the password and
 *      create the credential account so the user can log in with email/password.
 *    - If an account already exists with a credential password, reject with a
 *      clear error message instead of returning a fake duplicate response.
 * 2. On /sign-in/email:
 *    - If the account exists with OAuth but has no credential password,
 *      return a clear message explaining that the account is linked with
 *      Google/GitHub, directing the user to sign in with OAuth or sign up to
 *      set a password.
 */
export const credentialLinkingPlugin = (): BetterAuthPlugin => ({
  id: "credential-linking",
  hooks: {
    before: [
      {
        matcher(ctx) {
          return ctx.path === "/sign-up/email";
        },
        handler: createAuthMiddleware(async (ctx) => {
          const body = ctx.body as Record<string, unknown> | undefined;
          if (!body || !body.email || !body.password) return;

          const email = String(body.email).trim().toLowerCase();
          const password = String(body.password);
          const name = body.name ? String(body.name).trim() : "";

          if (password.length < 8) {
            throw APIError.from("BAD_REQUEST", {
              code: "PASSWORD_TOO_SHORT",
              message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
            });
          }

          if (password.length > 128) {
            throw APIError.from("BAD_REQUEST", {
              code: "PASSWORD_TOO_LONG",
              message: "পাসওয়ার্ড সর্বোচ্চ ১২৮ অক্ষরের হতে পারে",
            });
          }

          const dbUser = await ctx.context.internalAdapter.findUserByEmail(email, {
            includeAccounts: true,
          });

          if (!dbUser?.user) {
            // New user, let normal Better Auth sign-up flow proceed
            return;
          }

          const accounts = dbUser.accounts ?? [];
          const credentialAccount = accounts.find(
            (a) => a.providerId === "credential" && a.accountId === dbUser.user.id,
          );

          if (credentialAccount && credentialAccount.password) {
            throw APIError.from("CONFLICT", {
              code: "USER_ALREADY_EXISTS",
              message: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে। অনুগ্রহ করে সাইন ইন করুন।",
            });
          }

          // Existing OAuth user without credential password: link the password!
          const hashedPassword = await ctx.context.password.hash(password);
          await ctx.context.internalAdapter.createAccount({
            userId: dbUser.user.id,
            providerId: "credential",
            accountId: dbUser.user.id,
            password: hashedPassword,
          });

          if (name && !dbUser.user.name) {
            await ctx.context.internalAdapter.updateUser(dbUser.user.id, { name });
          }

          ctx.context.logger.info(`Successfully linked credential account for: ${email}`);

          return ctx.json({
            token: null,
            user: dbUser.user,
          });
        }),
      },
      {
        matcher(ctx) {
          return ctx.path === "/sign-in/email";
        },
        handler: createAuthMiddleware(async (ctx) => {
          const body = ctx.body as Record<string, unknown> | undefined;
          if (!body || !body.email) return;

          const email = String(body.email).trim().toLowerCase();
          const dbUser = await ctx.context.internalAdapter.findUserByEmail(email, {
            includeAccounts: true,
          });

          if (!dbUser?.user) {
            // User not found, let Better Auth handle it
            return;
          }

          const accounts = dbUser.accounts ?? [];
          const credentialAccount = accounts.find(
            (a) => a.providerId === "credential" && a.accountId === dbUser.user.id,
          );

          if (!credentialAccount || !credentialAccount.password) {
            const hasGoogle = accounts.some((a) => a.providerId === "google");
            const hasGitHub = accounts.some((a) => a.providerId === "github");
            let providerNotice = "সামাজিক মাধ্যম";
            if (hasGoogle && hasGitHub) {
              providerNotice = "গুগল বা গিটহাব";
            } else if (hasGoogle) {
              providerNotice = "গুগল";
            } else if (hasGitHub) {
              providerNotice = "গিটহাব";
            }

            throw APIError.from("UNAUTHORIZED", {
              code: "NO_PASSWORD_SET",
              message: `এই অ্যাকাউন্টে পাসওয়ার্ড সেট করা নেই। ${providerNotice} দিয়ে সাইন ইন করুন, অথবা পাসওয়ার্ড সেট করতে সাইন আপ করুন।`,
            });
          }

          // Credential account exists, let normal Better Auth sign-in verify the password
          return;
        }),
      },
    ],
  },
});
