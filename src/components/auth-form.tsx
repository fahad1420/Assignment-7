"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const signup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<"email" | "google" | "github" | null>(
    null,
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email")).trim().toLowerCase();
    const password = String(fd.get("password"));
    const name = String(fd.get("name") ?? "").trim();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading("email");
    try {
      const result = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        const isServerError =
          (result.error.status && result.error.status >= 500) ||
          result.error.message?.toLowerCase().includes("server") ||
          result.error.message?.toLowerCase().includes("internal");

        if (isServerError) {
          toast.error("সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন");
        } else {
          toast.error(
            result.error.message ||
              (signup
                ? "নিবন্ধন করা যায়নি। আবার চেষ্টা করুন"
                : "ইমেইল বা পাসওয়ার্ড সঠিক নয়"),
          );
        }
        return;
      }

      toast.success(
        signup
          ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন"
          : "সফলভাবে সাইন ইন হয়েছে",
      );

      // A full navigation makes the new session cookie immediately available
      // to protected server routes and the header session state.
      window.location.assign(signup ? "/signin" : "/");
    } catch {
      toast.error(
        signup
          ? "নিবন্ধন করা যায়নি। আবার চেষ্টা করুন"
          : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন",
      );
    } finally {
      setLoading(null);
    }
  }
  async function social(provider: "google" | "github") {
    setLoading(provider);
    try {
      await authClient.signIn.social({ provider, callbackURL: "/" });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="auth-shell">
      <aside className="auth-promo">
        <span className="auth-promo-mark">🛒</span>
        <span className="auth-promo-label">বিশ্বস্ত বাজার তথ্য</span>
        <h2>প্রতিদিনের বাজারদর এখন হাতের মুঠোয়</h2>
        <p>
          দেশের বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম তুলনা করে সঠিক
          সিদ্ধান্ত নিন।
        </p>
        <div className="auth-benefits">
          <span>
            <ShieldCheck /> নিরাপদ অ্যাকাউন্ট
          </span>
          <span>
            <span className="benefit-icon">৳</span> বাজারভিত্তিক দাম
          </span>
          <span>
            <span className="benefit-icon">↗</span> দৈনিক পরিবর্তন
          </span>
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-heading">
          <span className="auth-mobile-logo">
            <ShoppingCart aria-hidden="true" />
          </span>
          <p className="kicker">বাজার দর</p>
          <h1>{signup ? "নতুন অ্যাকাউন্ট" : "স্বাগতম"}</h1>
          <p>
            {signup
              ? "বাজারের বিস্তারিত তথ্য দেখতে বিনামূল্যে নিবন্ধন করুন।"
              : "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।"}
          </p>
        </div>

        <form onSubmit={submit}>
          {signup && (
            <label>
              <span>নাম</span>
              <div className="input-wrap">
                <UserRound aria-hidden="true" />
                <input name="name" required placeholder="আপনার পূর্ণ নাম" />
              </div>
            </label>
          )}
          <label>
            <span>ইমেইল</span>
            <div className="input-wrap">
              <Mail aria-hidden="true" />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
          </label>
          <label>
            <span>পাসওয়ার্ড</span>
            <div className="input-wrap password-wrap">
              <LockKeyhole aria-hidden="true" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                minLength={8}
                required
                autoComplete={signup ? "new-password" : "current-password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <button
            className="btn primary auth-submit"
            disabled={loading !== null}
          >
            {loading === "email" ? (
              <>
                <LoaderCircle className="loading-icon" aria-hidden="true" />
                অপেক্ষা করুন...
              </>
            ) : signup ? (
              "অ্যাকাউন্ট তৈরি করুন"
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        <div className="or">
          <span>অথবা</span>
        </div>
        <div className="socials">
          <button
            type="button"
            onClick={() => social("google")}
            disabled={loading !== null}
          >
            {loading === "google" ? (
              <LoaderCircle className="loading-icon" aria-hidden="true" />
            ) : (
              <GoogleIcon />
            )}
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => social("github")}
            disabled={loading !== null}
          >
            {loading === "github" ? (
              <LoaderCircle className="loading-icon" aria-hidden="true" />
            ) : (
              <GitHubIcon />
            )}
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>
        <p className="auth-link">
          {signup ? "আগেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
          <Link href={signup ? "/signin" : "/signup"}>
            {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.37l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.13H3.06v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.92A6 6 0 0 1 6.08 12c0-.67.12-1.32.32-1.92V7.46H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.54l3.34-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.94 5.46l3.34 2.62c.79-2.37 3-4.13 5.6-4.13Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="brand-icon github-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.02c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.41-1.26.74-1.55-2.58-.3-5.29-1.29-5.29-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.42-2.72 5.39-5.3 5.68.42.36.79 1.07.79 2.16v3.03c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
      />
    </svg>
  );
}
