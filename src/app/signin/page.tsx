import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { AuthNotice } from "@/components/auth-notice";

export const metadata: Metadata = {
  title: "সাইন ইন - বাজার দর",
  description: "আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করতে সাইন ইন করুন।",
};
export default function SignIn() {
  return (
    <section className="auth-page">
      <Suspense>
        <AuthNotice />
      </Suspense>
      <AuthForm mode="signin" />
    </section>
  );
}
