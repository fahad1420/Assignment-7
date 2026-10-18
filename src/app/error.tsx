"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely to console without printing sensitive payloads
    console.error("Application error boundary triggered:", error.message);
  }, [error]);

  return (
    <section className="container section" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div
        className="auth-card"
        style={{
          maxWidth: 480,
          textAlign: "center",
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#fee2e2",
            color: "#dc2626",
            display: "grid",
            placeItems: "center",
          }}
        >
          <AlertCircle size={30} aria-hidden="true" />
        </div>
        <p className="kicker" style={{ color: "#dc2626", margin: 0 }}>
          সার্ভার সমস্যা
        </p>
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>তথ্য লোড করা যায়নি</h1>
        <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.95rem" }}>
          সার্ভার বা নেটওয়ার্ক সংযোগের কারণে এই মুহূর্তে তথ্য প্রদর্শনে সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn primary" onClick={() => reset()} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <RefreshCw size={16} /> আবার চেষ্টা করুন
          </button>
          <Link href="/" className="btn ghost" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <Home size={16} /> হোম পেজ
          </Link>
        </div>
      </div>
    </section>
  );
}

